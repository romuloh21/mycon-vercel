import React, { useEffect } from 'react'
import Image from "next/image";
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck, Calculator, BarChart, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react'
import { UserButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';

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
            id: 4,
            name: 'Dash',
            icon: BarChart,
            path: '/dashboard/dash'
        },
        {
            id: 5,
            name: 'Consórcios',
            icon: Calculator,
            path: '/dashboard/consortium'
        },
        {
            id: 6,
            name: 'Upgrade',
            icon: ShieldCheck,
            path: '/dashboard/upgrade'
        },
        {
            id: 7,
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
            'h-screen border shadow-sm bg-white flex flex-col transition-all duration-300 relative',
            isCollapsed ? 'p-2' : 'p-5'
        )}>
            {/* Toggle Button */}
            <button
                onClick={toggleSideNav}
                className="absolute -right-3 top-10 bg-white border shadow-md rounded-full p-1 text-gray-500 hover:text-primary transition-colors z-50"
            >
                {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>

            <div className={cn("flex items-center justify-center transition-all duration-300", isCollapsed ? "mb-4" : "mb-5")}>
                {isCollapsed ? (
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
                        M
                    </div>
                ) : (
                    <Image src={'/logo-mycon-A.svg'}
                        alt='logo mycon'
                        width={160}
                        height={100}
                        className="transition-opacity duration-300"
                    />
                )}
            </div>

            <div className='mt-5 flex-grow'>
                {menuList.map((menu, index) => (
                    <Link href={menu.path} key={index}>
                        <h2 className={cn(
                            "flex items-center gap-2 text-gray-500 font-medium mb-2 cursor-pointer rounded-md hover:text-primary hover:bg-blue-100 transition-all duration-200 group",
                            isCollapsed ? "justify-center p-3" : "p-5",
                            path == menu.path && 'text-primary bg-blue-100'
                        )}>
                            <menu.icon size={isCollapsed ? 24 : 20} />
                            {!isCollapsed && <span className="whitespace-nowrap overflow-hidden">{menu.name}</span>}

                            {/* Tooltip for collapsed state */}
                            {isCollapsed && (
                                <div className="absolute left-16 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 whitespace-nowrap">
                                    {menu.name}
                                </div>
                            )}
                        </h2>
                    </Link>
                ))}
            </div>
            <div className={cn(
                'fixed bottom-10 flex gap-2 items-center transition-all duration-300',
                isCollapsed ? 'left-5' : 'p-5'
            )}>
                <UserButton />
                {!isCollapsed && <span>Profile</span>}
            </div>
        </div>
    )
}

export default SideNav