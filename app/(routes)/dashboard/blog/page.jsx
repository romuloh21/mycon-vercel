"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, ArrowRight, TrendingUp, Home, Car, Wrench, ChevronRight } from 'lucide-react';
import { BLOG_ARTICLES } from '@/lib/mycon-data';
import { cn } from '@/lib/utils';

// Cores Mycon
const PRIMARY_BLUE = '#0164A4';
const LIGHT_GRAY = '#F5F9FC';

// Mapeamento de ícones para categorias
const CATEGORY_ICONS = {
    'Imóvel': Home,
    'Auto': Car,
    'Serviço': Wrench,
    'Moto': TrendingUp, // Usando TrendingUp como placeholder para Moto se não houver ícone específico melhor
};

// 1. DADOS DAS CATEGORIAS GRANDES (EXPLORE CARDS)
const CATEGORY_CARDS = [
    { title: 'Consórcio Imobiliário', icon: Home, link: '/dashboard/consortium?category=Imóvel', color: 'bg-blue-50 text-blue-600' },
    { title: 'Consórcio Automotivo', icon: Car, link: '/dashboard/consortium?category=Auto', color: 'bg-indigo-50 text-indigo-600' },
    { title: 'Consórcio de Serviços', icon: Wrench, link: '/dashboard/consortium?category=Serviço', color: 'bg-purple-50 text-purple-600' },
    { title: 'Consórcio de Moto', icon: TrendingUp, link: '/dashboard/consortium?category=Moto', color: 'bg-emerald-50 text-emerald-600' },
];

// Lista de categorias (para a Sidebar)
const CATEGORIES = [
    'Consórcio imobiliário',
    'Consórcio automotivo',
    'Consórcio de serviços',
    'Investir e lucrar',
];

// --- Componente de Card de Artigo (Grid) ---
const ArticleCard = ({ article, index }) => {
    const slug = article.url.split('/').pop() || article.tags[0];

    return (
        <Link href={`/dashboard/blog/${slug}`} className="group block h-full">
            <Card className={cn(
                "h-full overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col",
                "animate-in fade-in slide-in-from-bottom-4 fill-mode-backwards"
            )} style={{ animationDelay: `${index * 100}ms` }}>

                {/* Imagem */}
                <div className="relative h-48 w-full overflow-hidden">
                    <Image
                        src={article.image || '/dashboard.png'}
                        alt={article.titulo}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                    <span
                        className="absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full text-white backdrop-blur-md bg-white/20 border border-white/30"
                    >
                        {article.categoria}
                    </span>
                </div>

                {/* Conteúdo */}
                <CardContent className="flex flex-col flex-grow p-5">
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                        <Clock size={14} className="text-primary" />
                        <span>{article.data}</span>
                    </div>

                    <h3 className="font-bold text-gray-900 text-xl mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {article.titulo}
                    </h3>

                    <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-grow">
                        {article.snippet}
                    </p>

                    <div className="flex items-center text-primary font-semibold text-sm mt-auto group-hover:translate-x-1 transition-transform">
                        Ler artigo <ArrowRight size={16} className="ml-1" />
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
};

// --- Componente da Página ---
export default function BlogIndexPage() {
    // Artigo em destaque (o primeiro da lista)
    const featuredArticle = BLOG_ARTICLES[0];
    const otherArticles = BLOG_ARTICLES.slice(1);

    return (
        <div className="min-h-screen bg-gray-50/50 pb-20">

            {/* ========================================================= */}
            {/* HERO SECTION */}
            {/* ========================================================= */}
            <div className="relative bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6 animate-in fade-in slide-in-from-left-8 duration-700">
                            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20">
                                Destaque da Semana
                            </div>
                            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
                                {featuredArticle.titulo}
                            </h1>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                {featuredArticle.snippet}
                            </p>
                            <div className="flex items-center gap-4 pt-2">
                                <Link href={featuredArticle.url} target="_blank">
                                    <Button size="lg" className="rounded-full px-8 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all">
                                        Ler Agora
                                    </Button>
                                </Link>
                                <span className="text-sm text-gray-500 flex items-center gap-1">
                                    <Clock size={16} /> {featuredArticle.data}
                                </span>
                            </div>
                        </div>
                        <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-right-8 duration-700 delay-200 group">
                            <Image
                                src={featuredArticle.image || '/login.jpg'}
                                alt="Featured Article"
                                layout="fill"
                                objectFit="cover"
                                className="transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-multiply" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                {/* ========================================================= */}
                {/* CATEGORIAS */}
                {/* ========================================================= */}
                <div className="mb-16">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">Explore por Categoria</h2>
                        <Link href="/dashboard/consortium" className="text-primary text-sm font-medium hover:underline flex items-center">
                            Ver todas <ChevronRight size={16} />
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {CATEGORY_CARDS.map((card, index) => {
                            const Icon = card.icon;
                            return (
                                <Link href={card.link} key={index} className="group">
                                    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col items-center text-center">
                                        <div className={cn("p-4 rounded-full mb-4 transition-colors group-hover:scale-110 duration-300", card.color)}>
                                            <Icon size={28} />
                                        </div>
                                        <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                                            {card.title}
                                        </h3>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* ========================================================= */}
                    {/* LISTA DE ARTIGOS (GRID) */}
                    {/* ========================================================= */}
                    <div className="lg:col-span-8 space-y-8">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-900">Últimas Publicações</h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {otherArticles.map((article, index) => (
                                <ArticleCard key={index} article={article} index={index} />
                            ))}
                        </div>

                        {/* Pagination Mock */}
                        <div className="flex justify-center pt-8">
                            <Button variant="outline" className="rounded-full">Carregar mais artigos</Button>
                        </div>
                    </div>

                    {/* ========================================================= */}
                    {/* SIDEBAR */}
                    {/* ========================================================= */}
                    <div className="lg:col-span-4 space-y-8">

                        {/* Newsletter / Banner */}
                        <div className="bg-gradient-to-br from-primary to-blue-600 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold mb-4">Realize seu sonho sem juros!</h3>
                                <p className="text-blue-100 mb-6">
                                    Simule agora e descubra como o consórcio Mycon pode economizar seu dinheiro.
                                </p>
                                <Button className="w-full bg-white text-primary hover:bg-blue-50 font-bold border-0 shadow-lg">
                                    Simular Agora
                                </Button>
                            </div>
                            {/* Decorative circles */}
                            <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
                            <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
                        </div>

                        {/* Categorias Lista */}
                        <Card className="border-0 shadow-md overflow-hidden">
                            <CardHeader className="bg-gray-50 border-b border-gray-100 pb-4">
                                <CardTitle className="text-lg">Tópicos Populares</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="divide-y divide-gray-100">
                                    {CATEGORIES.map((cat, index) => (
                                        <div key={index} className="p-4 hover:bg-gray-50 transition-colors cursor-pointer flex items-center justify-between group">
                                            <span className="text-gray-600 font-medium group-hover:text-primary transition-colors">{cat}</span>
                                            <ChevronRight size={16} className="text-gray-300 group-hover:text-primary transition-colors" />
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                    </div>
                </div>
            </div>
        </div>
    );
}