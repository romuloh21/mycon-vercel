"use client"
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema';
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import ExpenseListTable from './_components/ExpenseListTable';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddExpense from './_components/AddExpense';

function ExpensesScreen() {

  const [expensesList,setExpensesList]=useState([]);
  const [budgetsList,setBudgetsList]=useState([]);
  const [selectedBudgetId,setSelectedBudgetId]=useState(null);
  const [open, setOpen] = useState(false);
  const {user}=useUser();

  useEffect(()=>{
    user&&getAllExpenses();
    user&&getBudgetsList();
  },[user])

  /**
   * Used to get All expenses belong to users
   */
  const getAllExpenses=async()=>{
    const result=await db.select({
      id:Expenses.id,
      name:Expenses.name,
      amount:Expenses.amount,
      createdAt:Expenses.createdAt
    }).from(Budgets)
    .rightJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
    .where(eq(Budgets.createdBy,user?.primaryEmailAddress.emailAddress))
    .orderBy(desc(Expenses.id));
    setExpensesList(result);
  }

  /**
   * Used to get budgets list for expense creation
   */
  const getBudgetsList=async()=>{
    const result=await db.select({
      id:Budgets.id,
      name:Budgets.name,
    }).from(Budgets)
    .where(eq(Budgets.createdBy,user?.primaryEmailAddress.emailAddress));
    setBudgetsList(result);
    if(result.length > 0) {
      setSelectedBudgetId(result[0].id);
    }
  }

  return (
    <div className='p-4 md:p-6 lg:p-10'>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6'>
        <h2 className='font-bold text-2xl md:text-3xl'>My Expenses</h2>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="flex gap-2 w-full sm:w-auto">
              <Plus className="w-4 h-4" />
              <span className="sm:inline">Add New Expense</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="mx-4 max-w-md sm:max-w-lg">
            <DialogHeader className="text-center pb-4">
              <DialogTitle className="text-xl md:text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
                <div className='w-6 h-6 md:w-8 md:h-8 border rounded-full bg-blue-600 flex items-center justify-center'>
                  <Plus className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
                Add New Expense
              </DialogTitle>
              <DialogDescription className="text-gray-600 text-sm md:text-base mt-2 px-2">
                Create a new expense entry and assign it to one of your existing budgets to track your spending.
              </DialogDescription>
            </DialogHeader>
            
            <div className='mt-4 px-2'>
              <h2 className='text-black font-medium my-1 text-sm md:text-base'>Select Budget</h2>
              <select 
                className='w-full p-3 border rounded-lg text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500'
                value={selectedBudgetId || ''}
                onChange={(e) => setSelectedBudgetId(e.target.value)}
              >
                <option value="">Select a budget</option>
                <option value={null}>None</option>
                {budgetsList.map((budget) => (
                  <option key={budget.id} value={budget.id}>
                    {budget.name}
                  </option>
                ))}
              </select>
            </div>

            {selectedBudgetId && (
              <div className="px-2">
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
        
      <div className="overflow-x-auto">
        <ExpenseListTable 
          refreshData={()=>getAllExpenses()}
          expensesList={expensesList}
        />
      </div>
    </div>
  )
}

export default ExpensesScreen