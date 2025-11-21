"use client";
import React from 'react';
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck, Calculator, BarChart, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

function MobileNav() {
    const path = usePathname();

    const menuList = [
        {
            id: 1,
            name: 'Home', // Encurtei para caber melhor
            icon: LayoutGrid,
            path: '/dashboard'
        },
        {
            id: 2,
            name: 'Budgets',
            icon: PiggyBank,
            path: '/dashboard/budgets'
        },
        {
            id: 3,
            name: 'Expenses',
            icon: ReceiptText,
            path: '/dashboard/expenses'
        },
        {
            id: 7,
            name: 'Blog',
            icon: BookOpen,
            path: '/dashboard/blog'
        },
        // Adicionei um item "Mais" se precisar, mas por enquanto vou deixar os principais
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50 md:hidden pb-safe">
            <div className="flex justify-around items-center h-16">
                {menuList.map((menu) => {
                    const isActive = path === menu.path;
                    const Icon = menu.icon;

                    return (
                        <Link
                            href={menu.path}
                            key={menu.id}
                            className="flex-1"
                        >
                            <div className={cn(
                                "flex flex-col items-center justify-center h-full w-full py-1 transition-colors duration-200",
                                isActive ? "text-primary" : "text-gray-400 hover:text-gray-600"
                            )}>
                                <div className={cn(
                                    "p-1 rounded-xl transition-all duration-200",
                                    isActive && "bg-blue-50 translate-y-[-2px]"
                                )}>
                                    <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                                </div>
                                <span className="text-[10px] font-medium mt-0.5">
                                    {menu.name}
                                </span>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

export default MobileNav;
