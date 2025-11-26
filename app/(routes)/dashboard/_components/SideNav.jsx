import React, { useEffect } from 'react'
import Image from "next/image";
import { LayoutGrid, PiggyBank, ReceiptText, Calculator, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react'
import { UserButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// Adicionando os estilos globais para garantir o efeito de vidro caso não esteja no global.css
const CustomStyles = () => (
    <style jsx global>{`
      .glass-nav {
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(16px);
        border-right: 1px solid rgba(226, 232, 240, 0.8);
      }
    `}</style>
);

function SideNav({ isCollapsed, toggleSideNav }) {
    const menuList = [
        {
            id: 1,
            name: 'Dashboard',
            icon: LayoutGrid,
            path: '/dashboard'
        },
        {
            id: 2,
            name: 'Orçamento',
            icon: PiggyBank,
            path: '/dashboard/budgets'
        },
        {
            id: 3,
            name: 'Despesas',
            icon: ReceiptText,
            path: '/dashboard/expenses'
        },
        {
            id: 5,
            name: 'Consórcios',
            icon: Calculator,
            path: '/dashboard/consortium'
        },
        {
            id: 6,
            name: 'Blog',
            icon: BookOpen,
            path: '/dashboard/blog'
        }
    ]
    const path = usePathname();

    useEffect(() => {
        console.log(path)
    }, [path])

    return (
        <div className={cn(
            'h-screen glass-nav flex flex-col transition-all duration-300 relative z-50',
            isCollapsed ? 'w-20 p-4' : 'w-64 p-6'
        )}>
            <CustomStyles />
            
            {/* Toggle Button - Estilo atualizado com sombra e hover */}
            <button
                onClick={toggleSideNav}
                className="absolute -right-3 top-10 bg-white border border-slate-200 shadow-md rounded-full p-1.5 text-slate-500 hover:text-[#005CE5] transition-all hover:scale-110 z-50"
            >
                {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>

            {/* Logo Section */}
            <div className={cn("flex items-center justify-center transition-all duration-300 mb-8", isCollapsed ? "mb-6" : "mb-8")}>
                {isCollapsed ? (
                    // Logo simplificado estilo "App Icon" do código 2
                    <div className="w-10 h-10 bg-gradient-to-br from-[#005CE5] to-[#003380] rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                        M
                    </div>
                ) : (
                    <Image src={'/logo-mycon-novo.png'}
                        alt='logo mycon'
                        width={140}
                        height={80}
                        className="transition-opacity duration-300"
                        priority
                    />
                )}
            </div>

            {/* Menu Items */}
            <div className='flex-grow space-y-2'>
                {menuList.map((menu, index) => {
                    const isActive = path === menu.path;
                    
                    return (
                        <Link href={menu.path} key={index}>
                            <h2 className={cn(
                                "flex items-center gap-3 font-medium cursor-pointer rounded-xl transition-all duration-300 group relative overflow-hidden",
                                isCollapsed ? "justify-center p-3" : "p-4 px-5",
                                isActive 
                                    ? 'bg-gradient-to-r from-[#005CE5] to-[#003380] text-white shadow-lg shadow-blue-200' 
                                    : 'text-slate-500 hover:text-[#005CE5] hover:bg-blue-50'
                            )}>
                                {/* Ícone */}
                                <menu.icon 
                                    size={isCollapsed ? 24 : 20} 
                                    className={cn("transition-transform duration-300", !isActive && "group-hover:scale-110")}
                                />
                                
                                {/* Texto */}
                                {!isCollapsed && (
                                    <span className="whitespace-nowrap overflow-hidden text-sm">
                                        {menu.name}
                                    </span>
                                )}

                                {/* Tooltip para estado colapsado */}
                                {isCollapsed && (
                                    <div className="absolute left-14 bg-slate-900 text-white text-xs px-2 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-[60] whitespace-nowrap shadow-xl translate-x-2 group-hover:translate-x-0 duration-200">
                                        {menu.name}
                                    </div>
                                )}
                            </h2>
                        </Link>
                    )
                })}
            </div>

            {/* Footer / Profile */}
            <div className={cn(
                'mt-auto flex gap-3 items-center transition-all duration-300 rounded-xl hover:bg-slate-50 p-2',
                isCollapsed ? 'justify-center' : ''
            )}>
                <UserButton afterSignOutUrl="/sign-in" />
                {!isCollapsed && (
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-slate-700">Minha Conta</span>
                        <span className="text-xs text-slate-400">Gerenciar perfil</span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SideNav