// ========================================
// SUPABASE SERVICE - KLONATEC
// Service simples para salvar dados na tabela leads
// ========================================

// 1. CONFIGURAÇÃO DO SUPABASE
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

// 2. VALIDAÇÃO DAS CONFIGURAÇÕES
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error('❌ ERRO: Variáveis de ambiente SUPABASE_URL e SUPABASE_ANON_KEY não configuradas!');
}

// 3. FUNÇÃO PARA FORMATAR DATA
function formatarData(data) {
    let ano = data.getFullYear();
    let mes = String(data.getMonth() + 1).padStart(2, '0');
    let dia = String(data.getDate()).padStart(2, '0');
    let hora = String(data.getHours()).padStart(2, '0');
    let min = String(data.getMinutes()).padStart(2, '0');
    let seg = String(data.getSeconds()).padStart(2, '0');
    return `${ano}-${mes}-${dia} ${hora}:${min}:${seg}`;
}

// 4. CONFIGURAR TIMESTAMPS
let agora = new Date();
let dataProcessamento = formatarData(agora);

// 5. FUNÇÕES DE CLASSIFICAÇÃO
function classificarLead(empresa, cargo) {
    if (!empresa || !cargo) return "lead_basico";
    
    let cargoLower = cargo.toLowerCase();
    let empresaLower = empresa.toLowerCase();
    
    if (cargoLower.includes('ceo') || cargoLower.includes('diretor') || 
        cargoLower.includes('cto') || cargoLower.includes('presidente')) {
        return "lead_premium";
    }
    
    if (empresaLower.includes('ltda') || empresaLower.includes('s.a') || 
        empresaLower.includes('corporation') || empresaLower.includes('group')) {
        return "lead_enterprise";
    }
    
    return "lead_standard";
}

function calcularPrioridade(cargo) {
    if (!cargo) return "media";
    
    let cargoLower = cargo.toLowerCase();
    
    if (cargoLower.includes('ceo') || cargoLower.includes('diretor') || 
        cargoLower.includes('cto') || cargoLower.includes('presidente')) {
        return "alta";
    }
    
    if (cargoLower.includes('gerente') || cargoLower.includes('manager') || 
        cargoLower.includes('coordenador')) {
        return "media";
    }
    
    return "baixa";
}

function identificarSegmento(empresa) {
    if (!empresa) return "nao_identificado";
    
    let empresaLower = empresa.toLowerCase();
    
    if (empresaLower.includes('tech') || empresaLower.includes('software') || 
        empresaLower.includes('sistemas') || empresaLower.includes('digital')) {
        return "tecnologia";
    }
    
    if (empresaLower.includes('consultoria') || empresaLower.includes('servicos') || 
        empresaLower.includes('advisory')) {
        return "consultoria";
    }
    
    if (empresaLower.includes('industria') || empresaLower.includes('manufacturing') || 
        empresaLower.includes('producao')) {
        return "industria";
    }
    
    if (empresaLower.includes('comercio') || empresaLower.includes('vendas') || 
        empresaLower.includes('retail')) {
        return "comercio";
    }
    
    return "outros";
}

function calcularLeadScore(empresa, cargo) {
    let score = 0;
    
    if (!empresa || !cargo) return 10;
    
    let cargoLower = cargo.toLowerCase();
    let empresaLower = empresa.toLowerCase();
    
    if (cargoLower.includes('ceo') || cargoLower.includes('presidente')) score += 50;
    else if (cargoLower.includes('diretor') || cargoLower.includes('cto')) score += 40;
    else if (cargoLower.includes('gerente') || cargoLower.includes('manager')) score += 30;
    else if (cargoLower.includes('coordenador')) score += 20;
    else score += 10;
    
    if (empresaLower.includes('ltda') || empresaLower.includes('s.a')) score += 20;
    else if (empresaLower.includes('group') || empresaLower.includes('corporation')) score += 30;
    
    return Math.min(score, 100);
}

function estimarValorOportunidade(empresa) {
    if (!empresa) return 50000;
    
    let empresaLower = empresa.toLowerCase();
    
    if (empresaLower.includes('ltda') || empresaLower.includes('s.a')) return 100000;
    if (empresaLower.includes('group') || empresaLower.includes('corporation')) return 200000;
    
    return 50000;
}

// 6. PREPARAR DADOS PARA INSERÇÃO
let dadosLead = {
    nome: nome,
    email: email,
    telefone: telefone || null,
    empresa: empresa || null,
    cargo: cargo || null,
    mensagem: mensagem || null,
    source: source || 'klonatec-website',
    timestamp_original: timestamp,
    data_processamento: dataProcessamento,
    tipo_lead: classificarLead(empresa, cargo),
    prioridade: calcularPrioridade(cargo),
    segmento: identificarSegmento(empresa),
    lead_score: calcularLeadScore(empresa, cargo),
    status: 'novo_lead',
    proximo_passo: 'Entraremos em contato em até 24h para uma consultoria gratuita.',
    valor_estimado: estimarValorOportunidade(empresa),
    probabilidade: 25,
    data_fechamento: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
};

// 7. FUNÇÃO PARA SALVAR NO SUPABASE
async function salvarLeadSupabase(dados) {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'apikey': SUPABASE_ANON_KEY
            },
            body: JSON.stringify(dados)
        });
        
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        
        const resultado = await response.json();
        return resultado;
        
    } catch (error) {
        console.error('Erro ao salvar no Supabase:', error);
        throw error;
    }
}

// 8. EXECUTAR SALVAMENTO
let resultado = await salvarLeadSupabase(dadosLead);

// 9. RETORNO FINAL
return {
    "sucesso": true,
    "lead_id": resultado[0].id,
    "dados_salvos": dadosLead,
    "mensagem": "Lead salvo com sucesso no Supabase!",
    "processamento": {
        "timestamp": dataProcessamento,
        "sistema": "klonatec_supabase_service"
    }
};
