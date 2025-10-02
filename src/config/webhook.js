// Configuração do Webhook para salvar leads
export const WEBHOOK_CONFIG = {
  url: 'https://webhook.fiqon.app/webhook/9efb3d49-28b0-4090-8957-710aaba28f6c/f9d7fae9-36b4-4512-adbd-d9a73886b60f'
};

// Debug: verificar se a variável está sendo carregada
console.log('🔍 DEBUG - VITE_FIQON_WEBHOOK:', import.meta.env.VITE_FIQON_WEBHOOK);
console.log('🔍 DEBUG - WEBHOOK_CONFIG.url:', WEBHOOK_CONFIG.url);

// Função para salvar lead via webhook
export async function salvarLeadWebhook(dados) {
  try {
    console.log('📤 Enviando dados para webhook:', dados);

    // Preparar dados para o webhook em formato JSON limpo
    const dadosWebhook = {
      // Dados básicos
      nome: dados.nome,
      email: dados.email,
      telefone: dados.telefone || '',
      empresa: dados.empresa,
      cargo: dados.cargo,
      mensagem: dados.mensagem || '',
      
      // Softwares como array JSON
      softwares: dados.softwares || [],
      outros_softwares: dados.outros_softwares || '',
      
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

    console.log('📋 Dados preparados para webhook:', JSON.stringify(dadosWebhook, null, 2));

    // Verificar se a URL do webhook está configurada
    if (!WEBHOOK_CONFIG.url) {
      throw new Error('URL do webhook não configurada. Configure a variável VITE_FIQON_WEBHOOK no arquivo .env');
    }

   
    const response = await fetch(WEBHOOK_CONFIG.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'Klonatec-Website/1.0'
      },
      body: JSON.stringify(dadosWebhook)
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('❌ Erro Webhook:', response.status, errorData);
      throw new Error(`Erro HTTP: ${response.status} - ${errorData}`);
    }

    // Tentar obter resposta como JSON, se falhar, usar texto
    let resultado;
    try {
      resultado = await response.json();
      console.log('✅ Webhook resposta JSON:', resultado);
    } catch (error) {
      resultado = await response.text();
      console.log('✅ Webhook resposta texto:', resultado);
    }

    return {
      success: true,
      data: { id: 'webhook-' + Date.now() },
      message: 'Lead enviado com sucesso via webhook!'
    };

  } catch (error) {
    console.error('Erro ao enviar para webhook:', error);
    return {
      success: false,
      error: error.message,
      message: 'Erro ao enviar dados. Tente novamente.'
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

// Instruções para configurar o webhook:
/*
1. O webhook está configurado para: https://webhook.fiqon.app/webhook/9efb3d49-28b0-4090-8957-710aaba28f6c/22be17d5-5f19-46c0-ae35-db2c65c2a9e1
2. Os dados são enviados em formato JSON
3. Não precisa de autenticação adicional
4. Verifique o console para logs de envio
*/
