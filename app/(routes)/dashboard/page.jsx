"use client";

import React, { useEffect, useState } from 'react';
import { useUser } from "@clerk/nextjs";
import { db } from '@/utils/dbConfig';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { Budgets, Expenses } from '@/utils/schema';
import { useRouter } from 'next/navigation';

// Ícones do Lucide
import { 
  Search, 
  Bell, 
  Plus, 
  ShoppingBag,
  TrendingUp,
  Wallet,
  DollarSign,
  Target,
  Activity,
  Sparkles,
  ArrowUpRight,
  TrendingDown,
  Receipt,
  CreditCard,
  PieChart as PieChartIcon,
  Clock,
  LineChart
} from 'lucide-react';

// Gráficos
import { 
  Bar, 
  BarChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis,
  Tooltip, 
  Pie, 
  PieChart, 
  Cell,
  Line,
  LineChart as RechartsLineChart
} from 'recharts';

// Componentes do Shadcn/UI
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import WalletCarousel from './_components/WalletCarrousel';
// Estilos customizados
const CustomStyles = () => (
  <style jsx global>{`
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    @keyframes glow {
      0%, 100% { box-shadow: 0 0 20px rgba(0, 92, 229, 0.2); }
      50% { box-shadow: 0 0 30px rgba(0, 92, 229, 0.4); }
    }
    @keyframes fade-in {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-float { animation: float 6s ease-in-out infinite; }
    .animate-glow { animation: glow 3s ease-in-out infinite; }
    .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
    .delay-1 { animation-delay: 0.1s; }
    .delay-2 { animation-delay: 0.2s; }
    .delay-3 { animation-delay: 0.3s; }
    .delay-4 { animation-delay: 0.4s; }
    .delay-5 { animation-delay: 0.5s; }
    .glass-card {
      background: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(226, 232, 240, 0.8);
    }
  `}</style>
);

// Componente para títulos de seção
function SectionTitle({ icon: Icon, title }) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
        <Icon size={16} className="text-[#005CE5]" />
      </div>
      <h2 className="text-lg font-semibold">{title}</h2>
    </div>
  );
}

function Dashboard() {
  const { user } = useUser();
  const router = useRouter();
  
  const [budgetList, setBudgetList] = useState([]);
  const [expensesList, setExpensesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [barChartData, setBarChartData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [creditCardData, setCreditCardData] = useState([]);

  useEffect(() => {
    if (user) {
      getBudgetList();
    }
  }, [user]);

  // Atualiza os dados dos gráficos sempre que a lista de despesas ou orçamentos mudar
  useEffect(() => {
    if (budgetList.length > 0 || expensesList.length > 0) {
      processChartData();
      processCreditCardData();
    }
  }, [budgetList, expensesList]);

  // Função Auxiliar Robusta para Ler Datas
  const parseDate = (dateInput) => {
    if (!dateInput) return new Date();
    
    if (dateInput instanceof Date) return dateInput;

    if (typeof dateInput === 'string') {
        const parts = dateInput.split('/');
        if (parts.length === 3) {
            return new Date(parts[2], parts[1] - 1, parts[0]);
        }
        return new Date(dateInput);
    }
    
    return new Date();
  };
  
  // Função para processar dados dos gráficos
  const processChartData = () => {
    // 1. Lógica para o BarChart (Agrupar gastos por mês - Últimos 6 meses)
    const monthlyData = [];
    for (let i = 5; i >= 0; i--) {
        const d = new Date();
        d.setMonth(d.getMonth() - i);
        const monthName = d.toLocaleDateString('pt-BR', { month: 'short' });
        const formattedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1);
        monthlyData.push({
            name: formattedMonth,
            value: 0,
            month: d.getMonth(),
            year: d.getFullYear()
        });
    }

    expensesList.forEach(expense => {
        const expenseDate = parseDate(expense.createdAt);
        const expenseMonth = expenseDate.getMonth();
        const expenseYear = expenseDate.getFullYear();
        
        const monthEntry = monthlyData.find(m => m.month === expenseMonth && m.year === expenseYear);
        if (monthEntry) {
            monthEntry.value += Number(expense.amount);
        }
    });
    
    setBarChartData(monthlyData);

    // 2. Lógica para o PieChart (Distribuição por Orçamento)
    const processedPieData = budgetList
      .filter(b => Number(b.totalSpend) > 0)
      .slice(0, 5)
      .map((budget, index) => ({
        name: budget.name,
        value: Number(budget.totalSpend || 0),
        color: ['#005CE5', '#4f46e5', '#8b5cf6', '#a5b4fc', '#c4b5fd'][index % 5]
      }));
    
    setPieChartData(processedPieData);
  };

  // Função para processar dados do cartão de crédito (simulando últimos 30 dias)
  const processCreditCardData = () => {
    const last30Days = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      last30Days.push({
        day: date.getDate(),
        date: date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
        value: 0
      });
    }

    expensesList.forEach(expense => {
      const expenseDate = parseDate(expense.createdAt);
      const dayEntry = last30Days.find(d => {
        const entryDate = new Date();
        entryDate.setDate(d.day);
        return entryDate.getDate() === expenseDate.getDate() &&
               entryDate.getMonth() === expenseDate.getMonth();
      });
      if (dayEntry) {
        dayEntry.value += Number(expense.amount) * 0.6;
      }
    });

    setCreditCardData(last30Days);
  };

  const getBudgetList = async () => {
    setLoading(true);
    try {
      const result = await db.select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number)
      })
        .from(Budgets)
        .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
        .groupBy(Budgets.id)
        .orderBy(desc(Budgets.id));

      setBudgetList(result);
      getAllExpenses();
    } catch (error) {
      console.error("Erro ao buscar orçamentos:", error);
    }
  };

  const getAllExpenses = async () => {
    try {
      const result = await db.select({
        id: Expenses.id,
        name: Expenses.name,
        amount: Expenses.amount,
        createdAt: Expenses.createdAt
      })
        .from(Budgets)
        .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.createdBy, user?.primaryEmailAddress.emailAddress));
      
      const sortedResult = result.sort((a, b) => {
          const dateA = parseDate(a.createdAt);
          const dateB = parseDate(b.createdAt);
          return dateB - dateA || b.id - a.id;
      });
      
      setExpensesList(sortedResult);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar despesas:", error);
      setLoading(false);
    }
  };

  // Calcular totais gerais
  const totalBudget = budgetList.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const totalSpend = budgetList.reduce((sum, item) => sum + Number(item.totalSpend || 0), 0);
  const totalBalance = totalBudget - totalSpend;
  const percentageSpent = totalBudget > 0 ? (totalSpend / totalBudget) * 100 : 0;

  // Calcular despesas do mês atual
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const expensesThisMonth = expensesList.filter(expense => {
    const expenseDate = parseDate(expense.createdAt);
    return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
  }).length;

  // Formatador de Moeda
  const formatCurrency = (value) => {
    return Number(value).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  // Tooltip customizado para os gráficos
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-slate-200">
          <p className="text-sm font-semibold text-slate-900">{label}</p>
          <p className="text-sm text-slate-600">
            <span className="font-medium text-[#005CE5]">
              {formatCurrency(payload[0].value)}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
      <CustomStyles />
      
      {/* Header */}
      <header className="glass-card sticky top-0 z-50 border-b border-slate-200/50">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#005CE5] to-[#003380] rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-slate-900">
                  Olá, {user?.firstName || user?.fullName} 👋
                </h1>
                <p className="text-sm text-slate-500">Seu dashboard financeiro inteligente</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="relative hidden lg:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                <Input placeholder="Buscar transações..." className="pl-10 w-64 bg-white/80 border-slate-200" />
              </div>
              <Button variant="ghost" size="icon" className="relative">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-[#005CE5] rounded-full"></span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1600px] mx-auto px-4 sm:px-8 py-6 sm:py-8 space-y-8">
        
        {/* Módulo 1 - Hero Stats */}
        <section className="animate-fade-in">
          <div className="mb-8 relative">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#005CE5] rounded-full mix-blend-multiply filter blur-[128px] opacity-5 animate-float"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 relative z-10">
              {/* Total Balance */}
              <Card className="md:col-span-2 bg-gradient-to-br from-[#005CE5] to-[#003380] text-white border-0 shadow-xl animate-glow">
                <CardContent className="pt-6 sm:pt-8 pb-6">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <p className="text-blue-200 text-sm mb-2 flex items-center gap-2">
                        <Wallet size={16} />
                        Saldo Restante
                      </p>
                      <h2 className="text-3xl sm:text-5xl font-bold mb-2">
                        {formatCurrency(totalBalance)}
                      </h2>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="flex items-center gap-1 text-white">
                          {percentageSpent > 0 ? `-${percentageSpent.toFixed(1)}% ` : '0%'}
                        </span>
                        <span className="text-blue-200">do orçamento total</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <TrendingUp size={24} className="sm:w-8 sm:h-8" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                    <div>
                      <p className="text-blue-200 text-xs mb-1">Orçamento Total</p>
                      <p className="text-lg sm:text-xl font-bold">{formatCurrency(totalBudget)}</p>
                    </div>
                    <div>
                      <p className="text-blue-200 text-xs mb-1">Gasto Total</p>
                      <p className="text-lg sm:text-xl font-bold">{formatCurrency(totalSpend)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="glass-card border-slate-200 shadow-lg">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <Sparkles size={18} className="text-[#005CE5]" />
                    Ações Rápidas
                  </h3>
                  <div className="space-y-3">
                    <button 
                      onClick={() => router.push('/dashboard/budgets')}
                      className="w-full p-4 bg-[#005CE5] hover:bg-[#004bbd] text-white rounded-xl transition-all hover:-translate-y-1 shadow-md flex items-center justify-between group"
                    >
                      <span className="font-medium">Novo Orçamento</span>
                      <Plus size={20} className="group-hover:rotate-90 transition-transform" />
                    </button>
                    <button 
                      onClick={() => router.push('/dashboard/expenses')}
                      className="w-full p-4 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-xl transition-all hover:-translate-y-1 flex items-center justify-between"
                    >
                      <span className="font-medium">Ver Despesas</span>
                      <ArrowUpRight size={20} />
                    </button>
                  </div>

                  <div className="mt-6 pt-6 border-t border-slate-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-600">Saúde Financeira</span>
                      <span className="text-2xl font-bold text-blue-600">
                        {totalBudget > 0 ? Math.max(0, Math.min(100, Math.round(100 - percentageSpent))) : 0}/100
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-red-500 to-blue-700 h-2 rounded-full transition-all" 
                        style={{ width: `${totalBudget > 0 ? Math.max(0, Math.min(100, 100 - percentageSpent)) : 0}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Módulo 2 - Histórico Mensal */}
        <section className="animate-fade-in delay-1 opacity-0">
          <SectionTitle icon={TrendingUp} title="Gastos no Mês" />
          <Card className="glass-card border-slate-200 shadow-lg">
            <CardContent className="pt-6">
              <div className="h-[280px] sm:h-[320px]">
                {barChartData.length > 0 && barChartData.some(d => d.value > 0) ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barChartData} margin={{ top: 20, right: 10, left: -10, bottom: 5 }}>
                      <XAxis 
                        dataKey="name" 
                        stroke="#94a3b8" 
                        fontSize={12} 
                        tickLine={false} 
                        axisLine={false} 
                      />
                      <YAxis 
                        stroke="#94a3b8" 
                        fontSize={12} 
                        tickLine={false} 
                        axisLine={false}
                        tickFormatter={(value) => `R$${value}`}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar 
                        dataKey="value" 
                        fill="url(#colorGradient)" 
                        radius={[8, 8, 0, 0]} 
                      />
                      <defs>
                        <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#005CE5" stopOpacity={1}/>
                          <stop offset="100%" stopColor="#003380" stopOpacity={0.8}/>
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-slate-400">
                    <div className="text-center">
                      <Activity size={48} className="mx-auto mb-4 opacity-50" />
                      <p className="text-sm">Sem dados suficientes para o gráfico</p>
                      <p className="text-xs mt-1">Adicione despesas para visualizar</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </section>
        {/* Módulo 3 - Sua Carteira */}
        <section className="animate-fade-in delay-2 opacity-0">
          <SectionTitle icon={CreditCard} title="Sua Carteira" />
          <WalletCarousel />
        </section>
        {/* Módulo 3 - Sua Carteira (Stats Cards) */}
        <section className="animate-fade-in delay-2 opacity-0">
          <SectionTitle icon={CreditCard} title="Sua Carteira" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <Card className="glass-card border-slate-200 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-slate-500 text-sm mb-1 flex items-center gap-2">
                      <TrendingDown size={16} />
                      Total Despesas
                    </p>
                    <h3 className="text-2xl font-bold text-slate-900">
                      {formatCurrency(totalSpend)}
                    </h3>
                  </div>
                  <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
                    <Wallet size={20} className="text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-slate-200 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-slate-500 text-sm mb-1 flex items-center gap-2">
                      <Receipt size={16} />
                      Este Mês
                    </p>
                    <h3 className="text-2xl font-bold text-slate-900">
                      {expensesThisMonth}
                    </h3>
                  </div>
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                    <Receipt size={20} className="text-[#005CE5]" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-slate-200 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-slate-500 text-sm mb-1 flex items-center gap-2">
                      <Target size={16} />
                      Orçamentos
                    </p>
                    <h3 className="text-2xl font-bold text-slate-900">
                      {budgetList.length}
                    </h3>
                  </div>
                  <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                    <Target size={20} className="text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Módulo 4 - Gastos por Categoria */}
        <section className="animate-fade-in delay-3 opacity-0">
          <SectionTitle icon={PieChartIcon} title="Gastos por Categoria" />
          <Card className="glass-card border-slate-200 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-full md:w-1/2">
                  {pieChartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={240}>
                      <PieChart>
                        <Pie 
                          data={pieChartData} 
                          cx="50%" 
                          cy="50%" 
                          innerRadius={60} 
                          outerRadius={90} 
                          dataKey="value" 
                          paddingAngle={3}
                        >
                          {pieChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => formatCurrency(value)} />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-[240px] flex items-center justify-center text-slate-400">
                      <div className="text-center">
                        <Target size={48} className="mx-auto mb-4 opacity-50" />
                        <p className="text-sm">Nenhum gasto registrado</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="w-full md:w-1/2 space-y-3">
                  {pieChartData.length > 0 ? (
                    pieChartData.map((entry, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: entry.color }} />
                          <span className="text-sm font-medium text-slate-700">{entry.name}</span>
                        </div>
                        <span className="text-sm font-bold text-slate-900">
                          {formatCurrency(entry.value)}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-slate-400 py-8">
                      <p className="text-sm">Sem gastos registrados para gerar gráfico.</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Módulo 5 - Meus Limites (Latest Budgets) */}
        <section className="animate-fade-in delay-4 opacity-0">
          <SectionTitle icon={Target} title="Meus Limites" />
          <Card className="glass-card border-slate-200 shadow-lg">
            <CardContent className="pt-6 space-y-3">
              {loading ? (
                [1, 2, 3].map((item) => (
                  <div key={item} className="h-24 bg-slate-100 rounded-xl animate-pulse" />
                ))
              ) : budgetList.length > 0 ? (
                budgetList.slice(0, 3).map((budget) => (
                  <div 
                    key={budget.id} 
                    className="p-4 border border-slate-200 rounded-xl hover:shadow-md transition-all bg-white cursor-pointer"
                    onClick={() => router.push(`/dashboard/expenses/${budget.id}`)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl p-2 bg-slate-50 rounded-lg">{budget.icon}</div>
                        <div>
                          <h4 className="font-semibold text-slate-900">{budget.name}</h4>
                          <p className="text-xs text-slate-500">{budget.totalItem} itens</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-slate-900 text-sm">{formatCurrency(budget.amount)}</p>
                        <p className="text-xs text-slate-500">
                          {formatCurrency(budget.totalSpend || 0)} gasto
                        </p>
                      </div>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-[#005CE5] to-[#003380] h-2 rounded-full transition-all"
                        style={{ 
                          width: `${Math.min((Number(budget.totalSpend || 0) / Number(budget.amount)) * 100, 100)}%` 
                        }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-slate-400 py-8">
                  <Target size={32} className="mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Nenhum orçamento criado ainda</p>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Módulo 6 - Transações Recentes */}
        <section className="animate-fade-in delay-5 opacity-0">
          <SectionTitle icon={Clock} title="Transações Recentes" />
          <Card className="glass-card border-slate-200 shadow-lg">
            <CardContent className="pt-6 space-y-3">
              {expensesList.slice(0, 5).map((expense) => (
                <div key={expense.id} className="flex justify-between items-center p-3 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 bg-blue-100 text-blue-600">
                      <AvatarFallback className="bg-transparent font-bold">
                         <DollarSign size={18} />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-slate-900 text-sm">{expense.name}</div>
                      <div className="text-xs text-slate-500">{expense.createdAt}</div>
                    </div>
                  </div>
                  <div className="font-semibold text-red-500 text-sm">
                    - {formatCurrency(expense.amount)}
                  </div>
                </div>
              ))}
              
              {expensesList.length === 0 && (
                <div className="text-center text-slate-400 py-6">
                  <ShoppingBag size={32} className="mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Nenhuma transação ainda</p>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Módulo 7 - Gasto no Cartão de Crédito */}
        <section className="animate-fade-in opacity-0" style={{ animationDelay: "0.6s" }}>
          <SectionTitle icon={LineChart} title="Gasto no Cartão de Crédito" />
          <Card className="glass-card border-slate-200 shadow-lg">
            <CardContent className="pt-6">
              <p className="mb-4 text-xs text-slate-500">Ciclo de 30 dias</p>
              <div className="h-[280px] sm:h-[320px]">
                {creditCardData.length > 0 && creditCardData.some(d => d.value > 0) ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart data={creditCardData} margin={{ top: 20, right: 10, left: -10, bottom: 5 }}>
                      <XAxis 
                        dataKey="date" 
                        stroke="#94a3b8" 
                        fontSize={12} 
                        tickLine={false} 
                        axisLine={false} 
                      />
                      <YAxis 
                        stroke="#94a3b8" 
                        fontSize={12} 
                        tickLine={false} 
                        axisLine={false}
                        tickFormatter={(value) => `R$${value}`}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#005CE5" 
                        strokeWidth={3}
                        dot={{ fill: '#005CE5', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, stroke: '#005CE5', strokeWidth: 2 }}
                      />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-slate-400">
                    <div className="text-center">
                      <CreditCard size={48} className="mx-auto mb-4 opacity-50" />
                      <p className="text-sm">Sem dados de cartão de crédito</p>
                      <p className="text-xs mt-1">Adicione transações para visualizar</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;