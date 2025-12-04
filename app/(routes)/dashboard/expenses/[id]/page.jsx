"use client"
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import BudgetItem from '../../budgets/_components/BudgetItem';
import AddExpense from '../_components/AddExpense';
import ExpenseListTable from '../_components/ExpenseListTable';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Pen, PenBox, Trash } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import EditBudget from '../_components/EditBudget';

function ExpensesScreen({params}) {
    const {user}=useUser();
    const [budgetInfo,setbudgetInfo]=useState();
    const [expensesList,setExpensesList]=useState([]);
    const route=useRouter();
    useEffect(()=>{
        
        user&&getBudgetInfo();
       
    },[user]);

    /**
     * Get Budget Information
     */
    const getBudgetInfo=async()=>{
        const result = await db.select({
            ...getTableColumns(Budgets),
            totalSpend:sql `sum(${Expenses.amount})`.mapWith(Number),
            totalItem: sql `count(${Expenses.id})`.mapWith(Number)
          }).from(Budgets)
          .leftJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
          .where(eq(Budgets.createdBy,user?.primaryEmailAddress?.emailAddress))
          .where(eq(Budgets.id,params.id))
          .groupBy(Budgets.id)

          setbudgetInfo(result[0]);
          getExpensesList();
    }

    /**
     * Get Latest Expenses
     */
    const getExpensesList=async()=>{
      const result=await db.select().from(Expenses)
      .where(eq(Expenses.budgetId,params.id))
      .orderBy(desc(Expenses.id));
      setExpensesList(result);
      console.log(result)
    }

    /**
     * Used to Delete budget
     */
    const deleteBudget=async()=>{

      const deleteExpenseResult=await db.delete(Expenses)
      .where(eq(Expenses.budgetId,params.id))
      .returning()

      if(deleteExpenseResult)
      {
        const result=await db.delete(Budgets)
        .where(eq(Budgets.id,params.id))
        .returning();
      }
      toast('Budget Deleted !');
      route.replace('/dashboard/budgets');
    }
   
  return (
    <div className='p-4 md:p-6 lg:p-10'>
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6'>
            <div className='flex gap-2 items-center'> 
                <ArrowLeft 
                    onClick={()=>route.back()} 
                    className='cursor-pointer hover:bg-gray-100 p-1 rounded w-8 h-8'
                />
                <h2 className='text-xl sm:text-2xl font-bold'>Detalhes Orçamento</h2>
            </div>
            
            <div className='flex gap-2 items-center w-full sm:w-auto'>
                <EditBudget 
                    budgetInfo={budgetInfo}
                    refreshData={()=>getBudgetInfo()}  
                />
                
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button className="flex gap-2 w-full sm:w-auto" variant="destructive"> 
                            <Trash className="w-4 h-4"/>
                            <span className="sm:inline">Delete</span>
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="mx-4 max-w-md sm:max-w-lg">
                        <AlertDialogHeader>
                            <AlertDialogTitle className="text-lg sm:text-xl">
                                Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-sm sm:text-base">
                                This action cannot be undone. This will permanently delete your current budget along with expenses
                                and remove your data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                            <AlertDialogCancel className="w-full sm:w-auto">Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                                onClick={()=>deleteBudget()}
                                className="w-full sm:w-auto"
                            >
                                Continue
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 mt-6 gap-4 md:gap-5'>
           {budgetInfo? <BudgetItem
            budget={budgetInfo}
            />:
            <div className='h-[140px] sm:h-[150px] w-full bg-slate-200 
            rounded-lg animate-pulse'>
            </div>}
            <AddExpense 
                budgetId={params.id}
                user={user}
                refreshData={()=>getBudgetInfo()}
            />
        </div>
        
        <div className='mt-6'>
            <div className="overflow-x-auto">
                <ExpenseListTable 
                    expensesList={expensesList}
                    refreshData={()=>getBudgetInfo()} 
                />
            </div>
        </div>
    </div>
  )
}

export default ExpensesScreen