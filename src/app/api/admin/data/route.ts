import { NextRequest, NextResponse } from 'next/server';
import { getAdminDashboardData } from '@/lib/sheets';
import { PaidStudentRow, ExpenseRow, ManualIncomeRow } from '@/types';

export const dynamic = 'force-dynamic';

const DEFAULT_ADMIN_PIN = '7860';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const pin = req.headers.get('x-admin-pin') || searchParams.get('pin');
    const expectedPin = process.env.ADMIN_PIN || process.env.ADMIN_PASSWORD || DEFAULT_ADMIN_PIN;

    if (pin !== expectedPin) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Invalid Admin PIN' },
        { status: 401 }
      );
    }

    const rawData = await getAdminDashboardData();
    let rawStudents = rawData.students || [];
    let rawExpenses = rawData.expenses || [];
    let rawManualIncomes = rawData.manualIncomes || [];

    // 1. Map Razorpay Students
    const razorpayStudents: PaidStudentRow[] = rawStudents.map((s, idx) => ({
      timestamp: String(s.timestamp || ''),
      admissionNumber: String(s.admissionNumber || `MLC${786 + idx}`),
      fullName: String(s.fullName || ''),
      email: String(s.email || ''),
      emailVerified: (s.emailVerified || 'YES') as any,
      whatsappNumber: String(s.whatsappNumber || ''),
      courseCode: String(s.courseCode || 'ML-EN'),
      courseName: String(s.courseName || 'Malayalam to English Speaking Challenge'),
      amount: Number(s.amount) || 399,
      currency: String(s.currency || 'INR'),
      paymentStatus: (s.paymentStatus || 'SUCCESS') as any,
      razorpayOrderId: String(s.razorpayOrderId || ''),
      razorpayPaymentId: String(s.razorpayPaymentId || ''),
      paymentVerificationStatus: (s.paymentVerificationStatus || 'VERIFIED_HMAC_SHA256') as any,
      enrollmentStatus: (s.enrollmentStatus || 'ACTIVE') as any,
      emailDeliveryStatus: (s.emailDeliveryStatus || 'SENT') as any,
      createdAt: String(s.createdAt || s.timestamp || new Date().toISOString()),
      paymentChannel: 'RAZORPAY',
    }));

    // 2. Map Expenses
    const expenses: ExpenseRow[] = rawExpenses.map((ex, idx) => ({
      timestamp: String(ex.timestamp || ''),
      expenseId: String(ex.expenseId || `EXP_${idx}`),
      category: (ex.category || 'Other') as any,
      description: String(ex.description || ''),
      amount: Number(ex.amount) || 0,
      date: String(ex.date || ex.timestamp || ''),
      createdAt: String(ex.createdAt || ex.timestamp || new Date().toISOString()),
    }));

    // 3. Map Manual Incomes
    const manualIncomes: ManualIncomeRow[] = rawManualIncomes.map((inc, idx) => ({
      timestamp: String(inc.timestamp || ''),
      incomeId: String(inc.incomeId || `INC_${idx}`),
      source: (inc.source || 'GPay / PhonePe') as any,
      fullName: String(inc.fullName || 'Direct Student'),
      email: String(inc.email || ''),
      whatsappNumber: String(inc.whatsappNumber || ''),
      amount: Number(inc.amount) || 0,
      notes: String(inc.notes || ''),
      date: String(inc.date || inc.timestamp || ''),
      createdAt: String(inc.createdAt || inc.timestamp || new Date().toISOString()),
    }));

    // Convert Manual Incomes into student table rows if channel === 'all' or 'manual'
    const manualAsStudents: PaidStudentRow[] = manualIncomes.map((inc) => ({
      timestamp: inc.timestamp,
      admissionNumber: inc.incomeId,
      fullName: inc.fullName,
      email: inc.email || 'direct@income',
      emailVerified: 'YES',
      whatsappNumber: inc.whatsappNumber || 'N/A',
      courseCode: 'DIRECT',
      courseName: `Direct Income (${inc.source})`,
      amount: inc.amount,
      currency: 'INR',
      paymentStatus: 'SUCCESS',
      razorpayOrderId: 'DIRECT_PAYMENT',
      razorpayPaymentId: inc.source.toUpperCase().replace(/\s+/g, '_'),
      paymentVerificationStatus: 'MANUAL_ENTRY',
      enrollmentStatus: 'ACTIVE',
      emailDeliveryStatus: 'SENT',
      createdAt: inc.createdAt || inc.timestamp,
      paymentChannel: 'MANUAL',
    }));

    // Calculate Segmented Revenues
    let razorpayRevenue = 0;
    let totalPaidStudentsCount = 0;
    let todaySalesCount = 0;
    let todaySalesAmount = 0;
    let pendingOrdersCount = 0;

    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

    razorpayStudents.forEach((s) => {
      const isPaid = s.paymentStatus === 'SUCCESS';
      const amt = Number(s.amount) || 0;
      const createdTime = new Date(s.createdAt || s.timestamp || 0).getTime();

      if (isPaid) {
        razorpayRevenue += amt;
        totalPaidStudentsCount += 1;

        if (!isNaN(createdTime) && createdTime >= startOfToday) {
          todaySalesCount += 1;
          todaySalesAmount += amt;
        }
      } else {
        pendingOrdersCount += 1;
      }
    });

    let manualRevenue = 0;
    manualIncomes.forEach((inc) => {
      manualRevenue += Number(inc.amount) || 0;
    });

    const totalRevenue = razorpayRevenue + manualRevenue;

    let totalExpenses = 0;
    expenses.forEach((e) => {
      totalExpenses += Number(e.amount) || 0;
    });

    const netBalance = totalRevenue - totalExpenses;

    // Filter Logic
    const searchQuery = (searchParams.get('search') || '').toLowerCase().trim();
    const dateRange = searchParams.get('dateRange') || 'all_time';
    const course = searchParams.get('course') || 'all';
    const status = searchParams.get('status') || 'all';
    const channel = searchParams.get('channel') || 'all'; // 'all', 'razorpay', 'manual'

    // Combine student rows depending on selected channel
    let combinedStudentsList: PaidStudentRow[] = [];
    if (channel === 'razorpay') {
      combinedStudentsList = [...razorpayStudents];
    } else if (channel === 'manual') {
      combinedStudentsList = [...manualAsStudents];
    } else {
      combinedStudentsList = [...razorpayStudents, ...manualAsStudents];
    }

    // Sort by newest first
    combinedStudentsList.sort((a, b) => {
      const timeA = new Date(a.createdAt || a.timestamp || 0).getTime();
      const timeB = new Date(b.createdAt || b.timestamp || 0).getTime();
      return timeB - timeA;
    });

    let filteredStudents = combinedStudentsList.filter((student) => {
      if (searchQuery) {
        const matchesName = String(student.fullName || '').toLowerCase().includes(searchQuery);
        const matchesEmail = String(student.email || '').toLowerCase().includes(searchQuery);
        const matchesPhone = String(student.whatsappNumber || '').includes(searchQuery);
        const matchesAdmission = String(student.admissionNumber || '').toLowerCase().includes(searchQuery);
        if (!matchesName && !matchesEmail && !matchesPhone && !matchesAdmission) {
          return false;
        }
      }

      if (course !== 'all' && student.courseCode !== course) {
        return false;
      }

      if (status !== 'all' && student.paymentStatus !== status) {
        return false;
      }

      if (dateRange !== 'all_time') {
        const createdTime = new Date(student.createdAt || student.timestamp || 0).getTime();
        const oneDayMs = 24 * 60 * 60 * 1000;

        if (dateRange === 'today') {
          if (createdTime < startOfToday) return false;
        } else if (dateRange === 'yesterday') {
          const startOfYesterday = startOfToday - oneDayMs;
          if (createdTime < startOfYesterday || createdTime >= startOfToday) return false;
        } else if (dateRange === 'this_week') {
          const sevenDaysAgo = now.getTime() - 7 * oneDayMs;
          if (createdTime < sevenDaysAgo) return false;
        } else if (dateRange === 'this_month') {
          const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
          if (createdTime < startOfMonth) return false;
        } else if (dateRange === 'this_year') {
          const startOfYear = new Date(now.getFullYear(), 0, 1).getTime();
          if (createdTime < startOfYear) return false;
        }
      }

      return true;
    });

    let filteredRevenue = 0;
    filteredStudents.forEach((s) => {
      if (s.paymentStatus === 'SUCCESS') {
        filteredRevenue += Number(s.amount) || 0;
      }
    });

    return NextResponse.json({
      success: true,
      source: rawData.source,
      stats: {
        totalRevenue,
        razorpayRevenue,
        manualRevenue,
        totalExpenses,
        netBalance,
        totalPaidStudentsCount,
        todaySalesCount,
        todaySalesAmount,
        pendingOrdersCount,
        filteredRevenue,
        filteredCount: filteredStudents.length,
      },
      students: filteredStudents,
      expenses,
      manualIncomes,
    });
  } catch (error: any) {
    console.error('[Admin API] Error fetching dashboard data:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
