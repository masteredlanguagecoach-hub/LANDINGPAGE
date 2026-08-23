import { google } from 'googleapis';
import { PaidStudentRow, PaymentLogRow } from '@/types';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

// Default Spreadsheet ID fallback
const DEFAULT_SPREADSHEET_ID = '1hveaz4UjoT2odS6YRpB8BNeaFhmpqVEYIRAHCInNzTU';

export function getSpreadsheetId(): string {
  return process.env.GOOGLE_SHEET_ID || DEFAULT_SPREADSHEET_ID;
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
 * Generates sequential Admission Number starting from MLC786 (MLC786, MLC787, MLC788, ...).
 */
export async function getNextAdmissionNumber(): Promise<string> {
  const STARTING_NO = 786;
  const spreadsheetId = getSpreadsheetId();
  const sheets = getGoogleSheetsClient();

  if (!sheets || !spreadsheetId) {
    const nextNum = STARTING_NO + inMemoryPaidStudents.length;
    return `MLC${nextNum}`;
  }

  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${PAID_STUDENTS_SHEET}!A:B`,
    });

    const rows = res.data.values;
    // Header is row 0; count of existing students = rows.length - 1
    const studentCount = rows && rows.length > 1 ? rows.length - 1 : 0;
    const nextNum = STARTING_NO + studentCount;
    return `MLC${nextNum}`;
  } catch (error) {
    console.warn('[GoogleSheets] Failed to fetch row count for Admission Number, using fallback count:', error);
    const nextNum = STARTING_NO + inMemoryPaidStudents.length;
    return `MLC${nextNum}`;
  }
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
 * Appends a verified paid student record to Google Sheets (PAID_STUDENTS worksheet).
 */
export async function appendPaidStudentRow(student: PaidStudentRow): Promise<{ success: boolean; duplicate: boolean }> {
  const alreadyProcessed = await isPaymentAlreadyProcessed(student.razorpayPaymentId, student.razorpayOrderId);
  if (alreadyProcessed) {
    console.log(`[GoogleSheets] Payment ${student.razorpayPaymentId} already recorded. Skipping duplicate.`);
    return { success: true, duplicate: true };
  }

  inMemoryPaidStudents.push(student);

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
    console.error('[GoogleSheets] Error appending paid student:', error);
    return { success: false, duplicate: false };
  }
}

/**
 * Appends transaction log to PAYMENT_LOGS worksheet.
 */
export async function appendPaymentLogRow(log: PaymentLogRow): Promise<boolean> {
  inMemoryPaymentLogs.push(log);

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
    console.error('[GoogleSheets] Error appending payment log:', error);
    return false;
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
