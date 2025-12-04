'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  TrendingUp, 
  TrendingDown,
  Pencil,
  Trash2,
  AlertCircle,
  Receipt,
  PieChart as PieChartIcon
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
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

const CustomStyles = () => (
  <style jsx global>{`
    @keyframes slideIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-5px); }
    }
    .animate-slide-in { animation: slideIn 0.3s ease-out; }
    .animate-float { animation: float 3s ease-in-out infinite; }
  `}</style>
);

function BudgetItem({ budget, onEdit, onDelete }) {
  const [deleteId, setDeleteId] = useState(null);
  const [pieChartData, setPieChartData] = useState([]);
  const path = usePathname();

  useEffect(() => {
    if (budget) {
      processPieChartData();
    }
  }, [budget]);

  const processPieChartData = () => {
    const totalSpend = Number(budget.totalSpend || 0);
    const totalBudget = Number(budget.amount || 0);
    const remaining = Math.max(0, totalBudget - totalSpend);
    const data = [
      { name: 'Gasto', value: totalSpend, color: '#ef4444', percentage: totalBudget > 0 ? (totalSpend / totalBudget * 100).toFixed(1) : 0 },
      { name: 'Disponível', value: remaining, color: '#2563eb', percentage: totalBudget > 0 ? (remaining / totalBudget * 100).toFixed(1) : 0 }
    ];
    setPieChartData(data.filter(item => item.value > 0));
  };

  const formatCurrency = (value) => Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  
  const calculatePercentage = () => {
    const totalSpend = Number(budget.totalSpend || 0);
    const totalBudget = Number(budget.amount || 0);
    return totalBudget > 0 ? (totalSpend / totalBudget) * 100 : 0;
  };

  // --- LÓGICA DE CORES (AZUL vs VERMELHO) ---
  const percentage = calculatePercentage();
  const isDanger = percentage >= 65; // Define 65% como o ponto de mudança para vermelho

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-xl border border-slate-200">
          <p className="text-sm font-semibold text-slate-900">{payload[0].name}</p>
          <p className="text-sm text-slate-600">
            <span className="font-bold" style={{ color: payload[0].payload.color }}>
              {formatCurrency(payload[0].value)}
            </span>
          </p>
          <p className="text-xs text-slate-500 mt-1">{payload[0].payload.percentage}% do orçamento</p>
        </div>
      );
    }
    return null;
  };

  const handleDelete = async () => {
    if (onDelete) {
      await onDelete(budget.id);
      setDeleteId(null);
    }
  };

  return (
    <div className="animate-slide-in">
      <CustomStyles />
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value={`budget-${budget.id}`} className="border-none">
          <div className="relative overflow-hidden bg-white rounded-2xl border-2 border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 group">
            
            {/* Background decorativo */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#005CE5] rounded-full mix-blend-multiply filter blur-[100px] opacity-[0.05] pointer-events-none"></div>
            
            <AccordionTrigger className="hover:no-underline p-0">
              <div className="w-full p-5 sm:p-6">
                {/* Header do Card */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                      {budget.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 truncate">
                        {budget.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-slate-500 flex items-center gap-1">
                          <Receipt size={12} />
                          {budget.totalItem || 0} despesas
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-slate-500 mb-1">Orçamento</p>
                    <p className="text-xl font-bold text-slate-900">
                      {formatCurrency(budget.amount)}
                    </p>
                  </div>
                </div>

                {/* Estatísticas */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className={`p-3 rounded-lg border transition-colors ${isDanger ? 'bg-red-50 border-red-100' : 'bg-slate-50 border-slate-100'}`}>
                    <p className={`text-xs font-medium mb-1 flex items-center gap-1 ${isDanger ? 'text-red-600' : 'text-slate-500'}`}>
                      <TrendingDown size={12} />
                      Gasto
                    </p>
                    <p className={`text-lg font-bold ${isDanger ? 'text-red-700' : 'text-slate-900'}`}>
                      {formatCurrency(budget.totalSpend || 0)}
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <p className="text-xs text-blue-600 font-medium mb-1 flex items-center gap-1">
                      <TrendingUp size={12} />
                      Disponível
                    </p>
                    <p className="text-lg font-bold text-blue-700">
                      {formatCurrency(Math.max(0, budget.amount - (budget.totalSpend || 0)))}
                    </p>
                  </div>
                </div>

                {/* --- AQUI ESTÁ A LÓGICA DA BARRA AZUL/VERMELHA --- */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 font-medium">Utilizado</span>
                    <span className={`font-bold transition-colors duration-300 ${isDanger ? 'text-red-600' : 'text-blue-600'}`}>
                      {percentage.toFixed(1)}%
                    </span>
                  </div>
                  
                  <div className="relative w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ease-out ${
                        isDanger 
                          ? 'bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.3)]' 
                          : 'bg-blue-600'
                      }`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    ></div>
                  </div>
                </div>

              </div>
            </AccordionTrigger>

            <AccordionContent>
              <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-100">
                
                {/* Gráfico de Pizza */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <PieChartIcon size={18} className="text-[#005CE5]" />
                    <h4 className="font-semibold text-slate-900">Distribuição do Orçamento</h4>
                  </div>
                  {pieChartData.length > 0 && pieChartData.some(d => d.value > 0) ? (
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      <div className="w-full md:w-1/2">
                        <ResponsiveContainer width="100%" height={220}>
                          <PieChart>
                            <Pie 
                              data={pieChartData} 
                              cx="50%" cy="50%" 
                              innerRadius={60} outerRadius={85} 
                              dataKey="value" paddingAngle={5}
                              animationBegin={0} animationDuration={800}
                            >
                              {pieChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="w-full md:w-1/2 space-y-3">
                        {pieChartData.map((entry, index) => (
                          <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-colors">
                            <div className="flex items-center gap-3">
                              <div className="w-4 h-4 rounded-full animate-float" style={{ backgroundColor: entry.color, animationDelay: `${index * 0.2}s` }} />
                              <span className="text-sm font-medium text-slate-700">{entry.name}</span>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-bold text-slate-900">{formatCurrency(entry.value)}</p>
                              <p className="text-xs text-slate-500">{entry.percentage}%</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="h-[220px] flex items-center justify-center text-slate-400">
                      <div className="text-center">
                        <div className="bg-slate-50 p-4 rounded-full inline-block mb-3">
                            {budget.icon}
                        </div>
                        <p className="text-sm">Nenhum gasto registrado ainda</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Insights de Alerta */}
                {isDanger && (
                  <div className="mt-4 flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
                    <AlertCircle size={20} className="text-red-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-red-800">
                      <p className="font-semibold mb-1">Atenção ao Limite!</p>
                      <p className="text-xs leading-relaxed">
                        Você já utilizou <span className="font-bold">{percentage.toFixed(1)}%</span> deste orçamento.
                      </p>
                    </div>
                  </div>
                )}

                {/* --- ÁREA DE AÇÕES --- */}
                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                    <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => setDeleteId(budget.id)}
                    >
                        <Trash2 size={16} className="mr-2" />
                        Excluir
                    </Button>

                    {path !== '/dashboard/expenses/' + budget?.id && (
                      <Link href={'/dashboard/expenses/' + budget?.id}>
                          <Button className="bg-[#005CE5] hover:bg-blue-700 text-white shadow-sm transition-all">
                              <Pencil size={16} className="mr-2" />
                              Gerenciar Orçamento
                          </Button>
                      </Link>
                    )}
                </div>

              </div>
            </AccordionContent>
            <div className={`h-1 transition-colors duration-500 ${isDanger ? 'bg-red-500' : 'bg-[#005CE5]'}`}></div>
          </div>
        </AccordionItem>
      </Accordion>

      {/* Alert Dialog de Exclusão */}
      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o orçamento "{budget.name}"? 
              Essa ação é irreversível.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default BudgetItem;