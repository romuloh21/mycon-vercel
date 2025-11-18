// "use client" é necessário para os gráficos e interações
"use client";

import React from 'react';
// Ícones do Lucide
import { 
  Search, 
  Bell, 
  UserCircle, 
  Plus, 
  ShoppingBag, 
  Music 
} from 'lucide-react';
// Gráficos
import { 
  Bar, 
  BarChart, 
  ResponsiveContainer, 
  XAxis, 
  Tooltip, 
  Pie, 
  PieChart, 
  Cell 
} from 'recharts';
// Componentes do Shadcn/UI
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// --- Dados Mockados (Mesmos da última vez) ---

const barChartData = [
  { name: 'Jul', value: 4800 }, { name: 'Aug', value: 6200 },
  { name: 'Sep', value: 5100 }, { name: 'Oct', value: 7100 },
  { name: 'Nov', value: 5800 }, { name: 'Dec', value: 2900 },
];

const pieChartData = [
  { name: 'Monthly Subscriptions', value: 2500, color: '#4f46e5' }, // Roxo/Índigo
  { name: 'Grocery', value: 3274, color: '#a5b4fc' }, // Roxo/Índigo claro
];

// --- O Componente da Página ---

function NewDashPage() {
  return (
    <div className="p-8">
      {/* 2. GRID PRINCIPAL (Gráficos na Esquerda, Widgets na Direita) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* COLUNA ESQUERDA/MEIO (Gráficos) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Card "Total Balance" */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-gray-500 font-medium">Total Balance</CardTitle>
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-bold">$24.194,00</span>
                <span className="text-sm text-green-500 font-semibold">
                  October's gain from investment +$750,00
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barChartData} margin={{ top: 20, right: 0, left: 0, bottom: 5 }}>
                    <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip cursor={{fill: '#f3f4f6'}} contentStyle={{borderRadius: '8px', border: 'none'}}/>
                    <Bar dataKey="value" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Card "October's Expense" */}
          <Card className="w-full">
            {/* 1. O <CardHeader> foi REMOVIDO daqui */}
            
            <CardContent>
                {/* 2. Mantemos seu container principal, apenas ajustando o padding */}
                <div className="h-[250px] flex items-center justify-around p-4">
                
                {/* --- COLUNA ESQUERDA (O Gráfico) --- */}
                {/* Esta parte não mudou */}
                <div className="w-1/2 h-full">
                    <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie data={pieChartData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" paddingAngle={5}>
                        {pieChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                    </ResponsiveContainer>
                </div>
                
                {/* --- COLUNA DIREITA (Textos e Legenda) --- */}
                {/* 3. Todas as mudanças estão aqui */}
                <div className="w-1/2 flex flex-col gap-3 pl-4">
                    
                    {/* 4. Título e Valor movidos para cá */}
                    <h3 className="text-gray-500 font-medium">October's Expense</h3>
                    <span className="text-4xl font-bold mb-3">$5.774,00</span>
                    
                    {/* 5. Sua legenda .map() original */}
                    {pieChartData.map((entry) => (
                    <div key={entry.name} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                        <span className="text-sm text-gray-600">{entry.name}</span>
                    </div>
                    ))}

                    {/* 6. O item "Remaining Budget" que faltava */}
                    <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gray-200" /> {/* Cor neutra para o 'restante' */}
                    <span className="text-sm text-gray-600">Remaining Budget</span>
                    </div>

                </div>
                </div>
            </CardContent>
            </Card>
        </div>

        {/* COLUNA DIREITA (Widgets Novos) */}
        <div className="space-y-6">

          {/* Card "My Cards" */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-gray-500 font-medium">My Cards</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Cartão de Crédito Mockado (Adaptado para Light Mode) */}
              <div className="p-9 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 text-white shadow-lg">
                <div className="flex justify-between items-center mb-8">
                  <span className="text-lg font-light">MasterCard</span>
                  <div className="flex gap-1">
                    <div className="w-4 h-4 rounded-full bg-white opacity-50"></div>
                    <div className="w-4 h-4 rounded-full bg-white opacity-50"></div>
                  </div>
                </div>
                <div className="text-2xl font-semibold tracking-widest">
                  3482 8384 8283 ****
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card "Send Money" */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-gray-500 font-medium">Send Money</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-around items-center">
              <div className="flex flex-col items-center gap-1 cursor-pointer">
                <Avatar className="h-12 w-12 bg-indigo-100 text-indigo-600">
                  <AvatarFallback><Plus /></AvatarFallback>
                </Avatar>
                <span className="text-xs text-gray-600">Add</span>
              </div>
              
              {['GA', 'SC', 'HW', 'GA'].map((name, index) => (
                <div key={index} className="flex flex-col items-center gap-1 cursor-pointer">
                  <Avatar className="h-12 w-12 bg-gray-100 text-gray-700">
                    <AvatarFallback>{name}</AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-gray-600">
                    {['Gilbert', 'Steph', 'Harris', 'Gary'][index]}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Card "Transactions" */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-gray-500 font-medium">Transactions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 bg-gray-100 text-gray-700">
                    <AvatarFallback><ShoppingBag size={20} /></AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">Amazon</div>
                    <div className="text-sm text-gray-500">Purchase</div>
                  </div>
                </div>
                <div className="font-medium text-red-500">-$824,50</div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 bg-gray-100 text-gray-700">
                    <AvatarFallback><Music size={20} /></AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">Spotify</div>
                    <div className="text-sm text-gray-500">Subscription</div>
                  </div>
                </div>
                <div className="font-medium text-red-500">-$15,00</div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}

export default NewDashPage;