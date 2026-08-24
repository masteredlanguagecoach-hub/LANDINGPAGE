import { google } from 'googleapis';
import { PaidStudentRow, PaymentLogRow } from '@/types';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

// Default Spreadsheet ID & User's Deployed Apps Script Web App URL fallbacks
const DEFAULT_SPREADSHEET_ID = '1hveaz4UjoT2odS6YRpB8BNeaFhmpqVEYIRAHCInNzTU';
const DEFAULT_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzOKO05chNfJPD65-gHSLQ8y-Mv1GOTalpsTwGfUqmWy-jpI9rx01nibRSppYy22UwL/exec';

export function getSpreadsheetId(): string {
  return process.env.GOOGLE_SHEET_ID || DEFAULT_SPREADSHEET_ID;
}

export function getAppsScriptUrl(): string {
  return process.env.GOOGLE_APPS_SCRIPT_URL || DEFAULT_APPS_SCRIPT_URL;
}

// Local in-memory fallback log when Google Sheets API credentials are not yet configured
const inMemoryPaidStudents: PaidStudentRow[] = [];
const inMemoryPaymentLogs: PaymentLogRow[] = [];

/**
 * Initializes authenticated Google Sheets API client using Service Account credentials.
 */
function getGoogleSheetsClient() {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  let privateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!clientEmail || !privateKey || privateKey.includes('PLACEHOLDER')) {
    return null; // Credentials not configured yet
  }

  // Handle escaped newlines in Vercel/Env variables
  privateKey = privateKey.replace(/\\n/g, '\n');

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: SCOPES,
  });

  return google.sheets({ version: 'v4', auth });
}

export const PAID_STUDENTS_SHEET = 'PAID_STUDENTS';
export const PAYMENT_LOGS_SHEET = 'PAYMENT_LOGS';

export const PAID_STUDENTS_HEADERS = [
  'Timestamp',
  'Admission Number',
  'Full Name',
  'Email',
  'Email Verified',
  'WhatsApp Number',
  'Course Code',
  'Course Name',
  'Amount',
  'Currency',
  'Payment Status',
  'Razorpay Order ID',
  'Razorpay Payment ID',
  'Payment Verification Status',
  'Enrollment Status',
  'Email Delivery Status',
  'Created At',
];

export const PAYMENT_LOGS_HEADERS = [
  'Timestamp',
  'Admission Number',
  'Razorpay Order ID',
  'Razorpay Payment ID',
  'Course',
  'Amount',
  'Currency',
  'Payment Status',
  'Signature Verification',
  'Webhook Status',
  'Email',
  'WhatsApp Number',
  'Notes',
];

/**
 * Sends student registration payload to Google Apps Script Web App URL.
 * Uses await, query parameters, and redirect: follow so Vercel serverless context doesn't terminate early.
 */
async function sendToAppsScript(action: string, payload: any): Promise<boolean> {
  const scriptUrl = getAppsScriptUrl();
  if (!scriptUrl) return false;

  try {
    const params = new URLSearchParams();
    params.append('action', action);
    if (payload && typeof payload === 'object') {
      Object.keys(payload).forEach((k) => {
        if (payload[k] !== undefined && payload[k] !== null) {
          params.append(k, String(payload[k]));
        }
      });
    }

    const fullUrl = `${scriptUrl}?${params.toString()}`;
    const postBody = JSON.stringify({ action, payload, ...payload });

    const res = await fetch(fullUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: postBody,
      redirect: 'follow',
      cache: 'no-store',
    });

    console.log(`[AppsScript WebApp] Sent ${action} to Google Apps Script URL: status ${res.status}`);
    return res.ok;
  } catch (err) {
    console.warn('[AppsScript WebApp] Failed to send payload to Google Apps Script URL:', err);
    return false;
  }
}

/**
 * Generates sequential Admission Number by inspecting Column B of Google Sheets (PAID_STUDENTS).
 * Finds the highest number used so far (e.g., MLC788) and returns the next (e.g., MLC789).
 */
export async function getNextAdmissionNumber(): Promise<string> {
  const STARTING_NO = 786;
  const scriptUrl = getAppsScriptUrl();

  // 1. Try Google Apps Script URL first to scan Column B
  if (scriptUrl) {
    try {
      const res = await fetch(`${scriptUrl}?action=getNextAdmissionNumber`, {
        cache: 'no-store',
        redirect: 'follow',
      });
      const data = await res.json();
      if (data && data.admissionNumber) {
        console.log(`[GoogleSheets] Received next Admission Number from Apps Script: ${data.admissionNumber}`);
        return data.admissionNumber;
      }
    } catch (err) {
      console.warn('[GoogleSheets] Failed to fetch Admission Number from Apps Script:', err);
    }
  }

  // 2. Try Google Sheets API if credentials present
  const spreadsheetId = getSpreadsheetId();
  const sheets = getGoogleSheetsClient();
  if (sheets && spreadsheetId) {
    try {
      const res = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: `${PAID_STUDENTS_SHEET}!B:B`,
      });

      const rows = res.data.values;
      if (rows && rows.length > 1) {
        let maxNum = STARTING_NO - 1; // 785
        for (let i = 1; i < rows.length; i++) {
          const val = String(rows[i][0] || '').trim();
          const match = val.match(/MLC(\d+)/i);
          if (match && match[1]) {
            const num = parseInt(match[1], 10);
            if (!isNaN(num) && num > maxNum) {
              maxNum = num;
            }
          }
        }
        return `MLC${maxNum + 1}`;
      }
    } catch (error) {
      console.warn('[GoogleSheets] Failed to fetch row count for Admission Number:', error);
    }
  }

  // 3. Fallback count
  const nextNum = STARTING_NO + inMemoryPaidStudents.length;
  return `MLC${nextNum}`;
}

/**
 * Ensures header row exists on sheet worksheets.
 */
async function ensureSheetHeaders(sheets: any, spreadsheetId: string, sheetName: string, headers: string[]) {
  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!A1:Z1`,
    });

    if (!res.data.values || res.data.values.length === 0) {
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `${sheetName}!A1`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [headers],
        },
      });
    }
  } catch (error: any) {
    try {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [
            {
              addSheet: {
                properties: { title: sheetName },
              },
            },
          ],
        },
      });
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `${sheetName}!A1`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [headers],
        },
      });
    } catch (createErr) {
      console.warn(`[GoogleSheets] Sheet tab setup warning:`, createErr);
    }
  }
}

/**
 * Checks if a Razorpay Payment ID or Order ID already exists in PAID_STUDENTS sheet.
 */
export async function isPaymentAlreadyProcessed(paymentId: string, orderId: string): Promise<boolean> {
  const spreadsheetId = getSpreadsheetId();
  const sheets = getGoogleSheetsClient();

  if (!sheets || !spreadsheetId) {
    return inMemoryPaidStudents.some(
      (s) => s.razorpayPaymentId === paymentId || (orderId && s.razorpayOrderId === orderId)
    );
  }

  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${PAID_STUDENTS_SHEET}!A:Z`,
    });

    const rows = res.data.values;
    if (!rows || rows.length <= 1) return false;

    const headers: string[] = rows[0];
    const paymentIdIdx = headers.indexOf('Razorpay Payment ID');
    const orderIdIdx = headers.indexOf('Razorpay Order ID');

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (paymentIdIdx !== -1 && row[paymentIdIdx] === paymentId) {
        return true;
      }
      if (orderIdIdx !== -1 && orderId && row[orderIdIdx] === orderId) {
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error('[GoogleSheets] Failed to check duplicate payment:', error);
    return false;
  }
}

/**
 * Appends a verified paid student record to Google Sheets via Google Sheets API AND Google Apps Script Web App URL.
 */
export async function appendPaidStudentRow(student: PaidStudentRow): Promise<{ success: boolean; duplicate: boolean }> {
  const alreadyProcessed = await isPaymentAlreadyProcessed(student.razorpayPaymentId, student.razorpayOrderId);
  if (alreadyProcessed) {
    console.log(`[GoogleSheets] Payment ${student.razorpayPaymentId} already recorded. Skipping duplicate.`);
    return { success: true, duplicate: true };
  }

  inMemoryPaidStudents.push(student);

  // Await payload delivery to Google Apps Script Web App URL so Vercel serverless context doesn't terminate early
  await sendToAppsScript('addPaidStudent', student);

  const spreadsheetId = getSpreadsheetId();
  const sheets = getGoogleSheetsClient();

  if (!sheets || !spreadsheetId) {
    console.log('[GoogleSheets Fallback] Recorded Paid Student:', student);
    return { success: true, duplicate: false };
  }

  try {
    await ensureSheetHeaders(sheets, spreadsheetId, PAID_STUDENTS_SHEET, PAID_STUDENTS_HEADERS);

    const admissionNum = student.admissionNumber || student.enrollmentId || 'MLC786';

    const rowValues = [
      student.timestamp,
      admissionNum,
      student.fullName,
      student.email,
      student.emailVerified,
      student.whatsappNumber,
      student.courseCode,
      student.courseName,
      student.amount,
      student.currency,
      student.paymentStatus,
      student.razorpayOrderId,
      student.razorpayPaymentId,
      student.paymentVerificationStatus,
      student.enrollmentStatus,
      student.emailDeliveryStatus,
      student.createdAt,
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${PAID_STUDENTS_SHEET}!A1`,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [rowValues],
      },
    });

    return { success: true, duplicate: false };
  } catch (error) {
    console.error('[GoogleSheets] Error appending paid student via API:', error);
    return { success: true, duplicate: false };
  }
}

/**
 * Appends transaction log to PAYMENT_LOGS worksheet via API and Apps Script URL.
 */
export async function appendPaymentLogRow(log: PaymentLogRow): Promise<boolean> {
  inMemoryPaymentLogs.push(log);

  // Await payload delivery to Google Apps Script Web App URL
  await sendToAppsScript('addPaymentLog', log);

  const spreadsheetId = getSpreadsheetId();
  const sheets = getGoogleSheetsClient();

  if (!sheets || !spreadsheetId) {
    console.log('[GoogleSheets Fallback] Recorded Payment Log:', log);
    return true;
  }

  try {
    await ensureSheetHeaders(sheets, spreadsheetId, PAYMENT_LOGS_SHEET, PAYMENT_LOGS_HEADERS);

    const admissionNum = log.admissionNumber || log.internalEnrollmentId || 'MLC786';

    const rowValues = [
      log.timestamp,
      admissionNum,
      log.razorpayOrderId,
      log.razorpayPaymentId,
      log.course,
      log.amount,
      log.currency,
      log.paymentStatus,
      log.signatureVerification,
      log.webhookStatus,
      log.email,
      log.whatsappNumber,
      log.notes,
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${PAYMENT_LOGS_SHEET}!A1`,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [rowValues],
      },
    });

    return true;
  } catch (error) {
    console.error('[GoogleSheets] Error appending payment log via API:', error);
    return true;
  }
}

/**
 * Updates email delivery status in Google Sheets for a student if email delivery fails or is resent.
 */
export async function updateEmailDeliveryStatus(paymentId: string, newStatus: 'SENT' | 'FAILED'): Promise<boolean> {
  const student = inMemoryPaidStudents.find((s) => s.razorpayPaymentId === paymentId);
  if (student) {
    student.emailDeliveryStatus = newStatus;
  }

  await sendToAppsScript('updateEmailStatus', { paymentId, newStatus });

  const spreadsheetId = getSpreadsheetId();
  const sheets = getGoogleSheetsClient();

  if (!sheets || !spreadsheetId) {
    return true;
  }

  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${PAID_STUDENTS_SHEET}!A:Z`,
    });

    const rows = res.data.values;
    if (!rows || rows.length <= 1) return false;

    const headers: string[] = rows[0];
    const paymentIdIdx = headers.indexOf('Razorpay Payment ID');
    const statusIdx = headers.indexOf('Email Delivery Status');

    if (paymentIdIdx === -1 || statusIdx === -1) return false;

    for (let i = 1; i < rows.length; i++) {
      if (rows[i][paymentIdIdx] === paymentId) {
        const colLetter = String.fromCharCode(65 + statusIdx);
        const cellRange = `${PAID_STUDENTS_SHEET}!${colLetter}${i + 1}`;

        await sheets.spreadsheets.values.update({
          spreadsheetId,
          range: cellRange,
          valueInputOption: 'USER_ENTERED',
          requestBody: {
            values: [[newStatus]],
          },
        });
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error('[GoogleSheets] Failed to update email delivery status:', error);
    return false;
  }
}
