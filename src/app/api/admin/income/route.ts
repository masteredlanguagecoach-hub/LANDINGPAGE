import { NextRequest, NextResponse } from 'next/server';
import { appendManualIncomeRow } from '@/lib/sheets';
import { ManualIncomeRow } from '@/types';

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

    const { source, fullName, email, whatsappNumber, amount, notes, date } = body;

    if (!amount || Number(amount) <= 0) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid income amount' },
        { status: 400 }
      );
    }

    const nowIso = new Date().toISOString();
    const incomeId = `INC_${Date.now().toString(36).toUpperCase()}`;

    const newIncome: ManualIncomeRow = {
      timestamp: nowIso,
      incomeId,
      source: source || 'GPay / PhonePe',
      fullName: String(fullName || 'Direct Student / Client').trim(),
      email: String(email || '').trim(),
      whatsappNumber: String(whatsappNumber || '').trim(),
      amount: Number(amount),
      notes: String(notes || '').trim(),
      date: date || nowIso.slice(0, 10),
      createdAt: nowIso,
    };

    const success = await appendManualIncomeRow(newIncome);

    return NextResponse.json({
      success,
      income: newIncome,
      message: 'Manual income recorded successfully',
    });
  } catch (error: any) {
    console.error('[Admin Income API] Error logging manual income:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
