"use client"
import React, { useEffect, useState } from 'react'
import SideNav from './_components/SideNav'
import DashboardHeader from './_components/DashboardHeader'
import { db } from '@/utils/dbConfig'
import { Budgets } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import { useRouter } from 'next/navigation'

import MobileNav from './_components/MobileNav'

function DashboardLayout({ children }) {

  const { user } = useUser();
  const router = useRouter();
  const [isSideNavCollapsed, setIsSideNavCollapsed] = useState(false);

  useEffect(() => {
    user && checkUserBudgets();
  }, [user])

  const checkUserBudgets = async () => {
    const result = await db.select()
      .from(Budgets)
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
    console.log(result);
    if (result?.length == 0) {
      router.replace('/dashboard/budgets')
    }
  }

  const toggleSideNav = () => {
    setIsSideNavCollapsed(!isSideNavCollapsed);
  };

  return (
    <div>
      <div className={`fixed hidden md:block transition-all duration-300 ${isSideNavCollapsed ? 'w-20' : 'w-64'}`}>
        <SideNav isCollapsed={isSideNavCollapsed} toggleSideNav={toggleSideNav} />
      </div>
      <div className={`transition-all duration-300 ${isSideNavCollapsed ? 'md:ml-20' : 'md:ml-64'} pb-20 md:pb-0`}>
        <DashboardHeader />
        {children}
      </div>
      <MobileNav />
    </div>
  )
}

export default DashboardLayout