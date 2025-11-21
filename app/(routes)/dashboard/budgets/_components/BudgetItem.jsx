import Link from 'next/link'
import React from 'react'

function BudgetItem({budget}) {

  const calculateProgressPerc=()=>{
    // (spend/total)*100
    const perc=(budget.totalSpend/budget.amount)*100;
    return perc>100?100: perc.toFixed(2);
  }
  return (
    
    <Link href={'/dashboard/expenses/'+budget?.id} >
      <div className='p-3 sm:p-4 md:p-5 border rounded-lg 
    hover:shadow-md cursor-pointer h-[140px] sm:h-[160px] md:h-[170px]
    transition-shadow duration-200'>
          <div className='flex gap-2 items-center justify-between'>
          <div className='flex gap-2 items-center min-w-0 flex-1'>
              <h2 className='text-lg sm:text-xl md:text-2xl p-2 sm:p-3 px-3 sm:px-4
              bg-slate-100 rounded-full flex-shrink-0
              '>{budget?.icon}</h2>
              <div className='min-w-0 flex-1'>
                  <h2 className='font-bold text-sm sm:text-base md:text-lg truncate'>{budget.name}</h2>
                  <h2 className='text-xs sm:text-sm text-gray-500'>{budget.totalItem} Item{budget.totalItem !== 1 ? 's' : ''}</h2>
              </div>
              
          </div>
          <h2 className='font-bold text-primary text-sm sm:text-base md:text-lg flex-shrink-0'> 
            ${budget.amount?.toLocaleString()}
          </h2>
          </div>

          <div className='mt-3 sm:mt-4 md:mt-5'>
              <div className='flex items-center justify-between mb-2 sm:mb-3'>
                  <h2 className='text-xs text-slate-400'>
                    ${budget.totalSpend ? budget.totalSpend.toLocaleString() : 0} Spend
                  </h2>
                  <h2 className='text-xs text-slate-400'>
                    ${(budget.amount - (budget.totalSpend || 0)).toLocaleString()} Remaining
                  </h2>
              
              </div>
              <div className='w-full
              bg-slate-300 h-1.5 sm:h-2 rounded-full'>
                  <div className='
              bg-primary h-1.5 sm:h-2 rounded-full transition-all duration-300'
              style={{
                width:`${calculateProgressPerc()}%`
              }}
              >
                  </div>
              </div>
          </div>
        </div>
    </Link>
  )
}

export default BudgetItem