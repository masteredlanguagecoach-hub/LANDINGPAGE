import { NextRequest, NextResponse } from 'next/server';
import { appendExpenseRow } from '@/lib/sheets';
import { ExpenseRow } from '@/types';

export const dynamic = 'force-dynamic';

const DEFAULT_ADMIN_PIN = '7860';

export async function POST(req: NextRequest) {
  try {
    const pin = req.headers.get('x-admin-pin');
    const body = await req.json().catch(() => ({}));
    const reqPin = pin || body.pin;
    const expectedPin = process.env.ADMIN_PIN || process.env.ADMIN_PASSWORD || DEFAULT_ADMIN_PIN;

    if (reqPin !== expectedPin) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Invalid Admin PIN' },
        { status: 401 }
      );
    }

    const { category, description, amount, date } = body;

    if (!category || !amount || Number(amount) <= 0) {
      return NextResponse.json(
        { success: false, error: 'Please provide valid expense category and amount' },
        { status: 400 }
      );
    }

    const nowIso = new Date().toISOString();
    const expenseId = `EXP_${Date.now().toString(36).toUpperCase()}`;

    const newExpense: ExpenseRow = {
      timestamp: nowIso,
      expenseId,
      category: category || 'Other',
      description: String(description || '').trim(),
      amount: Number(amount),
      date: date || nowIso.slice(0, 10),
      createdAt: nowIso,
    };

    const success = await appendExpenseRow(newExpense);

    return NextResponse.json({
      success,
      expense: newExpense,
      message: 'Expense recorded successfully',
    });
  } catch (error: any) {
    console.error('[Admin Expense API] Error logging expense:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
