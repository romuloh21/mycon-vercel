import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema';
import { Loader, DollarSign, Tag, Layers, CreditCard, Plus, Calendar } from 'lucide-react';
import moment from 'moment';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
    .custom-select {
      appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2364748b' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 0.75rem center;
      padding-right: 2.5rem;
    }
    /* Ajuste para o ícone de calendário nativo do input date */
    input[type="date"]::-webkit-calendar-picker-indicator {
        cursor: pointer;
        opacity: 0.6;
    }
  `}</style>
);

function AddExpense({ budgetId, user, refreshData }) {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    // Inicializa com a data de hoje no formato aceito pelo input type="date"
    const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
    const [loading, setLoading] = useState(false);

    // Categorias pré-definidas
    const categories = [
        "Alimentação", "Transporte", "Moradia",
        "Lazer", "Saúde", "Educação", "Assinaturas", "Outros"
    ];

    // Métodos de pagamento
    const paymentMethods = ["Crédito", "Débito", "PIX", "Dinheiro"];

    /**
     * Adiciona nova despesa
     */
    const addNewExpense = async () => {
        setLoading(true);
        try {
            const result = await db.insert(Expenses).values({
                name: name,
                amount: amount,
                budgetId: budgetId,
                // Formata a data escolhida para o padrão DD/MM/YYYY antes de salvar
                createdAt: moment(date).format('DD/MM/YYYY')
            }).returning({ insertedId: Budgets.id });

            setAmount('');
            setName('');
            setCategory('');
            setPaymentMethod('');
            setDate(moment().format('YYYY-MM-DD')); // Reseta para hoje

            if (result) {
                refreshData();
                toast.success('Nova despesa adicionada com sucesso! 🎉');
            }
        } catch (error) {
            toast.error('Erro ao adicionar despesa. Tente novamente.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="relative">
            <CustomStyles />
            <Card className="glass-card shadow-lg border-slate-200">
                <CardHeader className="border-b border-slate-100 pb-4">
                    <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <div className="p-2 bg-blue-50 rounded-lg">
                            <Plus className="text-[#005CE5]" size={18} />
                        </div>
                        Detalhes da Despesa
                    </CardTitle>
                </CardHeader>

                <CardContent className="pt-6 space-y-4">
                    {/* Descrição da Despesa */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 ml-1">
                            Descrição
                        </label>
                        <div className="relative input-group">
                            <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 transition-colors" size={18} />
                            <Input
                                placeholder="Ex: Almoço no restaurante"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="pl-10 bg-white border-slate-200 focus:border-[#005CE5] focus:ring-[#005CE5] h-11"
                            />
                        </div>
                    </div>

                    {/* Grid: Valor e Data */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 ml-1">
                                Valor
                            </label>
                            <div className="relative input-group">
                                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 transition-colors" size={18} />
                                <Input
                                    placeholder="0,00"
                                    type="number"
                                    step="0.01"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="pl-10 bg-white border-slate-200 focus:border-[#005CE5] focus:ring-[#005CE5] h-11"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 ml-1">
                                Data
                            </label>
                            <div className="relative input-group">
                                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 transition-colors" size={18} />
                                <Input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="pl-10 bg-white border-slate-200 focus:border-[#005CE5] focus:ring-[#005CE5] h-11"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Grid: Categoria e Pagamento */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 ml-1">
                                Categoria
                            </label>
                            <div className="relative input-group">
                                <Layers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 transition-colors z-10" size={18} />
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full h-11 pl-10 pr-3 rounded-md border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#005CE5] focus:ring-offset-2 focus:border-transparent custom-select cursor-pointer transition-colors"
                                >
                                    <option value="" disabled>Selecione</option>
                                    {categories.map((cat, index) => (
                                        <option key={index} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 ml-1">
                                Pagamento
                            </label>
                            <div className="relative input-group">
                                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 transition-colors z-10" size={18} />
                                <select
                                    value={paymentMethod}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="w-full h-11 pl-10 pr-3 rounded-md border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#005CE5] focus:ring-offset-2 focus:border-transparent custom-select cursor-pointer transition-colors"
                                >
                                    <option value="" disabled>Método</option>
                                    {paymentMethods.map((method, index) => (
                                        <option key={index} value={method}>{method}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Botão de Ação */}
                    <Button
                        disabled={!(name && amount && date) || loading}
                        onClick={() => addNewExpense()}
                        className="w-full mt-4 bg-[#005CE5] hover:bg-[#004bbd] text-white shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5 h-11 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <Loader className="animate-spin" size={20} />
                        ) : (
                            <span className="flex items-center gap-2 font-medium">
                                <Plus size={18} />
                                Adicionar Despesa
                            </span>
                        )}
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}

export default AddExpense