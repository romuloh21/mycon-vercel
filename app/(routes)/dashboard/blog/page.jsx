"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, ArrowRight, TrendingUp, Wallet, Target, ChevronRight, Sparkles, DollarSign, PiggyBank } from 'lucide-react';
import { BLOG_ARTICLES } from '@/lib/mycon-data';
import { cn } from '@/lib/utils';

// Estilos customizados
const CustomStyles = () => (
    <style jsx global>{`
        .glass-card {
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(226, 232, 240, 0.8);
        }
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
        .animate-float {
            animation: float 6s ease-in-out infinite;
        }
    `}</style>
);

// Cores do tema
const PRIMARY_BLUE = '#005CE5';

// Mapeamento de ícones para categorias
const CATEGORY_ICONS = {
    'Finanças Pessoais': Wallet,
    'Investimentos': TrendingUp,
    'Orçamento': Target,
    'Economia': PiggyBank,
};

// Categorias de Finanças
const CATEGORY_CARDS = [
    { title: 'Finanças Pessoais', icon: Wallet, link: '/dashboard/blog?category=financas', color: 'bg-blue-50 text-[#005CE5]' },
    { title: 'Investimentos', icon: TrendingUp, link: '/dashboard/blog?category=investimentos', color: 'bg-indigo-50 text-indigo-600' },
    { title: 'Orçamento Familiar', icon: Target, link: '/dashboard/blog?category=orcamento', color: 'bg-purple-50 text-purple-600' },
    { title: 'Dicas de Economia', icon: PiggyBank, link: '/dashboard/blog?category=economia', color: 'bg-emerald-50 text-emerald-600' },
];

// Lista de categorias (para a Sidebar)
const CATEGORIES = [
    'Planejamento Financeiro',
    'Controle de Gastos',
    'Dicas de Economia',
    'Educação Financeira',
];

// --- Componente de Card de Artigo (Grid) ---
const ArticleCard = ({ article, index }) => {
    const slug = article.url?.split('/').pop() || article.tags?.[0] || 'artigo';

    return (
        <Link href={`/dashboard/blog/${slug}`} className="group block h-full">
            <Card className={cn(
                "glass-card h-full overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col hover:-translate-y-2",
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <span className="absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full text-white glass-card border border-white/30">
                        {article.categoria}
                    </span>
                </div>

                {/* Conteúdo */}
                <CardContent className="flex flex-col flex-grow p-5">
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                        <Clock size={14} className="text-[#005CE5]" />
                        <span>{article.data}</span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-xl mb-2 line-clamp-2 group-hover:text-[#005CE5] transition-colors">
                        {article.titulo}
                    </h3>

                    <p className="text-sm text-slate-600 line-clamp-3 mb-4 flex-grow">
                        {article.snippet}
                    </p>

                    <div className="flex items-center text-[#005CE5] font-semibold text-sm mt-auto group-hover:translate-x-1 transition-transform">
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
    const featuredArticle = BLOG_ARTICLES?.[0] || {
        titulo: 'Bem-vindo ao Blog',
        snippet: 'Explore nossos artigos sobre finanças pessoais',
        data: new Date().toLocaleDateString('pt-BR'),
        url: '#',
        image: '/dashboard.png'
    };
    const otherArticles = BLOG_ARTICLES?.slice(1) || [];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 pb-20">
            <CustomStyles />

            {/* ========================================================= */}
            {/* HERO SECTION */}
            {/* ========================================================= */}
            <div className="relative bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6 animate-in fade-in slide-in-from-left-8 duration-700">
                            <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold bg-blue-50 text-[#005CE5] border-blue-200">
                                <Sparkles size={14} className="mr-1" />
                                Destaque da Semana
                            </div>
                            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                                {featuredArticle.titulo}
                            </h1>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                {featuredArticle.snippet}
                            </p>
                            <div className="flex items-center gap-4 pt-2">
                                <Link href={featuredArticle.url} target="_blank">
                                    <Button size="lg" className="rounded-full px-8 bg-[#005CE5] hover:bg-[#004bbd] shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all">
                                        Ler Agora
                                    </Button>
                                </Link>
                                <span className="text-sm text-slate-500 flex items-center gap-1">
                                    <Clock size={16} /> {featuredArticle.data}
                                </span>
                            </div>
                        </div>
                        <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-right-8 duration-700 delay-200 group">
                            <Image
                                src={featuredArticle.image || '/Consorcio-Imobiliario.jpg'}
                                alt="Artigo em Destaque"
                                layout="fill"
                                objectFit="cover"
                                className="transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#005CE5]/20 to-transparent mix-blend-multiply" />
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
                        <h2 className="text-2xl font-bold text-slate-900">Explore por Categoria</h2>
                        <Link href="/dashboard" className="text-[#005CE5] text-sm font-medium hover:underline flex items-center">
                            Ver todas <ChevronRight size={16} />
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        {CATEGORY_CARDS.map((card, index) => {
                            const Icon = card.icon;
                            return (
                                <Link href={card.link} key={index} className="group">
                                    <div className="glass-card rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col items-center text-center">
                                        <div className={cn("p-4 rounded-full mb-4 transition-all group-hover:scale-110 duration-300", card.color)}>
                                            <Icon size={28} />
                                        </div>
                                        <h3 className="font-semibold text-slate-900 group-hover:text-[#005CE5] transition-colors text-sm md:text-base">
                                            {card.title}
                                        </h3>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

                    {/* ========================================================= */}
                    {/* LISTA DE ARTIGOS (GRID) */}
                    {/* ========================================================= */}
                    <div className="lg:col-span-8 space-y-8">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-slate-900">Últimas Publicações</h2>
                        </div>

                        {otherArticles.length > 0 ? (
                            <div className="grid md:grid-cols-2 gap-6">
                                {otherArticles.map((article, index) => (
                                    <ArticleCard key={index} article={article} index={index} />
                                ))}
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 gap-6">
                                {[1, 2, 3, 4].map((item) => (
                                    <div key={item} className="glass-card rounded-xl h-[400px] animate-pulse">
                                        <div className="h-48 bg-slate-200 rounded-t-xl"></div>
                                        <div className="p-5 space-y-3">
                                            <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                                            <div className="h-6 bg-slate-200 rounded w-full"></div>
                                            <div className="h-4 bg-slate-200 rounded w-full"></div>
                                            <div className="h-4 bg-slate-200 rounded w-2/3"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Pagination Mock */}
                        {otherArticles.length > 0 && (
                            <div className="flex justify-center pt-8">
                                <Button variant="outline" className="rounded-full border-slate-300 hover:bg-slate-50">
                                    Carregar mais artigos
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* ========================================================= */}
                    {/* SIDEBAR */}
                    {/* ========================================================= */}
                    <div className="lg:col-span-4 space-y-6 lg:space-y-8">

                        {/* CTA Banner */}
                        <div className="bg-gradient-to-br from-[#005CE5] to-[#003380] rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                                    <DollarSign size={24} />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">Controle Total das suas Finanças!</h3>
                                <p className="text-blue-100 mb-6 text-sm">
                                    Organize seus gastos, crie orçamentos e alcance seus objetivos financeiros.
                                </p>
                                <Link href="/dashboard">
                                    <Button className="w-full bg-white text-[#005CE5] hover:bg-blue-50 font-bold border-0 shadow-lg">
                                        Começar Agora
                                    </Button>
                                </Link>
                            </div>
                            {/* Decorative circles */}
                            <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-float" />
                            <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '3s' }} />
                        </div>

                        {/* Categorias Lista */}
                        <Card className="glass-card shadow-lg overflow-hidden">
                            <CardHeader className="bg-slate-50 border-b border-slate-200 pb-4">
                                <CardTitle className="text-lg text-slate-900 flex items-center gap-2">
                                    <Target size={18} className="text-[#005CE5]" />
                                    Tópicos Populares
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="divide-y divide-slate-100">
                                    {CATEGORIES.map((cat, index) => (
                                        <div key={index} className="p-4 hover:bg-slate-50 transition-colors cursor-pointer flex items-center justify-between group">
                                            <span className="text-slate-600 font-medium group-hover:text-[#005CE5] transition-colors text-sm">
                                                {cat}
                                            </span>
                                            <ChevronRight size={16} className="text-slate-300 group-hover:text-[#005CE5] transition-colors" />
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Card de Estatísticas */}
                        <Card className="glass-card shadow-lg">
                            <CardContent className="pt-6 space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                                        <Wallet size={20} className="text-[#005CE5]" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500">Artigos Publicados</p>
                                        <p className="text-lg font-bold text-slate-900">{BLOG_ARTICLES?.length || 0}+</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                                        <TrendingUp size={20} className="text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500">Leitores Ativos</p>
                                        <p className="text-lg font-bold text-slate-900">10.000+</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                    </div>
                </div>
            </div>
        </div>
    );
}