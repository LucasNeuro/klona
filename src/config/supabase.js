
export const SUPABASE_CONFIG = {
  url: import.meta.env.VITE_SUPABASE_URL || import.meta.env.SUPABASE_URL_KEY || 'https://mjamoqsniwrmutoczvdg.supabase.co',
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qYW1vcXNuaXdybXV0b2N6dmRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkzNDIzMTIsImV4cCI6MjA3NDkxODMxMn0.2O77bu1_ctaa3k2FtQmwL4AlwVhCT65JM2Yvp_AL4jQ'
};

// Função para salvar lead no Supabase
export async function salvarLeadSupabase(dados) {
  try {
    // Verificar se as credenciais estão configuradas
    if (!SUPABASE_CONFIG.url || !SUPABASE_CONFIG.anonKey || 
        SUPABASE_CONFIG.url.includes('your-project') || 
        SUPABASE_CONFIG.anonKey.includes('your-anon')) {
      console.warn('⚠️ Supabase não configurado. Usando modo de demonstração.');
      console.log('URL:', SUPABASE_CONFIG.url);
      console.log('Key:', SUPABASE_CONFIG.anonKey ? 'Configurada' : 'Não configurada');
      return {
        success: true,
        data: { id: 'demo-' + Date.now() },
        message: 'Modo demonstração - dados não salvos'
      };
    }

    // Preparar dados para o Supabase
    const dadosLead = {
      // Dados básicos
      nome: dados.nome,
      email: dados.email,
      telefone: dados.telefone || null,
      empresa: dados.empresa,
      cargo: dados.cargo,
      mensagem: dados.mensagem || null,
      
      // Softwares (convertido para JSON)
      softwares: JSON.stringify(dados.softwares || []),
      outros_softwares: dados.outros_softwares || null,
      
      // Metadados
      timestamp: new Date().toISOString(),
      source: dados.source || 'klonatec-website',
      
      // Campos calculados
      segmento: dados.empresa?.length > 50 ? 'Grande Empresa' : 'Média Empresa',
      lead_score: calcularLeadScore(dados.cargo),
      status: 'novo_lead',
      proximo_passo: 'Entraremos em contato em até 12 horas para uma consultoria gratuita.',
      valor_estimado: estimarValorOportunidade(dados.empresa),
      probabilidade: 25,
      data_fechamento: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      
      // Campos de controle
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // Salvar no Supabase
    const response = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`,
        'apikey': SUPABASE_CONFIG.anonKey,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(dadosLead)
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Erro Supabase:', errorData);
      throw new Error(`Erro HTTP: ${response.status} - ${errorData}`);
    }

    const resultado = await response.json();
    return {
      success: true,
      data: resultado[0], // Supabase retorna array
      message: 'Lead salvo com sucesso!'
    };

  } catch (error) {
    console.error('Erro ao salvar no Supabase:', error);
    return {
      success: false,
      error: error.message,
      message: 'Erro ao salvar dados. Tente novamente.'
    };
  }
}

// Função para calcular score do lead
function calcularLeadScore(cargo) {
  if (!cargo) return 50;
  
  const cargoLower = cargo.toLowerCase();
  
  if (cargoLower.includes('ceo') || cargoLower.includes('presidente') || cargoLower.includes('diretor')) {
    return 90;
  } else if (cargoLower.includes('cto') || cargoLower.includes('gerente') || cargoLower.includes('coordenador')) {
    return 75;
  } else if (cargoLower.includes('analista') || cargoLower.includes('supervisor')) {
    return 60;
  } else {
    return 50;
  }
}

// Função para estimar valor da oportunidade
function estimarValorOportunidade(empresa) {
  if (!empresa) return 15000;
  
  // Estimativa baseada no tamanho da empresa (nome)
  if (empresa.length > 50) {
    return 75000; // Grande empresa
  } else if (empresa.length > 25) {
    return 35000; // Média empresa
  } else {
    return 15000; // Pequena empresa
  }
}

// Instruções para configurar o Supabase:
/*
1. Crie um arquivo .env na raiz do projeto
2. Adicione as variáveis:
   PUBLIC_SUPABASE_URL=https://SEU-PROJETO-ID.supabase.co
   PUBLIC_SUPABASE_ANON_KEY=SUA-CHAVE-ANONIMA-AQUI
3. Reinicie o servidor (npm run dev)
4. Execute o SQL do arquivo supabase-schema.sql no SQL Editor do Supabase
*/