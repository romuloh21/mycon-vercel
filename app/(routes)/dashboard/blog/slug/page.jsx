// app/(routes)/dashboard/blog/[slug]/page.jsx

"use client";

import React, { Suspense } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Clock, TrendingUp, ArrowLeft } from 'lucide-react';
// Importação de componentes UI, assumindo que Card e Button estão disponíveis
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// --- DADOS MOCKADOS COMPLETOS (Simulando o Fetch de um CMS) ---
// Em uma aplicação real, estes dados viriam de uma API, buscando pelo 'slug'.
const FULL_ARTICLE_DATA = [
  { 
    slug: 'contemplacao',
    titulo: 'Rali de US$ 14 trilhões que levou ao mercado a recordes enfrenta teste decisivo',
    autor: 'Por Mycon',
    data: '1 hora atrás',
    image: '/login.jpg', // Usando um arquivo de imagem mockado existente
    body: `
      <h2 class="text-xl font-bold mt-6 mb-3 text-gray-800">O que está em jogo?</h2>
      <p class="mb-4 text-gray-700 leading-relaxed">
        Bloomberg — Um rali de US$ 14 trilhões que levou as ações a recordes históricos se aproxima de um ponto de inflexão na próxima semana, com os investidores à espera de que o Federal Reserve (Fed) retome os cortes nas taxas de juros em sua tão aguardada reunião de política monetária.
      </p>
      
      <p class="mb-4 text-gray-700 leading-relaxed">
        O índice S&P 500 acumula alta de 32% desde suas mínimas de abril, puxado por apostas de que o Fed reduzirá os custos de empréstimo várias vezes este ano, e uma redução de 25 pontos-base na quarta-feira (17) é vista como certa.
      </p>

      <h2 class="text-xl font-bold mt-6 mb-3 text-gray-800">O histórico do mercado</h2>
      <p class="mb-4 text-gray-700 leading-relaxed">
        Os investidores otimistas (bullish) podem ter a história a seu favor: o índice subiu, em média, 15% um ano após a retomada dos cortes, depois de uma pausa de seis meses ou mais, mostram dados da Ned Davis Research que remontam à década de 1970.
      </p>
      
      <p class="text-gray-700 italic mt-6 border-l-4 border-[#0164A4] pl-3">
        Lembre-se: Consórcio é uma forma segura de proteger seu patrimônio contra as incertezas do mercado de juros.
      </p>
    `
  },
  {
    slug: 'comparacao',
    titulo: 'Consórcio vs Financiamento: Qual é o melhor para você?',
    autor: 'Por Mycon',
    data: '1 hora atrás',
    image: '/login.jpg', 
    body: '<p class="text-gray-700">Conteúdo sobre comparação de consórcio e financiamento...</p>'
  }
];

// Função para buscar o artigo pelo slug
const getArticleBySlug = (slug) => {
    return FULL_ARTICLE_DATA.find(article => article.slug === slug);
}

// --- Componente de Conteúdo Principal ---
function ArticleDetailPage({ params }) {
    const { slug } = params;
    const router = useRouter();

    // Busca o artigo ou usa um fallback
    const article = getArticleBySlug(slug) || {
        titulo: 'Artigo Não Encontrado',
        autor: 'Sistema',
        data: 'N/A',
        image: '/dashboard.png', // Fallback
        body: '<p class="text-red-500">O conteúdo deste artigo não está disponível.</p>'
    };

    // Cor primária Mycon
    const primaryColor = '#0164A4'; 

    return (
        <div className="mx-auto bg-gray-50 min-h-screen">
            {/* 1. Imagem de Capa (Banner) */}
            <div className="relative w-full h-96 lg:h-[450px]">
                <Image
                    src={article.image}
                    alt={article.titulo}
                    layout="fill"
                    objectFit="cover"
                    className="brightness-75"
                />
                 {/* Superposição (Overlay) - Para escurecer a imagem e manter o branding */}
                <div 
                    className="absolute inset-0 bg-black/20" 
                    style={{backgroundColor: `rgba(1, 100, 164, 0.2)`}}
                />
            </div>

            {/* 2. Corpo do Artigo (Layout principal) */}
            <div className="max-w-3xl mx-auto px-6 py-10 lg:py-12 -mt-48 lg:-mt-64 relative z-10">
                
                {/* 2a. Metadados e Título (Card Branco) */}
                <div className="bg-white p-6 rounded-xl shadow-2xl border border-gray-100">
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-4 leading-tight">
                        {article.titulo}
                    </h1>

                    <div className="flex items-center gap-6 text-sm text-gray-500 border-t pt-3">
                        {/* Autor */}
                        <div className="flex items-center gap-2">
                            <TrendingUp size={16} style={{ color: primaryColor }}/>
                            <span className="font-medium text-gray-700">{article.autor}</span>
                        </div>
                        {/* Data */}
                        <div className="flex items-center gap-1">
                            <Clock size={14} />
                            <span>{article.data}</span>
                        </div>
                    </div>
                </div>

                {/* 2b. Conteúdo Principal do Artigo (Card para melhor leitura) */}
                <div className="mt-8 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                    <div 
                        className="text-lg leading-relaxed"
                        // Usando dangerouslySetInnerHTML para renderizar o HTML mockado
                        dangerouslySetInnerHTML={{ __html: article.body }} 
                    />
                </div>
                
                {/* 3. Botão de Volta */}
                <div className="mt-8 text-center">
                    <Button variant="ghost" onClick={() => router.back()} className="gap-2 text-gray-600 hover:text-[#0164A4]">
                        <ArrowLeft size={20} /> Voltar para o Explore
                    </Button>
                </div>
            </div>
        </div>
    );
}

// O Next.js recomenda usar <Suspense> ao ler params de rotas dinâmicas
export default function ArticlePage(props) {
  return (
    <Suspense fallback={<div className='p-8'>Carregando Artigo...</div>}>
      <ArticleDetailPage {...props} />
    </Suspense>
  );
}