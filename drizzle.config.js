import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';

// Carrega as variáveis de ambiente do .env.local
dotenv.config({ path: '.env.local' });

export default defineConfig({
  schema: "./utils/schema.jsx",
  dialect: 'postgresql', // Atualizado de 'driver' para 'dialect'
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});