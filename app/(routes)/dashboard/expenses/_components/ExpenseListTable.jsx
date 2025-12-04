import { db } from '@/utils/dbConfig'
import { Expenses } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Trash2, Receipt, AlertCircle } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button'

function ExpenseListTable({ expensesList, refreshData }) {

  const [deleteId, setDeleteId] = useState(null); // Estado para controlar o Dialog

  const deleteExpense = async () => {
    if (!deleteId) return;

    try {
      const result = await db.delete(Expenses)
        .where(eq(Expenses.id, deleteId))
        .returning();

      if (result) {
        toast.success('Despesa excluída com sucesso!');
        refreshData();
        setDeleteId(null);
      }
    } catch (error) {
      toast.error('Erro ao excluir despesa');
      console.error(error);
    }
  }

  // Função para formatar moeda
  const formatCurrency = (value) => {
    return Number(value).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  return (
    <div className='mt-6 animate-slide-in'>
      
      {/* Cabeçalho da Seção */}
      <div className="flex items-center justify-between mb-4">
        <h2 className='font-bold text-xl text-slate-900 flex items-center gap-2'>
            <Receipt className="text-[#005CE5]" size={24}/>
            Últimas Despesas
        </h2>
      </div>
      
      {/* Tabela / Lista */}
      <div className='bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden'>
        
        {/* Header da Tabela */}
        <div className='grid grid-cols-4 bg-slate-50/80 p-4 border-b border-slate-100 text-sm font-semibold text-slate-500'>
          <h2 className='pl-2'>Nome</h2>
          <h2>Valor</h2>
          <h2>Data</h2>
          <h2 className='text-right pr-4'>Ação</h2>
        </div>

        {/* Linhas da Tabela */}
        <div className='divide-y divide-slate-100'>
          {expensesList.map((expense) => (
            <div 
              key={expense.id} 
              className='grid grid-cols-4 p-4 items-center hover:bg-blue-50/30 transition-colors duration-200 group'
            >
              <h2 className='text-slate-700 font-medium pl-2 truncate pr-2'>{expense.name}</h2>
              <h2 className='font-bold text-slate-900'>{formatCurrency(expense.amount)}</h2>
              <h2 className='text-slate-500 text-sm'>{expense.createdAt}</h2>
              <div className='flex justify-end pr-2'>
                <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-9 w-9 text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all"
                    onClick={() => setDeleteId(expense.id)}
                >
                    <Trash2 size={18} />
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Estado Vazio */}
        {expensesList.length === 0 && (
           <div className="py-12 flex flex-col items-center justify-center text-center text-slate-400">
             <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                <Receipt size={32} className="opacity-20" />
             </div>
             <p className="font-medium text-slate-600">Nenhuma despesa encontrada</p>
             <p className="text-sm mt-1 opacity-70">Suas novas despesas aparecerão aqui.</p>
           </div>
        )}
      </div>

      {/* Alert Dialog de Segurança */}
      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-red-600">
                <AlertCircle size={20}/> Confirmar Exclusão
            </AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja apagar esta despesa? O valor será devolvido ao saldo do orçamento.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={deleteExpense} className="bg-red-600 hover:bg-red-700">
              Apagar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  )
}

export default ExpenseListTable