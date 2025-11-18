// Arquivo: test-models.js
// Vamos usar o fetch nativo para bater direto na API do Google e ver o que está disponível para sua chave.

const API_KEY =  "AIzaSyBxBMU61P8ZE1GVZyZ72cmuN4LUKEPEuqs"; 
// Se não carregar do env, cole sua chave temporariamente ali em cima para testar

async function listModels() {
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;

  console.log("🔍 Consultando modelos disponíveis...");

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      console.error("❌ Erro na API:", data.error.message);
      return;
    }

    if (!data.models) {
      console.log("⚠️ Nenhum modelo encontrado ou resposta inesperada.");
      console.log(data);
      return;
    }

    console.log("✅ Modelos Disponíveis:");
    // Filtra apenas os modelos que servem para gerar conteúdo (chat)
    const chatModels = data.models.filter(m => m.supportedGenerationMethods.includes("generateContent"));

    chatModels.forEach(model => {
      console.log(`- ${model.name.replace('models/', '')} (${model.displayName})`);
    });

  } catch (error) {
    console.error("❌ Erro de conexão:", error);
  }
}

// Carregar variaveis de ambiente (caso você tenha o dotenv instalado, senão cole a chave direto na variavel lá em cima)
try {
    require('dotenv').config({ path: '.env.local' });
} catch (e) {
    // Ignora se não tiver dotenv, assume que a chave foi colada hardcoded ou já está no env
}

listModels();