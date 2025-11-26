"use client"
import React, { useState } from 'react'
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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { db } from '@/utils/dbConfig';
import { Budgets } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { toast } from 'sonner';
import { Plus, DollarSign, Tag, Sparkles, Loader } from 'lucide-react';
import { Card } from '@/components/ui/card';

// Estilos customizados
const CustomStyles = () => (
    <style jsx global>{`
        .glass-card {
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(226, 232, 240, 0.8);
        }
        .input-group:focus-within svg {
            color: #005CE5;
        }
    `}</style>
);

function CreateBudget({ refreshData }) {
    const [emojiIcon, setEmojiIcon] = useState('💰');
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);

    const { user } = useUser();

    /**
     * Cria um novo orçamento
     */
    const onCreateBudget = async () => {
        setLoading(true);
        try {
            const result = await db.insert(Budgets)
                .values({
                    name: name,
                    amount: amount,
                    createdBy: user?.primaryEmailAddress?.emailAddress,
                    icon: emojiIcon
                }).returning({ insertedId: Budgets.id })

            if (result) {
                setName('');
                setAmount('');
                setEmojiIcon('💰');
                refreshData();
                toast.success('Novo orçamento criado com sucesso! 🎉');
            }
        } catch (error) {
            toast.error('Erro ao criar orçamento. Tente novamente.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <CustomStyles />
            <Dialog>
                <DialogTrigger asChild>
                    <div className='glass-card p-6 rounded-xl items-center flex flex-col border-2 border-dashed border-slate-300 cursor-pointer hover:shadow-xl hover:border-[#005CE5] hover:-translate-y-1 min-h-[170px] justify-center transition-all duration-300 group'>
                        <div className="w-14 h-14 bg-gradient-to-br from-[#005CE5] to-[#003380] rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                            <Plus className='text-white' size={28} />
                        </div>
                        <h2 className='text-lg font-semibold text-slate-700 group-hover:text-[#005CE5] transition-colors'>
                            Criar Novo Orçamento
                        </h2>
                        <p className='text-xs text-slate-500 mt-1'>
                            Organize suas finanças
                        </p>
                    </div>
                </DialogTrigger>
                <DialogContent className="w-[90vw] max-w-[480px] mx-auto">
                    <DialogHeader className="pb-4">
                        <DialogTitle className="text-xl md:text-2xl font-bold text-slate-900 flex items-center gap-3">
                            <div className='w-10 h-10 bg-gradient-to-br from-[#005CE5] to-[#003380] rounded-full flex items-center justify-center'>
                                <Sparkles className="text-white" size={20} />
                            </div>
                            Criar Novo Orçamento
                        </DialogTitle>
                        <DialogDescription className="text-slate-600 text-sm md:text-base">
                            Configure um novo orçamento para rastrear suas despesas e manter suas finanças organizadas
                        </DialogDescription>
                    </DialogHeader>

                    <Card className="glass-card border-slate-200 p-4">
                        <div className='space-y-4'>
                            {/* Escolher Ícone */}
                            <div className="flex flex-col items-center relative">
                                <label className='text-slate-700 font-medium mb-2 text-sm'>
                                    Escolher Ícone
                                </label>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="text-4xl h-16 w-16 border-2 border-slate-200 hover:border-[#005CE5] hover:bg-blue-50 transition-all"
                                    onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                                >
                                    {emojiIcon}
                                </Button>
                                {openEmojiPicker && (
                                    <div className='absolute top-full mt-2 z-50 left-1/2 transform -translate-x-1/2 shadow-2xl rounded-lg overflow-hidden'>
                                        <EmojiPicker
                                            open={openEmojiPicker}
                                            onEmojiClick={(e) => {
                                                setEmojiIcon(e.emoji)
                                                setOpenEmojiPicker(false)
                                            }}
                                            width={280}
                                            height={350}
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Nome do Orçamento */}
                            <div>
                                <label className='text-slate-700 font-medium mb-2 block text-sm'>
                                    Nome do Orçamento
                                </label>
                                <div className="relative input-group">
                                    <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 transition-colors" size={18} />
                                    <Input
                                        placeholder="Ex: Decoração da Casa"
                                        className="pl-10 h-11 bg-white border-slate-200 focus:border-[#005CE5] focus:ring-[#005CE5]"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Valor do Orçamento */}
                            <div>
                                <label className='text-slate-700 font-medium mb-2 block text-sm'>
                                    Valor do Orçamento
                                </label>
                                <div className="relative input-group">
                                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 transition-colors" size={18} />
                                    <Input
                                        type="number"
                                        placeholder="0,00"
                                        step="0.01"
                                        className="pl-10 h-11 bg-white border-slate-200 focus:border-[#005CE5] focus:ring-[#005CE5]"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>

                    <DialogFooter className="mt-4">
                        <DialogClose asChild>
                            <Button
                                variant="outline"
                                className="flex-1 h-11"
                                disabled={loading}
                            >
                                Cancelar
                            </Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button
                                disabled={!(name && amount) || loading}
                                onClick={() => onCreateBudget()}
                                className="flex-1 h-11 bg-[#005CE5] hover:bg-[#004bbd] text-white shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5"
                            >
                                {loading ? (
                                    <Loader className="animate-spin" size={20} />
                                ) : (
                                    <span className="flex items-center gap-2">
                                        <Plus size={18} />
                                        Criar Orçamento
                                    </span>
                                )}
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CreateBudget