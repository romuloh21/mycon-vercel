"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Car, Home, Bike, Smile } from 'lucide-react'; // ✅ Bike em vez de Motorcycle
import MyconChatbot from '@/components/ui/MyconChatbot';

// Opções de Categoria
const categories = [
  { name: 'Auto', icon: Car },
  { name: 'Imóvel', icon: Home },
  { name: 'Moto', icon: Bike }, // ✅ Mudou de Motorcycle para Bike
  { name: 'Serviço', icon: Smile },
];

export default function ConsortiumSimulatorPage() {
  const [selectedCategory, setSelectedCategory] = useState('Auto');
  const [simulateBy, setSimulateBy] = useState('valorTotal');
  const [sliderValue, setSliderValue] = useState(25000);
  
  const router = useRouter();

  const handleSimulate = () => {
    router.push(
      `/dashboard/consortium/results?category=${selectedCategory}&simulateBy=${simulateBy}&value=${sliderValue}`
    );
  };

  const isValorTotal = simulateBy === 'valorTotal';
  const min = isValorTotal ? 25000 : 300;
  const max = isValorTotal ? 400000 : 5000;
  const step = isValorTotal ? 1000 : 50;

  const formatCurrency = (value) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Qual é o seu sonho?</h1>

      {/* 1. Seleção de Categoria */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {categories.map((cat) => {
          const IconComponent = cat.icon;
          const isSelected = selectedCategory === cat.name;
          return (
            <button
              key={cat.name}
              className={`
                flex flex-col items-center justify-center h-24 gap-2 rounded-lg border-2 
                font-medium transition-all duration-200
                ${isSelected 
                  ? 'bg-blue-600 text-white border-blue-600 shadow-lg' 
                  : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                }
              `}
              onClick={() => setSelectedCategory(cat.name)}
            >
              <IconComponent className="h-8 w-8" />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* 2. Toggle Valor Total vs. Parcela */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <button
          className={`
            h-12 text-lg font-medium rounded-lg border-2 transition-all duration-200
            ${simulateBy === 'valorTotal'
              ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
              : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:bg-blue-50'
            }
          `}
          onClick={() => setSimulateBy('valorTotal')}
        >
          Valor Total
        </button>
        <button
          className={`
            h-12 text-lg font-medium rounded-lg border-2 transition-all duration-200
            ${simulateBy === 'parcela'
              ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
              : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:bg-blue-50'
            }
          `}
          onClick={() => setSimulateBy('parcela')}
        >
          Parcela
        </button>
      </div>

      {/* 3. Slider de Valor */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-xl font-semibold mb-2">
          {isValorTotal ? 'Qual valor você deseja simular?' : 'Qual parcela cabe no seu bolso?'}
        </h2>
        <div className="text-3xl font-bold text-blue-600 mb-6">
          {formatCurrency(sliderValue)}
        </div>
        
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={sliderValue}
          onChange={(e) => setSliderValue(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          style={{
            background: `linear-gradient(to right, rgb(37, 99, 235) 0%, rgb(37, 99, 235) ${((sliderValue - min) / (max - min)) * 100}%, rgb(229, 231, 235) ${((sliderValue - min) / (max - min)) * 100}%, rgb(229, 231, 235) 100%)`
          }}
        />
        
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span>{formatCurrency(min)}</span>
          <span>{formatCurrency(max)}</span>
        </div>
      </div>

      {/* 4. Botão de Simular */}
      <button
        className="w-full h-14 text-xl font-semibold bg-blue-600 text-white rounded-lg 
                   hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200 
                   shadow-lg hover:shadow-xl"
        onClick={handleSimulate}
      >
        Simular
      </button>
      {/* Adicione uma margem ou divisor se quiser separar visualmente */}
      <div className="my-8 border-t border-gray-200" />
      
      {/* Chamada do Chatbot no modo Inline */}
      <h3 className="text-lg font-semibold text-center mb-4 text-gray-700">
        Ainda tem dúvidas? Fale com o Mycon
      </h3>
      <MyconChatbot variant="inline" />
    </div>
  );
}