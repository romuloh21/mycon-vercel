import React, { useState } from 'react';
import { db } from '@/utils/dbConfig';
import { Expenses } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import moment from 'moment';
import { toast } from 'sonner';

// UI Components (Shadcn UI)
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Icons
import { 
  Loader, Plus, DollarSign, Receipt, Sparkles,
  TrendingDown, CheckCircle2, Pencil, Trash2,
  AlertCircle, Calendar, Tag
} from 'lucide-react';

// Estilos Globais para animações
const CustomStyles = () => (
  <style jsx global>{`
    @keyframes slideIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse-custom {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    .animate-slide-in { animation: slideIn 0.3s ease-out; }
    .animate-pulse-custom { animation: pulse-custom 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
  `}</style>
);

function AddExpense({ budgetId, user, refreshData, expensesList = [] }) {
  // --- Estados do Formulário ---
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [expenseDate, setExpenseDate] = useState(moment().format('YYYY-MM-DD'));
  const [category, setCategory] = useState('');
  
  // --- Estados de Controle ---
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // --- Estados de Edição/Exclusão ---
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editAmount, setEditAmount] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  /**
   * Função para formatar moeda (Input Mask)
   */
  const formatCurrency = (value) => {
    if (!value) return '';
    return value.toString().replace(/\D/g, ''); // Remove não dígitos
  };

  const handleAmountChange = (e) => {
    const formatted = formatCurrency(e.target.value);
    setAmount(formatted);
  };

  const formatDisplayCurrency = (value) => {
    return Number(value).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  /**
   * Adicionar Nova Despesa
   */
    const addNewExpense = async () => {
    setLoading(true);
    setSuccess(false);

    try {
      // 1. Formata a data selecionada pelo usuário para o padrão brasileiro (DD/MM/YYYY)
      // Se não houver data selecionada, usa o dia de hoje como fallback
      const formattedDate = expenseDate 
        ? moment(expenseDate).format('DD/MM/YYYY') 
        : moment().format('DD/MM/YYYY');

      const result = await db.insert(Expenses).values({
        name: name,
        amount: amount,
        budgetId: budgetId,
        // --- AQUI ESTAVA O ERRO ---
        // Antes: createdAt: moment().format('DD/MM/YYYY') -> Pegava SEMPRE hoje
        // Agora: createdAt: formattedDate -> Pega a data do input
        createdAt: formattedDate, 
        // Se você tiver colunas separadas para data e categoria no banco, mantenha abaixo:
        date: expenseDate, 
        category: category 
      }).returning({ insertedId: Expenses.id });

      if (result) {
        setSuccess(true);
        setAmount('');
        setName('');
        setCategory('');
        setExpenseDate(moment().format('YYYY-MM-DD')); // Reseta para hoje após salvar
        
        refreshData(); // Atualiza a Dashboard e a Lista
        
        toast.success('Despesa adicionada!', {
          description: `${name} - R$ ${amount} em ${formattedDate}`,
        });

        setTimeout(() => setSuccess(false), 2000);
      }
    } catch (error) {
      console.error('Erro ao adicionar:', error);
      toast.error('Erro ao adicionar despesa.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Editar Despesa
   */
  const startEdit = (expense) => {
    setEditingId(expense.id);
    setEditName(expense.name);
    setEditAmount(expense.amount);
  };

  const saveEdit = async (id) => {
    try {
      await db.update(Expenses)
        .set({
          name: editName,
          amount: editAmount
        })
        .where(eq(Expenses.id, id));

      toast.success('Despesa atualizada!');
      setEditingId(null);
      refreshData();
    } catch (error) {
      toast.error('Erro ao atualizar.');
    }
  };

  /**
   * Excluir Despesa
   */
  const deleteExpense = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      await db.delete(Expenses).where(eq(Expenses.id, deleteId));
      toast.success('Despesa removida!');
      setDeleteId(null);
      refreshData();
    } catch (error) {
      toast.error('Erro ao excluir.');
    } finally {
      setIsDeleting(false);
    }
  };

  // Validação do Form
  const isFormValid = name && amount && parseFloat(amount) > 0 && expenseDate && category;

  return (
    <div className="space-y-6 animate-slide-in">
      <CustomStyles />
      
      {/* --- FORMULÁRIO (Accordion) --- */}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="add-expense" className="border-none">
          <div className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-white rounded-2xl border border-slate-200/60 shadow-xl">
            
            {/* Background Effect */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#005CE5] rounded-full mix-blend-multiply filter blur-[128px] opacity-[0.03] pointer-events-none"></div>
            
            <AccordionTrigger className="relative p-6 hover:no-underline group">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#005CE5] to-[#003380] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Plus size={24} className="text-white" />
                </div>
                <div className="text-left">
                  <h2 className="text-xl font-bold text-slate-900">Nova Despesa</h2>
                  <p className="text-sm text-slate-500 flex items-center gap-1">
                    <Sparkles size={14} className="text-[#005CE5]" />
                    Adicionar gastos ao orçamento
                  </p>
                </div>
              </div>
            </AccordionTrigger>

            <AccordionContent>
              <div className="p-6 pt-0 space-y-5">
                
                {/* Inputs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Nome */}
                  <div className="space-y-2 col-span-2 md:col-span-1">
                    <label className="text-sm font-semibold text-slate-700 flex gap-2">
                      <Receipt size={16} className="text-blue-600"/> Nome
                    </label>
                    <Input 
                      placeholder="Ex: Supermercado" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-white h-11 border-slate-200 focus:border-blue-500 transition-all"
                    />
                  </div>

                  {/* Valor */}
                  <div className="space-y-2 col-span-2 md:col-span-1">
                    <label className="text-sm font-semibold text-slate-700 flex gap-2">
                      <DollarSign size={16} className="text-blue-600"/> Valor
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">R$</span>
                      <Input 
                        type="number"
                        placeholder="0.00" 
                        value={amount}
                        onChange={handleAmountChange}
                        className="bg-white h-11 pl-10 border-slate-200 focus:border-blue-500 font-semibold"
                      />
                    </div>
                  </div>

                  {/* Data */}
                  <div className="space-y-2 col-span-2 md:col-span-1">
                    <label className="text-sm font-semibold text-slate-700 flex gap-2">
                      <Calendar size={16} className="text-blue-600"/> Data
                    </label>
                    <Input 
                      type="date"
                      value={expenseDate}
                      onChange={(e) => setExpenseDate(e.target.value)}
                      className="bg-white h-11 border-slate-200"
                    />
                  </div>

                  {/* Categoria */}
                  <div className="space-y-2 col-span-2 md:col-span-1">
                    <label className="text-sm font-semibold text-slate-700 flex gap-2">
                      <Tag size={16} className="text-blue-600"/> Categoria
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="flex h-11 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">Selecione...</option>
                      <option value="Alimentação">Alimentação</option>
                      <option value="Moradia">Moradia</option>
                      <option value="Transporte">Transporte</option>
                      <option value="Lazer">Lazer</option>
                      <option value="Saúde">Saúde</option>
                      <option value="Educação">Educação</option>
                    </select>
                  </div>
                </div>

                {/* Botão Salvar */}
                <Button 
                  disabled={!isFormValid || loading}
                  onClick={addNewExpense}
                  className="w-full h-12 bg-gradient-to-r from-[#005CE5] to-[#003380] hover:shadow-lg transition-all rounded-xl mt-4"
                >
                  {loading ? <Loader className="animate-spin" /> : (
                    success ? <CheckCircle2 className="animate-pulse" /> : "Adicionar Despesa"
                  )}
                </Button>
              </div>
              <div className="h-1 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600"/>
            </AccordionContent>
          </div>
        </AccordionItem>
      </Accordion>

      {/* --- LISTA DE DESPESAS --- */}
      {expensesList && expensesList.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Receipt className="text-blue-600" />
            <h3 className="font-bold text-lg text-slate-800">Últimas Despesas</h3>
          </div>

          {expensesList.map((expense) => (
            <div key={expense.id} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
              {editingId === expense.id ? (
                // MODO EDIÇÃO
                <div className="flex gap-2 items-center">
                  <Input value={editName} onChange={(e)=>setEditName(e.target.value)} className="h-9" />
                  <Input value={editAmount} onChange={(e)=>setEditAmount(e.target.value)} type="number" className="h-9 w-24" />
                  <Button size="sm" onClick={() => saveEdit(expense.id)} className="bg-green-600 hover:bg-green-700"><CheckCircle2 size={16}/></Button>
                  <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}>Cancelar</Button>
                </div>
              ) : (
                // MODO VISUALIZAÇÃO
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-50 p-2 rounded-lg">
                       <TrendingDown size={18} className="text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800">{expense.name}</h4>
                      <p className="text-xs text-slate-500">{expense.date} • {expense.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-slate-900">{formatDisplayCurrency(expense.amount)}</span>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-500" onClick={() => startEdit(expense)}>
                        <Pencil size={14} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => setDeleteId(expense.id)}>
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* --- DIALOG DE EXCLUSÃO --- */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-red-600">
              <AlertCircle /> Excluir Despesa?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Essa ação não pode ser desfeita. Isso removerá permanentemente o registro do banco de dados.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={deleteExpense} disabled={isDeleting} className="bg-red-600 hover:bg-red-700">
              {isDeleting ? <Loader className="animate-spin" size={16}/> : "Excluir"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default AddExpense;