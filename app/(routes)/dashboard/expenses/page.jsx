"use client"
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema';
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import ExpenseListTable from './_components/ExpenseListTable';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Plus, Wallet, TrendingDown, Receipt } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddExpense from './_components/AddExpense';
import { Card, CardContent } from '@/components/ui/card';

// Estilos customizados
const CustomStyles = () => (
  <style jsx global>{`
    .glass-card {
      background: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(226, 232, 240, 0.8);
    }
  `}</style>
);

function ExpensesScreen() {
  const [expensesList, setExpensesList] = useState([]);
  const [budgetsList, setBudgetsList] = useState([]);
  const [selectedBudgetId, setSelectedBudgetId] = useState(null);
  const [open, setOpen] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    user && getAllExpenses();
    user && getBudgetsList();
  }, [user])

  /**
   * Busca todas as despesas do usuário
   */
  const getAllExpenses = async () => {
    const result = await db.select({
      id: Expenses.id,
      name: Expenses.name,
      amount: Expenses.amount,
      createdAt: Expenses.createdAt
    }).from(Budgets)
      .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress.emailAddress))
      .orderBy(desc(Expenses.id));
    setExpensesList(result);
  }

  /**
   * Busca lista de orçamentos para criação de despesa
   */
  const getBudgetsList = async () => {
    const result = await db.select({
      id: Budgets.id,
      name: Budgets.name,
    }).from(Budgets)
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress.emailAddress));
    setBudgetsList(result);
    if (result.length > 0) {
      setSelectedBudgetId(result[0].id);
    }
  }

  // Calcular estatísticas
  const totalExpenses = expensesList.reduce((sum, expense) => sum + Number(expense.amount || 0), 0);
  const expensesThisMonth = expensesList.filter(expense => {
    const expenseDate = new Date(expense.createdAt);
    const now = new Date();
    return expenseDate.getMonth() === now.getMonth() && 
           expenseDate.getFullYear() === now.getFullYear();
  }).length;

  // Formatador de moeda
  const formatCurrency = (value) => {
    return Number(value).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
      <CustomStyles />

      <div className='p-4 md:p-6 lg:p-10'>
        {/* Cabeçalho com Cards de Resumo */}
        <div className='mb-8'>
          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6'>
            <div>
              <h2 className='font-bold text-2xl md:text-3xl text-slate-900'>Minhas Despesas</h2>
              <p className='text-sm text-slate-500 mt-1'>Gerencie e acompanhe todos os seus gastos</p>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="flex gap-2 w-full sm:w-auto bg-[#005CE5] hover:bg-[#004bbd] shadow-lg shadow-blue-500/20">
                  <Plus className="w-4 h-4" />
                  <span>Adicionar Despesa</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="mx-4 max-w-md sm:max-w-lg">
                <DialogHeader className="pb-4">
                  <DialogTitle className="text-xl md:text-2xl font-bold text-gray-800 flex items-center gap-3">
                    <div className='w-10 h-10 border rounded-full bg-[#005CE5] flex items-center justify-center shadow-lg'>
                      <Plus className="w-5 h-5 text-white" />
                    </div>
                    Adicionar Nova Despesa
                  </DialogTitle>
                  <DialogDescription className="text-gray-600 text-sm md:text-base mt-2">
                    Crie uma nova despesa e atribua a um dos seus orçamentos existentes para rastrear seus gastos.
                  </DialogDescription>
                </DialogHeader>

                <div className='mt-4'>
                  <label className='text-slate-900 font-medium mb-2 block text-sm md:text-base'>
                    Selecionar Orçamento
                  </label>
                  <select
                    className='w-full p-3 border border-slate-200 rounded-lg text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#005CE5] focus:border-transparent bg-white'
                    value={selectedBudgetId || ''}
                    onChange={(e) => setSelectedBudgetId(e.target.value)}
                  >
                    <option value="">Selecione um orçamento</option>
                    <option value={null}>Nenhum</option>
                    {budgetsList.map((budget) => (
                      <option key={budget.id} value={budget.id}>
                        {budget.name}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedBudgetId && (
                  <div className="mt-4">
                    <AddExpense
                      budgetId={selectedBudgetId}
                      user={user}
                      refreshData={() => {
                        getAllExpenses();
                        setOpen(false);
                      }}
                    />
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>

          {/* Cards de Resumo */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6'>
            <Card className="glass-card border-slate-200 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-slate-500 text-sm mb-1 flex items-center gap-2">
                      <TrendingDown size={16} />
                      Total de Despesas
                    </p>
                    <h3 className="text-3xl font-bold text-slate-900">
                      {formatCurrency(totalExpenses)}
                    </h3>
                  </div>
                  <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
                    <Wallet size={24} className="text-red-600" />
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
                      Despesas Este Mês
                    </p>
                    <h3 className="text-3xl font-bold text-slate-900">
                      {expensesThisMonth}
                    </h3>
                  </div>
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                    <Receipt size={24} className="text-[#005CE5]" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-slate-200 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-slate-500 text-sm mb-1">
                      Total de Registros
                    </p>
                    <h3 className="text-3xl font-bold text-slate-900">
                      {expensesList.length}
                    </h3>
                  </div>
                  <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                    <TrendingDown size={24} className="text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tabela de Despesas */}
        <Card className="glass-card border-slate-200 shadow-lg">
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <ExpenseListTable
                refreshData={() => getAllExpenses()}
                expensesList={expensesList}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ExpensesScreen