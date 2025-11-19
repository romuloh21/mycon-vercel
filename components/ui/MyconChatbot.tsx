'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Calculator, BookOpen, TrendingUp, X, MessageCircle } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
  toolResult?: any
  metadata?: any
}

// Adicionamos a prop 'variant'
interface ChatbotProps {
  variant?: 'floating' | 'inline'
}

export default function MyconChatbot({ variant = 'floating' }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  // Se for inline, ele nasce aberto. Se for floating, nasce fechado.
  const [isOpen, setIsOpen] = useState(variant === 'inline') 
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isOpen])

  const sendMessage = async (overrideInput?: string) => {
    const userMessage = overrideInput || input
    if (!userMessage.trim()) return
    
    setInput('')
    setLoading(true)
    
    const newMessages: Message[] = [...messages, { role: 'user', content: userMessage }]
    setMessages(newMessages)
    
    try {
      const response = await fetch('/api/chat-mycon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          history: newMessages.slice(-4)
        })
      })
      
      const data = await response.json()
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.message,
        toolResult: data.toolResult,
        metadata: data.metadata
      }])
      
    } catch (error) {
      console.error('Erro:', error)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Desculpe, tive um problema de conexão. Tente novamente.'
      }])
    } finally {
      setLoading(false)
    }
  }

  // ESTADO 1: BOTÃO FECHADO (Apenas se for floating e estiver fechado)
  if (variant === 'floating' && !isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-blue-600 text-white p-4 rounded-full shadow-xl hover:bg-blue-700 transition-all hover:scale-105 animate-in fade-in zoom-in"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="font-semibold pr-1 hidden md:inline">Ajuda IA</span>
      </button>
    )
  }

  // Definição de classes baseadas na variante
  const containerClasses = variant === 'floating'
    ? "fixed bottom-6 right-6 z-50 w-[90vw] max-w-[380px] h-[600px] max-h-[80vh] shadow-2xl border-gray-200 animate-in slide-in-from-bottom-10 fade-in"
    : "w-full h-[600px] mt-8 shadow-md border-gray-200 block relative" // Classes para modo inline

  // ESTADO 2: JANELA DO CHAT ABERTA (OU MODO INLINE)
  return (
    <div className={`${containerClasses} bg-white rounded-2xl flex flex-col border overflow-hidden`}>
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-2">
          <div className="bg-white/20 p-2 rounded-lg">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-lg leading-tight">Mycon IA</h3>
            <p className="text-xs opacity-90">Consultor Virtual</p>
          </div>
        </div>
        
        {/* Só mostra o botão de fechar se for floating */}
        {variant === 'floating' && (
          <button 
            onClick={() => setIsOpen(false)} 
            className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
      
      {/* Área de Mensagens */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {/* ... (RESTO DO CÓDIGO DAS MENSAGENS PERMANECE IGUAL) ... */}
        {messages.length === 0 && (
          <div className="text-center mt-8 space-y-4 px-4">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-gray-600 font-medium text-sm">
              Olá! Sou sua IA especializada em consórcios. Como posso ajudar?
            </p>
            <div className="grid gap-2 pt-2">
              <button 
                onClick={() => sendMessage('Simular carta de 50 mil em 60 meses')}
                className="p-3 text-xs text-left bg-white border border-gray-200 rounded-xl hover:border-blue-500 hover:text-blue-600 transition-colors shadow-sm"
              >
                💰 Simulação rápida (R$ 50k)
              </button>
              <button 
                onClick={() => sendMessage('Como funciona o lance embutido?')}
                className="p-3 text-xs text-left bg-white border border-gray-200 rounded-xl hover:border-blue-500 hover:text-blue-600 transition-colors shadow-sm"
              >
                🎲 Explicar Lances
              </button>
            </div>
          </div>
        )}
        
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`
              max-w-[85%] p-3 rounded-2xl text-sm
              ${msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm'}
            `}>
              <p>{msg.content}</p>
              
              {/* Cards de Resultado */}
              {msg.toolResult && (
                <div className="mt-3 bg-blue-50 rounded-xl p-3 border border-blue-100 text-gray-800">
                    {/* Lógica de renderização dos tools (calculadora/blog) permanece igual */}
                    {/* ... Copie o conteúdo original do render ... */}
                </div>
              )}
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-2xl rounded-tl-none p-3 flex gap-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75" />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input Area */}
      <div className="p-3 bg-white border-t border-gray-100 shrink-0">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !loading && sendMessage()}
            placeholder="Digite sua dúvida..."
            className="flex-1 px-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
          <button
            onClick={() => sendMessage()}
            disabled={loading || !input.trim()}
            className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors shadow-md flex items-center justify-center"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}