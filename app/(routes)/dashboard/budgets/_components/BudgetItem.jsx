import Link from 'next/link'
import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { TrendingUp, ArrowRight } from 'lucide-react'

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

function BudgetItem({ budget }) {
  const calculateProgressPerc = () => {
    const perc = (budget.totalSpend / budget.amount) * 100;
    return perc > 100 ? 100 : perc.toFixed(1);
  }

  const getProgressColor = () => {
    const perc = calculateProgressPerc();
    if (perc >= 90) return 'from-red-500 to-red-600';
    if (perc >= 70) return 'from-orange-500 to-orange-600';
    return 'from-[#005CE5] to-[#003380]';
  }

  const formatCurrency = (value) => {
    return Number(value || 0).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }

  return (
    <>
      <CustomStyles />
      <Link href={'/dashboard/expenses/' + budget?.id}>
        <Card className='glass-card border-slate-200 hover:shadow-xl hover:-translate-y-1 cursor-pointer h-[170px] transition-all duration-300 group overflow-hidden relative'>
          {/* Badge de progresso no canto */}
          <div className="absolute top-3 right-3 z-10">
            <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
              calculateProgressPerc() >= 90 ? 'bg-red-100 text-red-700' :
              calculateProgressPerc() >= 70 ? 'bg-orange-100 text-orange-700' :
              'bg-blue-100 text-blue-700'
            }`}>
              {calculateProgressPerc()}%
            </div>
          </div>

          <CardContent className="pt-5 pb-5 h-full flex flex-col justify-between">
            {/* Header */}
            <div className='flex gap-3 items-start'>
              <div className='flex gap-3 items-center min-w-0 flex-1'>
                <div className='text-3xl p-2 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl flex-shrink-0 group-hover:scale-110 transition-transform'>
                  {budget?.icon}
                </div>
                <div className='min-w-0 flex-1'>
                  <h2 className='font-bold text-lg text-slate-900 truncate group-hover:text-[#005CE5] transition-colors'>
                    {budget.name}
                  </h2>
                  <p className='text-xs text-slate-500 flex items-center gap-1'>
                    <TrendingUp size={12} />
                    {budget.totalItem} {budget.totalItem !== 1 ? 'Itens' : 'Item'}
                  </p>
                </div>
              </div>
            </div>

            {/* Budget Amount */}
            <div className="text-right mb-2">
              <p className='text-xs text-slate-500 mb-1'>Orçamento</p>
              <h2 className='font-bold text-[#005CE5] text-xl'>
                {formatCurrency(budget.amount)}
              </h2>
            </div>

            {/* Progress Section */}
            <div>
              <div className='flex items-center justify-between mb-2'>
                <div className="flex-1">
                  <p className='text-xs text-slate-600 font-medium'>
                    {formatCurrency(budget.totalSpend)} 
                    <span className="text-slate-400 ml-1">gasto</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className='text-xs text-green-600 font-medium'>
                    {formatCurrency(budget.amount - (budget.totalSpend || 0))} 
                    <span className="text-slate-400 ml-1">restante</span>
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className='w-full bg-slate-200 h-2 rounded-full overflow-hidden'>
                <div 
                  className={`bg-gradient-to-r ${getProgressColor()} h-2 rounded-full transition-all duration-500 relative`}
                  style={{ width: `${calculateProgressPerc()}%` }}
                >
                  {/* Animação de brilho */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                </div>
              </div>
            </div>

            {/* Hover Effect - Ver Detalhes */}
            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-1 text-xs text-[#005CE5] font-medium">
                Ver detalhes
                <ArrowRight size={14} />
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </>
  )
}

export default BudgetItem