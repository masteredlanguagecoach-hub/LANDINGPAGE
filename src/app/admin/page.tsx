'use client';

import React, { useState, useEffect, useCallback } from 'react';
import AdminPinModal from '@/components/admin/AdminPinModal';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminSummaryBanner from '@/components/admin/AdminSummaryBanner';
import AdminKpiGrid from '@/components/admin/AdminKpiGrid';
import AdminAccountingSection from '@/components/admin/AdminAccountingSection';
import AdminAddExpenseModal from '@/components/admin/AdminAddExpenseModal';
import AdminAddIncomeModal from '@/components/admin/AdminAddIncomeModal';
import AdminExpenseTable from '@/components/admin/AdminExpenseTable';
import AdminFiltersBar from '@/components/admin/AdminFiltersBar';
import AdminDataTable from '@/components/admin/AdminDataTable';
import { PaidStudentRow, ExpenseRow } from '@/types';

export default function AdminPage() {
  const [adminPin, setAdminPin] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('all_time');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedChannel, setSelectedChannel] = useState('all'); // 'all', 'razorpay', 'manual'

  // Modal States
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [isAddIncomeOpen, setIsAddIncomeOpen] = useState(false);

  // Data States
  const [students, setStudents] = useState<PaidStudentRow[]>([]);
  const [expenses, setExpenses] = useState<ExpenseRow[]>([]);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    razorpayRevenue: 0,
    manualRevenue: 0,
    totalExpenses: 0,
    netBalance: 0,
    totalPaidStudentsCount: 0,
    todaySalesCount: 0,
    todaySalesAmount: 0,
    pendingOrdersCount: 0,
    filteredRevenue: 0,
    filteredCount: 0,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Check saved session PIN on load
  useEffect(() => {
    const savedPin = sessionStorage.getItem('mlc_admin_pin');
    if (savedPin) {
      setAdminPin(savedPin);
      setIsAuthenticated(true);
    }
    setIsInitializing(false);
  }, []);

  // Fetch Dashboard Data from API
  const fetchData = useCallback(
    async (pinToUse: string, isManualRefresh = false) => {
      if (isManualRefresh) setIsRefreshing(true);
      else setIsLoading(true);

      try {
        const params = new URLSearchParams();
        params.append('pin', pinToUse);
        params.append('dateRange', dateRange);
        params.append('course', selectedCourse);
        params.append('status', selectedStatus);
        params.append('channel', selectedChannel);
        if (searchQuery.trim()) {
          params.append('search', searchQuery.trim());
        }

        const res = await fetch(`/api/admin/data?${params.toString()}`, {
          headers: { 'x-admin-pin': pinToUse },
          cache: 'no-store',
        });

        const data = await res.json();
        if (data && data.success) {
          setStudents(data.students || []);
          setExpenses(data.expenses || []);
          if (data.stats) {
            setStats(data.stats);
          }
          return true;
        } else {
          sessionStorage.removeItem('mlc_admin_pin');
          setIsAuthenticated(false);
          setAdminPin(null);
          return false;
        }
      } catch (error) {
        console.error('[Admin Dashboard] Failed to fetch live data:', error);
        return false;
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    },
    [dateRange, selectedCourse, selectedStatus, selectedChannel, searchQuery]
  );

  // Fetch data when filters or auth state changes
  useEffect(() => {
    if (isAuthenticated && adminPin) {
      fetchData(adminPin);
    }
  }, [isAuthenticated, adminPin, fetchData]);

  // Handle PIN verification
  const handleVerifyPin = async (inputPin: string): Promise<boolean> => {
    const success = await fetchData(inputPin);
    if (success) {
      setAdminPin(inputPin);
      setIsAuthenticated(true);
      sessionStorage.setItem('mlc_admin_pin', inputPin);
      return true;
    }
    return false;
  };

  // Submit Expense Handler
  const handleAddExpense = async (expensePayload: {
    category: string;
    description: string;
    amount: number;
    date: string;
  }): Promise<boolean> => {
    if (!adminPin) return false;

    try {
      const res = await fetch('/api/admin/expense', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-pin': adminPin,
        },
        body: JSON.stringify(expensePayload),
      });

      const data = await res.json();
      if (data && data.success) {
        await fetchData(adminPin, true);
        return true;
      }
      return false;
    } catch (err) {
      console.error('[Admin Dashboard] Failed to submit expense:', err);
      return false;
    }
  };

  // Submit Manual Income Handler
  const handleAddIncome = async (incomePayload: {
    source: string;
    fullName: string;
    email: string;
    whatsappNumber: string;
    amount: number;
    notes: string;
    date: string;
  }): Promise<boolean> => {
    if (!adminPin) return false;

    try {
      const res = await fetch('/api/admin/income', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-pin': adminPin,
        },
        body: JSON.stringify(incomePayload),
      });

      const data = await res.json();
      if (data && data.success) {
        await fetchData(adminPin, true);
        return true;
      }
      return false;
    } catch (err) {
      console.error('[Admin Dashboard] Failed to submit manual income:', err);
      return false;
    }
  };

  // Logout handler
  const handleLogout = () => {
    sessionStorage.removeItem('mlc_admin_pin');
    setAdminPin(null);
    setIsAuthenticated(false);
  };

  // Export Sales Report CSV handler
  const handleExportCsv = () => {
    if (students.length === 0) {
      alert('No records available to export.');
      return;
    }

    const headers = [
      'Admission Number',
      'Full Name',
      'Email',
      'WhatsApp Number',
      'Course Code / Source',
      'Course Name',
      'Amount (INR)',
      'Payment Status',
      'Razorpay Order ID',
      'Razorpay Payment ID',
      'Registration Timestamp',
    ];

    const rows = students.map((s) => [
      `"${s.admissionNumber || ''}"`,
      `"${(s.fullName || '').replace(/"/g, '""')}"`,
      `"${s.email || ''}"`,
      `"${s.whatsappNumber || ''}"`,
      `"${s.courseCode || ''}"`,
      `"${(s.courseName || '').replace(/"/g, '""')}"`,
      s.amount || 399,
      `"${s.paymentStatus || 'SUCCESS'}"`,
      `"${s.razorpayOrderId || ''}"`,
      `"${s.razorpayPaymentId || ''}"`,
      `"${s.createdAt || s.timestamp || ''}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const dateStr = new Date().toISOString().slice(0, 10);
    link.setAttribute('download', `SalesReport_${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Format date range label for summary banner
  const getDateRangeLabel = (): string => {
    switch (dateRange) {
      case 'today':
        return 'Today';
      case 'yesterday':
        return 'Yesterday';
      case 'this_week':
        return 'This Week (Last 7 Days)';
      case 'this_month':
        return 'This Month (Last 30 Days)';
      case 'this_year':
        return 'This Year (Last 365 Days)';
      default:
        return 'All Time';
    }
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-[#0B0F17] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated || !adminPin) {
    return <AdminPinModal onVerify={handleVerifyPin} />;
  }

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 font-sans selection:bg-brand-500 selection:text-white pb-20 space-y-8">
      {/* 1. Header */}
      <AdminHeader
        onRefresh={() => fetchData(adminPin, true)}
        onExportCsv={handleExportCsv}
        onLogout={handleLogout}
        isRefreshing={isRefreshing}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* 2. Hero Summary Banner */}
        <AdminSummaryBanner
          dateRangeLabel={getDateRangeLabel()}
          filteredRevenue={stats.filteredRevenue}
          filteredCount={stats.filteredCount}
          pendingOrdersCount={stats.pendingOrdersCount}
        />

        {/* 3. Financial Balance & Accounting Section */}
        <AdminAccountingSection
          totalRevenue={stats.totalRevenue}
          razorpayRevenue={stats.razorpayRevenue}
          manualRevenue={stats.manualRevenue}
          totalExpenses={stats.totalExpenses}
          netBalance={stats.netBalance}
          onOpenAddExpense={() => setIsAddExpenseOpen(true)}
          onOpenAddIncome={() => setIsAddIncomeOpen(true)}
        />

        {/* 4. Expenses Log History Table */}
        <AdminExpenseTable expenses={expenses} isLoading={isLoading} />

        {/* 5. 4 KPI Stat Cards */}
        <AdminKpiGrid
          totalRevenue={stats.totalRevenue}
          totalPaidStudentsCount={stats.totalPaidStudentsCount}
          todaySalesCount={stats.todaySalesCount}
          todaySalesAmount={stats.todaySalesAmount}
          pendingOrdersCount={stats.pendingOrdersCount}
        />

        {/* 6. Interactive Filters Bar (Includes Channel filter to view Razorpay students normally!) */}
        <AdminFiltersBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          dateRange={dateRange}
          setDateRange={setDateRange}
          selectedCourse={selectedCourse}
          setSelectedCourse={setSelectedCourse}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          selectedChannel={selectedChannel}
          setSelectedChannel={setSelectedChannel}
        />

        {/* 7. Live Synced Student Data Table */}
        <AdminDataTable students={students} isLoading={isLoading} />
      </main>

      {/* Add Expense Modal */}
      <AdminAddExpenseModal
        isOpen={isAddExpenseOpen}
        onClose={() => setIsAddExpenseOpen(false)}
        onSubmitExpense={handleAddExpense}
      />

      {/* Add Manual Income Modal */}
      <AdminAddIncomeModal
        isOpen={isAddIncomeOpen}
        onClose={() => setIsAddIncomeOpen(false)}
        onSubmitIncome={handleAddIncome}
      />
    </div>
  );
}
