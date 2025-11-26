"use client"

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import EmojiPicker from 'emoji-picker-react'
import { useUser } from '@clerk/nextjs'
import { db } from '@/utils/dbConfig'
import { Budgets } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { toast } from 'sonner'
import { 
  PenBox, 
  Pencil, 
  Sparkles, 
  Loader, 
  CheckCircle2, 
  Wallet,
  Type,
  SmilePlus
} from 'lucide-react'

// Estilos customizados (mesmos do AddExpense para consistência)
const CustomStyles = () => (
  <style jsx global>{`
    @keyframes pulse-custom {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    .animate-pulse-custom {
      animation: pulse-custom 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
  `}</style>
);

function EditBudget({ budgetInfo, refreshData }) {
  const [emojiIcon, setEmojiIcon] = useState(budgetInfo?.icon);
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setName] = useState(budgetInfo?.name);
  const [amount, setAmount] = useState(budgetInfo?.amount);
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Controle do Dialog

  const { user } = useUser();

  // Sincroniza estados quando o budgetInfo muda
  useEffect(() => {
    if (budgetInfo) {
      setEmojiIcon(budgetInfo?.icon);
      setAmount(budgetInfo?.amount);
      setName(budgetInfo?.name);
    }
  }, [budgetInfo]);

  // Formatação de Moeda
  const formatCurrency = (value) => {
    if (!value) return '';
    return value.toString().replace(/\D/g, '');
  };

  const handleAmountChange = (e) => {
    const formatted = formatCurrency(e.target.value);
    setAmount(formatted);
  };

  const onUpdateBudget = async () => {
    setLoading(true);
    setSuccess(false);

    try {
      const result = await db.update(Budgets).set({
        name: name,
        amount: amount,
        icon: emojiIcon,
      }).where(eq(Budgets.id, budgetInfo.id))
      .returning();

      if (result) {
        setSuccess(true);
        refreshData();
        toast.success('Orçamento atualizado!', {
            description: `${name} foi alterado com sucesso.`
        });
        
        // Fecha o modal após um breve delay para mostrar o sucesso
        setTimeout(() => {
            setSuccess(false);
            setIsOpen(false);
        }, 1000);
      }
    } catch (error) {
        console.error(error);
        toast.error("Erro ao atualizar orçamento.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div>
      <CustomStyles />
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" className="flex gap-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-all"> 
            <Pencil size={18}/> Editar
          </Button>
        </DialogTrigger>
        
        <DialogContent className="sm:max-w-[425px] border-none shadow-2xl bg-white/95 backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-bold text-slate-900">
                <div className="p-2 bg-blue-100 rounded-lg">
                    <PenBox className="text-[#005CE5]" size={20}/>
                </div>
                Editar Orçamento
            </DialogTitle>
            <DialogDescription className="text-slate-500">
              Atualize os detalhes do seu orçamento abaixo.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-6">
            
            {/* Seletor de Emoji */}
            <div className="flex flex-col items-center gap-3">
               <div className="relative">
                 <Button 
                    variant="outline"
                    className="h-16 w-16 rounded-2xl text-3xl border-2 border-slate-200 hover:border-[#005CE5] hover:bg-blue-50 transition-all shadow-sm flex items-center justify-center relative group"
                    onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                 >
                    {emojiIcon}
                    <div className="absolute -bottom-2 -right-2 bg-[#005CE5] text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <SmilePlus size={12} />
                    </div>
                 </Button>
                 
                 {openEmojiPicker && (
                    <div className="absolute z-50 left-1/2 -translate-x-1/2 top-full mt-2 shadow-xl rounded-xl border border-slate-200">
                        <EmojiPicker
                            width={300}
                            height={400}
                            onEmojiClick={(e) => {
                                setEmojiIcon(e.emoji);
                                setOpenEmojiPicker(false);
                            }}
                        />
                    </div>
                 )}
               </div>
               <p className="text-xs text-slate-400 font-medium">Ícone do Orçamento</p>
            </div>

            {/* Nome do Orçamento */}
            <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex gap-2 items-center">
                    <Type size={16} className="text-[#005CE5]"/> Nome
                </label>
                <Input 
                    placeholder="Ex: Decoração, Viagem..."
                    defaultValue={budgetInfo?.name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-12 border-2 border-slate-200 rounded-xl focus:border-[#005CE5] transition-all"
                />
            </div>

            {/* Valor do Orçamento */}
            <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex gap-2 items-center">
                    <Wallet size={16} className="text-[#005CE5]"/> Valor Total
                </label>
                <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">R$</span>
                    <Input
                        type="number"
                        defaultValue={budgetInfo?.amount}
                        placeholder="0.00"
                        onChange={handleAmountChange}
                        className="h-12 pl-10 border-2 border-slate-200 rounded-xl focus:border-[#005CE5] font-semibold text-slate-900 transition-all"
                    />
                </div>
            </div>
          </div>

          <DialogFooter className="mt-6 sm:justify-between gap-2">
             <DialogClose asChild>
                <Button type="button" variant="outline" className="flex-1 h-12 rounded-xl border-slate-200 hover:bg-slate-50 text-slate-600">
                    Cancelar
                </Button>
             </DialogClose>
             
             <Button 
                disabled={!(name && amount) || loading}
                onClick={onUpdateBudget}
                className="flex-1 h-12 bg-gradient-to-r from-[#005CE5] to-[#003380] hover:shadow-lg transition-all rounded-xl text-white font-semibold"
             >
                {loading ? (
                    <Loader className="animate-spin" size={20} />
                ) : success ? (
                    <>
                       <CheckCircle2 className="animate-pulse-custom mr-2" size={20} />
                       Salvo!
                    </>
                ) : (
                    <>
                        <Sparkles className="mr-2" size={18} />
                        Atualizar
                    </>
                )}
             </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default EditBudget