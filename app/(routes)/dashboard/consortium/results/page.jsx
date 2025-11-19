"use client"; // Esta página lê a URL

import React, { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Car, Edit } from 'lucide-react'; // Usando o Car como ícone padrão

// --- Componente Principal ---
function ResultsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Lê os dados da URL
  const category = searchParams.get('category') || 'Auto';
  const simulateBy = searchParams.get('simulateBy') || 'valorTotal';
  const value = parseFloat(searchParams.get('value') || '25000');

  // Formata o valor para R$
  const formatCurrency = (value) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  // --- Nossos Resultados Mockados ---
  // Vamos apenas fingir que calculamos isso
  const mockResults = [
    { id: 1, credit: value, parcel: (value * 1.15) / 83, term: 83 },
    { id: 2, credit: value, parcel: (value * 1.18) / 59, term: 59 },
    { id: 3, credit: value + 5000, parcel: ((value + 5000) * 1.15) / 83, term: 83 },
  ];
  
  return (
    <div className="p-8 max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-center">Simular Consórcio</h1>
      
      {/* 1. Card de Resumo (como na Imagem 4) */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Car className="h-8 w-8 text-primary" />
              </div>
              <div>
                <span className="text-sm text-gray-500">Categoria</span>
                <p className="text-xl font-semibold">{category}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <Edit className="h-5 w-5 text-primary" />
            </Button>
          </div>
          
          <div className="border-t pt-4">
            <span className="text-sm text-gray-500">
              {simulateBy === 'valorTotal' ? 'Valor do crédito' : 'Valor da parcela'}
            </span>
            <p className="text-xl font-semibold">{formatCurrency(value)}</p>
          </div>
        </CardContent>
      </Card>

      {/* 2. Lista de Resultados Mockados */}
      <h2 className="text-xl font-semibold pt-4">Resultados da Simulação</h2>
      <div className="space-y-4">
        {mockResults.map((plan) => (
          <Card key={plan.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl">{formatCurrency(plan.credit)}</CardTitle>
              <span className="text-lg text-gray-600">VALOR DO CRÉDITO</span>
            </CardHeader>
            <CardContent>
              <p className="text-lg">
                Valor das parcelas <span className="font-bold text-primary">{formatCurrency(plan.parcel)}</span>
              </p>
              <p className="text-md text-gray-500">
                em {plan.term} parcelas
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// O Next.js recomenda usar <Suspense> ao ler searchParams
export default function ResultsPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <ResultsPageContent />
    </Suspense>
  );
}