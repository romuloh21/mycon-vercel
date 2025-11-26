'use client'; // <--- ESSA LINHA É OBRIGATÓRIA PARA USAR HOOKS

import React, { useState, useEffect } from 'react';
import {
  BrainCircuit,
  Target,
  Wallet,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  PieChart,
  Activity,
  Zap,
  CheckCircle2
} from 'lucide-react';
import Link from 'next/link';
// Custom CSS for animations
const CustomStyles = () => (
  <style jsx global>{`
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
      100% { transform: translateY(0px); }
    }
    @keyframes float-delayed {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-15px); }
      100% { transform: translateY(0px); }
    }
    @keyframes glow {
      0% { box-shadow: 0 0 20px rgba(0, 92, 229, 0.3); }
      50% { box-shadow: 0 0 40px rgba(0, 92, 229, 0.6); }
      100% { box-shadow: 0 0 20px rgba(0, 92, 229, 0.3); }
    }
    @keyframes blob {
      0% { transform: translate(0px, 0px) scale(1); }
      33% { transform: translate(30px, -50px) scale(1.1); }
      66% { transform: translate(-20px, 20px) scale(0.9); }
      100% { transform: translate(0px, 0px) scale(1); }
    }
    @keyframes spin-slow {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .animate-float { animation: float 6s ease-in-out infinite; }
    .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
    .animate-glow { animation: glow 3s infinite; }
    .animate-blob { animation: blob 7s infinite; }
    .animate-spin-slow { animation: spin-slow 20s linear infinite; }
    .animation-delay-2000 { animation-delay: 2s; }
    .animation-delay-4000 { animation-delay: 4s; }
    .glass-card {
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(226, 232, 240, 0.8);
    }
    .glass-panel {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    .text-gradient {
      background: linear-gradient(135deg, #005CE5 0%, #003380 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .bg-grid-pattern {
      background-size: 40px 40px;
      background-image: linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
      mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
    }
    .perspective-1000 {
      perspective: 1000px;
    }
  `}</style>
);

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md border-b border-slate-200' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex flex-col cursor-pointer group">
          {/* Logo Image */}
            <img
              src="/logo-mycon-novo.png"
              alt="Mycon"
              className="h-8 md:h-9 w-auto object-contain mb-0.5 transition-transform duration-300 group-hover:scale-105 origin-left"
            />

          {/* Subtext */}
          <div className="flex items-center gap-2 pl-1">
            <div className="h-[1px] w-3 bg-[#005CE5]/50 group-hover:w-6 transition-all duration-500"></div>
            <span className="text-[9px] font-extrabold text-[#005CE5] tracking-[0.3em] uppercase leading-none">
              Financial AI
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {['Recursos', 'Como Funciona', 'Depoimentos'].map((item) => (
            <a key={item} href="#" className="text-slate-600 hover:text-[#005CE5] transition-colors text-sm font-medium">
              {item}
            </a>
          ))}
          
          <Link href="/dashboard" className="px-6 py-2.5 bg-[#005CE5] hover:bg-[#004bbd] text-white rounded-full font-medium transition-all hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,92,229,0.4)] text-sm"
           
          >
            Acessar Agora
          </Link>
        </div>
      </div>
    </nav>
  );
};

const PhoneMockup = () => (
  <div className="relative w-[300px] h-[600px] bg-black rounded-[50px] border-[8px] border-[#1a1a1a] shadow-2xl overflow-hidden animate-float z-10 mx-auto">
    {/* Dynamic Island */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100px] h-[25px] bg-black rounded-b-2xl z-20"></div>

    {/* Screen Content */}
    <div className="w-full h-full bg-white p-4 pt-12 flex flex-col relative">
      {/* Chat Interface */}
      <div className="flex-1 space-y-4 overflow-hidden">
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-[#005CE5] flex items-center justify-center text-xs text-white shrink-0">AI</div>
          <div className="bg-slate-100 p-3 rounded-2xl rounded-tl-none max-w-[80%] border border-slate-200">
            <p className="text-slate-700 text-xs">Analisei seus gastos. Você pode economizar R$ 450/mês reduzindo assinaturas não utilizadas.</p>
          </div>
        </div>

        <div className="flex gap-3 flex-row-reverse">
          <div className="bg-[#005CE5] p-3 rounded-2xl rounded-tr-none max-w-[80%] shadow-lg">
            <p className="text-white text-xs">Ótimo! Como invisto esse valor no meu consórcio?</p>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-[#005CE5] flex items-center justify-center text-xs text-white shrink-0">AI</div>
          <div className="bg-slate-100 p-3 rounded-2xl rounded-tl-none max-w-[80%] border border-slate-200">
            <p className="text-slate-700 text-xs">Sugiro antecipar 2 parcelas. Isso aumenta sua chance de contemplação em 15% este mês.</p>
            <div className="mt-2 bg-white rounded-lg p-2 flex items-center gap-2 border border-slate-200">
              <div className="w-1 h-8 bg-green-500 rounded-full"></div>
              <div>
                <p className="text-[10px] text-slate-500">Probabilidade</p>
                <p className="text-xs text-green-600 font-bold">+15% Chance</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="absolute bottom-4 left-4 right-4 h-14 glass-card rounded-full flex items-center justify-around px-2 shadow-lg">
        <div className="p-2 bg-[#005CE5]/10 rounded-full text-[#005CE5]"><BrainCircuit size={20} /></div>
        <div className="p-2 text-slate-400"><PieChart size={20} /></div>
        <div className="p-2 text-slate-400"><Wallet size={20} /></div>
      </div>

      {/* Glow Ring */}
      <div className="absolute inset-0 rounded-[40px] shadow-[inset_0_0_40px_rgba(0,92,229,0.1)] pointer-events-none"></div>
    </div>
  </div>
);

const MacBookMockup = () => (
  <div className="relative w-full max-w-4xl mx-auto perspective-1000">
    <div className="relative bg-white rounded-t-2xl border-[12px] border-b-0 border-[#1a1a1a] aspect-[16/10] shadow-2xl overflow-hidden transform rotateX-2 transition-transform duration-500 hover:rotateX-0">
      {/* Screen Content */}
      <div className="w-full h-full bg-slate-50 flex">
        {/* Sidebar */}
        <div className="w-16 md:w-64 border-r border-slate-200 p-4 hidden md:flex flex-col gap-6 bg-white">
          <div className="flex items-center gap-2 text-[#005CE5] font-bold mb-4">
            <div className="w-6 h-6 bg-[#005CE5] rounded text-white flex items-center justify-center text-xs">M</div>
            Dashboard
          </div>
          <div className="space-y-2">
            {['Visão Geral', 'Meus Consórcios', 'Lances', 'Carteira'].map((item, i) => (
              <div key={item} className={`p-2 rounded-lg text-sm cursor-pointer ${i === 0 ? 'bg-[#005CE5]/10 text-[#005CE5]' : 'text-slate-600 hover:bg-slate-100'}`}>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-hidden flex flex-col">
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: 'Saldo Total', value: 'R$ 124.500', icon: Wallet, color: 'text-green-600' },
              { label: 'Próximo Lance', value: 'R$ 2.400', icon: Target, color: 'text-[#005CE5]' },
              { label: 'Saúde Financeira', value: '98/100', icon: Activity, color: 'text-purple-600' },
            ].map((card, i) => (
              <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-slate-500 text-xs">{card.label}</span>
                  <card.icon size={16} className={card.color} />
                </div>
                <div className="text-xl font-bold text-slate-900 truncate">{card.value}</div>
              </div>
            ))}
          </div>

          {/* Chart Area */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 flex-1 relative overflow-hidden shadow-sm flex flex-col">
            <div className="flex justify-between mb-4">
              <h3 className="text-slate-900 text-sm font-medium">Projeção de Contemplação</h3>
              <select className="bg-slate-50 text-slate-600 text-xs border border-slate-200 rounded px-2 py-1 outline-none">
                <option>Últimos 6 meses</option>
              </select>
            </div>
            <div className="flex items-end justify-between flex-1 gap-2 px-2">
              {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 95].map((h, i) => (
                <div key={i} className="w-full bg-[#005CE5]/10 rounded-t-sm relative group h-full">
                  <div
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#005CE5] to-[#00a2ff] rounded-t-sm transition-all duration-500 group-hover:opacity-80"
                    style={{ height: `${h}%` }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Base */}
    <div className="h-4 bg-[#1a1a1a] rounded-b-xl mx-[2px] shadow-xl relative z-20">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-2 bg-[#2a2a2a] rounded-b-lg"></div>
    </div>

    {/* Floating Cards */}
    <div className="absolute -right-12 top-20 glass-card p-4 rounded-xl animate-float-delayed hidden lg:block shadow-lg z-30">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
          <Sparkles size={20} />
        </div>
        <div>
          <p className="text-xs text-slate-500">Dica da IA</p>
          <p className="text-sm text-slate-900 font-medium">Lance otimizado!</p>
        </div>
      </div>
    </div>
  </div>
);

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="glass-card p-8 rounded-2xl hover:bg-white transition-all duration-300 hover:-translate-y-2 group shadow-sm hover:shadow-xl">
    <div className="w-14 h-14 rounded-xl bg-[#005CE5]/10 flex items-center justify-center mb-6 group-hover:bg-[#005CE5] transition-colors duration-300">
      <Icon size={28} className="text-[#005CE5] group-hover:text-white transition-colors duration-300" />
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{description}</p>
  </div>
);

const PurposeSection = () => {
  return (
    <section className="py-32 relative overflow-hidden border-y border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row gap-16 items-center">

          {/* Lado Esquerdo: Manifesto Inspiracional */}
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200">
              <span className="text-slate-600 text-xs font-bold uppercase tracking-widest">Nosso Propósito</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold leading-tight text-slate-900">
              Mais do que crédito. <br />
              <span className="text-[#005CE5]">Inteligência financeira.</span>
            </h2>

            <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
              <p>
                A Mycon nasceu digital para ser a opção mais eficiente do mercado. Acreditamos que a realização do seu sonho — seja a casa nova ou o carro — começa muito antes da compra: <strong className="text-slate-900">começa na organização do bolso.</strong>
              </p>
              <p>
                Entregamos essa tecnologia gratuitamente porque queremos ser parceiros da sua jornada completa.
              </p>
              <p>
                Queremos que você tenha clareza para investir, fôlego para ofertar lances e tranquilidade para conquistar seus objetivos.
              </p>
            </div>

            <div className="pt-6 border-t border-slate-200 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#005CE5]/10 flex items-center justify-center">
                <CheckCircle2 className="text-[#005CE5]" size={24} />
              </div>
              <div>
                <p className="text-slate-900 font-bold text-sm">Quem se organiza, realiza.</p>
                <p className="text-slate-500 text-xs">Uma iniciativa Mycon & Lizard</p>
              </div>
            </div>
          </div>

          {/* Lado Direito: Visual Clean (Sem promessas agressivas) */}
          <div className="flex-1 flex justify-center relative">
            {/* Card Representando o Futuro */}
            <div className="bg-white border border-slate-200 shadow-2xl p-8 rounded-3xl max-w-sm w-full relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-10 bg-[#005CE5] blur-[80px] opacity-5 group-hover:opacity-10 transition-opacity"></div>

              <h3 className="text-xl font-bold text-slate-900 mb-6">Seu Ecossistema</h3>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="p-2 bg-blue-100 rounded-lg text-blue-600"><Wallet size={18} /></div>
                  <div className="flex-1">
                    <p className="text-xs text-slate-500">Passo 1</p>
                    <p className="text-sm font-medium text-slate-900">Organizar Finanças</p>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="w-0.5 h-4 bg-slate-200"></div>
                </div>

                <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="p-2 bg-purple-100 rounded-lg text-purple-600"><Target size={18} /></div>
                  <div className="flex-1">
                    <p className="text-xs text-slate-500">Passo 2</p>
                    <p className="text-sm font-medium text-slate-900">Planejar o Lance</p>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="w-0.5 h-4 bg-slate-200"></div>
                </div>

                <div className="flex items-center gap-4 p-3 rounded-xl bg-gradient-to-r from-[#005CE5]/10 to-blue-600/5 border border-[#005CE5]/20">
                  <div className="p-2 bg-[#005CE5] rounded-lg text-white"><Zap size={18} /></div>
                  <div className="flex-1">
                    <p className="text-xs text-blue-600 font-medium">Resultado</p>
                    <p className="text-sm font-bold text-slate-900">Conquista do Bem</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] overflow-x-hidden font-sans selection:bg-[#005CE5] selection:text-white">
      <CustomStyles />
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none"></div>
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#005CE5] rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-blob"></div>
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-blob animation-delay-2000"></div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 mb-8 animate-float shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#005CE5] animate-pulse"></span>
              <span className="text-sm text-slate-600 font-medium">Convite Exclusivo Lizard</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 leading-tight mb-6 tracking-tight">
              O FUTURO DO <br />
              <span className="text-gradient">SEU DINHEIRO</span> <br />
              É AGORA.
            </h1>

            <p className="text-lg text-slate-600 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Uma inteligência artificial que não apenas organiza, mas multiplica seu patrimônio através de consórcios estratégicos e análise de dados em tempo real.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/dashboard" className="px-8 py-4 bg-[#005CE5] hover:bg-[#004bbd] text-white rounded-full font-bold text-lg transition-all hover:-translate-y-1 shadow-[0_10px_30px_rgba(0,92,229,0.3)] flex items-center justify-center gap-2 group">
                LIBERAR MEU ACESSO
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-900 rounded-full font-bold text-lg transition-all hover:-translate-y-1 border border-slate-200 shadow-sm">
                Ver Demonstração
              </button>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end w-full">
            <div className="relative z-10">
              <PhoneMockup />
            </div>
            {/* Decorative elements behind phone */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[650px] border border-[#005CE5]/10 rounded-[60px] rotate-6 pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[650px] border border-purple-500/10 rounded-[60px] -rotate-6 pointer-events-none"></div>
          </div>
        </div>
      </section>

      {/* Dashboard Section */}
      <section className="py-20 px-6 relative bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-4">Visão Estratégica em Tela Grande</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Controle total sobre seus investimentos com um dashboard profissional desenhado para clareza e performance.
            </p>
          </div>
          <MacBookMockup />
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={BrainCircuit}
              title="IA que Responde"
              description="Tire dúvidas sobre finanças, consórcios e investimentos 24/7 com nossa IA especializada."
            />
            <FeatureCard
              icon={Target}
              title="Simulador de Sonhos"
              description="Visualize o caminho exato para seus objetivos com projeções baseadas em dados reais."
            />
            <FeatureCard
              icon={Wallet}
              title="Gestão Sem Esforço"
              description="Conecte suas contas e deixe que nossa tecnologia categorize e otimize seus gastos."
            />
            <FeatureCard
              icon={ShieldCheck}
              title="Segurança Bancária"
              description="Seus dados protegidos com criptografia de ponta a ponta e protocolos de nível bancário."
            />
          </div>
        </div>
      </section>

      {/* Purpose Section - Manifesto */}
      <PurposeSection />

      {/* Final CTA */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#005CE5] opacity-5"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#005CE5] to-transparent"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-8 leading-tight drop-shadow-xl">
            DOMINE SUAS FINANÇAS.<br />
            COMECE AGORA.
          </h2>
          <p className="text-xl text-slate-600 mb-12">
            Junte-se a milhares de membros que já estão transformando seu futuro financeiro com a Mycon AI.
          </p>

          <div className="flex flex-col items-center gap-4">
            <Link href="/dashboard" className="px-12 py-5 bg-[#005CE5] hover:bg-[#004bbd] text-white rounded-full font-bold text-xl transition-all duration-300 hover:-translate-y-2 shadow-[0_10px_40px_rgba(0,92,229,0.4)]">
              GARANTIR MEU ACESSO
            </Link>
            <p className="text-sm text-[#005CE5] font-medium tracking-wide uppercase">
              Lote limitado • 100% Gratuito
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#005CE5] rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="text-slate-500 text-sm">© 2024 Mycon AI. Todos os direitos reservados.</span>
          </div>
          <div className="flex gap-6">
            {['Termos', 'Privacidade', 'Suporte'].map((item) => (
              <a key={item} href="#" className="text-slate-500 hover:text-[#005CE5] text-sm transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}