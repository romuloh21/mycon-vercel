import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight, CreditCard, Wallet, PiggyBank, Landmark } from "lucide-react";
import { Button } from "@/components/ui/button";

// Simulando dados de carteira baseados nos orçamentos existentes
function WalletCarousel({ budgetList = [], totalBalance = 0 }) {
  const scrollRef = useRef(null);

  // Calculando valores com proteção contra undefined
  const totalSpend = budgetList.length > 0 
    ? budgetList.reduce((sum, budget) => sum + Number(budget.totalSpend || 0), 0) 
    : 0;

  // Criando dados simulados de carteiras baseados nos orçamentos
  const wallets = [
    {
      id: 1,
      name: "Conta Principal",
      institution: "Banco Mycon",
      type: "debit",
      balance: totalBalance,
      color: "#005CE5",
      icon: "wallet",
      lastFourDigits: "1234"
    },
    {
      id: 2,
      name: "Cartão de Crédito",
      institution: "Mycon Card",
      type: "credit",
      balance: -(totalSpend * 0.6), // 60% das despesas no cartão
      color: "#8b5cf6",
      icon: "credit-card",
      lastFourDigits: "5678"
    },
    {
      id: 3,
      name: "Poupança",
      institution: "Mycon Bank",
      type: "savings",
      balance: totalBalance * 0.3, // 30% do saldo total na poupança
      color: "#10b981",
      icon: "piggy-bank",
      lastFourDigits: "9012"
    }
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 280;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="absolute -left-2 top-1/2 z-10 h-8 w-8 -translate-y-1/2 rounded-full bg-white shadow-md hover:bg-slate-50"
        onClick={() => scroll("left")}
      >
        <ChevronLeft size={18} />
      </Button>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth px-1 py-2 scrollbar-hide"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitScrollbar: { display: "none" }
        }}
      >
        {wallets.map((wallet, index) => (
          <div
            key={wallet.id}
            className="flex-shrink-0 animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <WalletCard wallet={wallet} />
          </div>
        ))}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-2 top-1/2 z-10 h-8 w-8 -translate-y-1/2 rounded-full bg-white shadow-md hover:bg-slate-50"
        onClick={() => scroll("right")}
      >
        <ChevronRight size={18} />
      </Button>
    </div>
  );
}

function WalletCard({ wallet }) {
  const isCredit = wallet.type === "credit";
  const displayBalance = isCredit ? Math.abs(wallet.balance) : wallet.balance;
  const balanceLabel = isCredit ? "Fatura atual" : wallet.type === "savings" ? "Saldo poupança" : "Saldo disponível";

  const getIcon = (iconName) => {
    switch (iconName) {
      case "credit-card":
        return <CreditCard size={48} />;
      case "wallet":
        return <Wallet size={48} />;
      case "piggy-bank":
        return <PiggyBank size={48} />;
      case "landmark":
        return <Landmark size={48} />;
      default:
        return <CreditCard size={48} />;
    }
  };

  const formatCurrency = (value) => {
    return Number(value || 0).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  return (
    <div
      className="relative h-[140px] w-[260px] overflow-hidden rounded-2xl p-5 text-white shadow-lg transition-transform hover:scale-[1.02] cursor-pointer"
      style={{
        background: `linear-gradient(145deg, ${wallet.color} 0%, ${wallet.color}cc 100%)`,
      }}
    >
      {/* Ícone de fundo */}
      <div className="absolute right-4 top-4 opacity-20">
        {getIcon(wallet.icon)}
      </div>

      <div className="flex flex-col justify-between h-full relative z-10">
        {/* Header */}
        <div>
          <p className="text-xs font-medium opacity-80">{wallet.institution}</p>
          <p className="text-sm font-semibold">{wallet.name}</p>
        </div>

        {/* Número do cartão */}
        <div>
          <p className="font-mono text-lg tracking-wider">
            •••• {wallet.lastFourDigits}
          </p>
        </div>

        {/* Saldo */}
        <div>
          <p className="text-xs opacity-80">{balanceLabel}</p>
          <p className="text-xl font-bold">
            {isCredit && wallet.balance < 0 ? "-" : ""}{formatCurrency(displayBalance)}
          </p>
        </div>
      </div>

      {/* Padrão decorativo */}
      <div className="absolute -bottom-2 -right-2 w-20 h-20 rounded-full bg-white/10"></div>
      <div className="absolute -top-2 -left-2 w-16 h-16 rounded-full bg-white/5"></div>
    </div>
  );
}

export default WalletCarousel;