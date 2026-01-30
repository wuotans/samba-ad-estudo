import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, CheckCircle2, AlertTriangle, XCircle,
  ExternalLink, Clock, Users, Server, RefreshCw, BookOpen
} from 'lucide-react';

export default function EstrategiaMigracao() {
  const etapasMigracao = [
    {
      fase: 1,
      titulo: "Planejamento e Inventário",
      duracao: "2-4 semanas",
      atividades: [
        "Inventário completo do AD DS atual (usuários, grupos, GPOs, OUs)",
        "Mapeamento de aplicações dependentes de AD",
        "Documentação de schema extensions",
        "Identificação de GPOs críticas e alternativas",
        "Definição de critérios de sucesso",
      ]
    },
    {
      fase: 2,
      titulo: "Ambiente de Homologação",
      duracao: "4-6 semanas",
      atividades: [
        "Provisionar Samba AD DCs em ambiente isolado",
        "Migrar amostra de usuários e grupos",
        "Testar todas as aplicações LDAP (Nextcloud, GLPI, Moodle, etc.)",
        "Testar ingresso de estações Windows 10/11",
        "Validar GPOs aplicáveis",
        "Testar aplicativos especiais (crachás, biometria)",
      ]
    },
    {
      fase: 3,
      titulo: "Preparação da Produção",
      duracao: "2-3 semanas",
      atividades: [
        "Provisionar Samba AD DCs de produção",
        "Configurar LDAPS com certificados válidos",
        "Configurar replicação entre DCs",
        "Implementar backup automatizado",
        "Preparar scripts de migração de usuários",
      ]
    },
    {
      fase: 4,
      titulo: "Migração (Big Bang ou Gradual)",
      duracao: "1-4 semanas",
      atividades: [
        "Exportar usuários e grupos do AD DS",
        "Importar no Samba AD",
        "Reconfigurar aplicações para apontar novo AD",
        "Reingressar estações no novo domínio",
        "Aplicar GPOs e scripts",
        "Validar funcionalidades",
      ]
    },
    {
      fase: 5,
      titulo: "Estabilização",
      duracao: "2-4 semanas",
      atividades: [
        "Monitoramento intensivo",
        "Ajustes finos de configuração",
        "Documentação de procedimentos operacionais",
        "Treinamento da equipe técnica",
        "Descomissionamento do AD DS antigo",
      ]
    },
  ];

  const riscosMitigacoes = [
    {
      risco: "Incompatibilidade de GPO",
      probabilidade: "Alta",
      impacto: "Alto",
      mitigacao: "Mapear todas as GPOs antes da migração e preparar alternativas (scripts, ferramentas de terceiros)"
    },
    {
      risco: "Aplicação não compatível",
      probabilidade: "Média",
      impacto: "Alto",
      mitigacao: "Testar todas as aplicações em homologação. Ter plano B para cada aplicação crítica"
    },
    {
      risco: "Windows Update quebra compatibilidade",
      probabilidade: "Média",
      impacto: "Alto",
      mitigacao: "Manter Samba atualizado, monitorar release notes da Microsoft e Samba"
    },
    {
      risco: "Reingresso de estações falha",
      probabilidade: "Baixa",
      impacto: "Médio",
      mitigacao: "Testar processo em homologação, preparar scripts automatizados"
    },
    {
      risco: "Perda de dados de perfil",
      probabilidade: "Média",
      impacto: "Médio",
      mitigacao: "Backup de perfis antes da migração, documentar processo de restore"
    },
    {
      risco: "Equipe sem expertise",
      probabilidade: "Alta",
      impacto: "Alto",
      mitigacao: "Treinamento prévio, contratação de consultoria especializada"
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <Card className="border-0 bg-gradient-to-r from-orange-900 to-orange-800 text-white">
        <CardContent className="p-8">
          <h2 className="text-2xl font-semibold mb-4">Estratégia de Migração</h2>
          <p className="text-orange-100 leading-relaxed">
            Proposta de estratégia de migração do AD DS para Samba AD, incluindo 
            fases, cronograma estimado, riscos e plano de contingência.
          </p>
        </CardContent>
      </Card>

      {/* Alerta Importante */}
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-red-900 mb-2">Atenção: Não Existe Migração In-Place</h3>
              <p className="text-red-800 text-sm leading-relaxed">
                <strong>Não é possível converter um AD DS Microsoft em Samba AD diretamente.</strong> 
                A migração requer a criação de um novo domínio Samba e migração de objetos 
                (usuários, grupos) via exportação/importação. Todas as estações Windows 
                precisarão ser reingressadas no novo domínio.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Opções de Estratégia */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border border-slate-200">
          <CardHeader className="bg-blue-50 border-b">
            <CardTitle className="text-lg flex items-center gap-2 text-blue-900">
              <RefreshCw className="w-5 h-5" />
              Opção 1: Big Bang
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-slate-600 mb-4">
              Migração completa em uma janela de manutenção definida.
            </p>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1" />
                <span className="text-sm text-slate-600">Período de transição curto</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1" />
                <span className="text-sm text-slate-600">Sem necessidade de coexistência</span>
              </div>
              <div className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-red-500 mt-1" />
                <span className="text-sm text-slate-600">Alto risco de impacto</span>
              </div>
              <div className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-red-500 mt-1" />
                <span className="text-sm text-slate-600">Janela de manutenção longa</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-slate-200">
          <CardHeader className="bg-emerald-50 border-b">
            <CardTitle className="text-lg flex items-center gap-2 text-emerald-900">
              <ArrowRight className="w-5 h-5" />
              Opção 2: Gradual (Recomendada)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-slate-600 mb-4">
              Migração por departamentos/grupos ao longo de semanas.
            </p>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1" />
                <span className="text-sm text-slate-600">Menor risco por iteração</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1" />
                <span className="text-sm text-slate-600">Permite ajustes durante o processo</span>
              </div>
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500 mt-1" />
                <span className="text-sm text-slate-600">Requer coexistência temporária</span>
              </div>
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500 mt-1" />
                <span className="text-sm text-slate-600">Período de transição mais longo</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Timeline */}
      <Card className="border border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="w-5 h-5 text-slate-600" />
            Cronograma Estimado de Migração
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {etapasMigracao.map((etapa, index) => (
              <div key={index} className="relative">
                {index < etapasMigracao.length - 1 && (
                  <div className="absolute left-5 top-12 w-0.5 h-full bg-slate-200" />
                )}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-semibold">
                    {etapa.fase}
                  </div>
                  <div className="flex-1 pb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-slate-900">{etapa.titulo}</h4>
                      <Badge variant="outline" className="text-xs">
                        {etapa.duracao}
                      </Badge>
                    </div>
                    <ul className="text-sm text-slate-600 space-y-1">
                      {etapa.atividades.map((atividade, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-slate-400">•</span>
                          {atividade}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <p className="text-sm text-blue-800">
              <strong>Duração total estimada:</strong> 11 a 21 semanas (3-5 meses), 
              dependendo da complexidade do ambiente e disponibilidade da equipe.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Riscos e Mitigações */}
      <Card className="border border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-slate-600" />
            Análise de Riscos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {riscosMitigacoes.map((item, index) => (
              <div key={index} className="p-4 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-semibold text-slate-900">{item.risco}</span>
                  <Badge className={
                    item.probabilidade === 'Alta' 
                      ? 'bg-red-100 text-red-700' 
                      : item.probabilidade === 'Média'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-emerald-100 text-emerald-700'
                  }>
                    Prob: {item.probabilidade}
                  </Badge>
                  <Badge className={
                    item.impacto === 'Alto' 
                      ? 'bg-red-100 text-red-700' 
                      : 'bg-amber-100 text-amber-700'
                  }>
                    Imp: {item.impacto}
                  </Badge>
                </div>
                <p className="text-sm text-slate-600">
                  <strong>Mitigação:</strong> {item.mitigacao}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Rollback */}
      <Card className="border border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-slate-600" />
            Plano de Contingência (Rollback)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <h4 className="font-semibold text-amber-900 mb-2">Estratégia de Rollback</h4>
            <p className="text-sm text-amber-800 mb-3">
              Como não há migração in-place, o rollback consiste em:
            </p>
            <ul className="text-sm text-amber-800 space-y-1 ml-4">
              <li>1. Manter o AD DS original intacto durante todo o período de migração</li>
              <li>2. Não descomissionar o AD DS até validação completa do Samba AD</li>
              <li>3. Em caso de falha, reingressar estações no domínio original</li>
              <li>4. Reconfigurar aplicações para apontar AD DS original</li>
            </ul>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <h4 className="font-semibold text-blue-900 mb-2">Critérios de Go/No-Go</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Todas as aplicações críticas funcionando em homologação</li>
              <li>• Amostra de estações Windows ingressadas com sucesso</li>
              <li>• GPOs essenciais aplicadas ou alternativas implementadas</li>
              <li>• Equipe treinada e documentação pronta</li>
              <li>• Backup validado e processo de restore testado</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Capacitação */}
      <Card className="border border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-slate-600" />
            Capacitação da Equipe
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-slate-600">
            A equipe técnica precisará de treinamento específico em:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl">
              <h4 className="font-medium text-slate-900 mb-2">Tópicos Essenciais</h4>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Administração de Samba AD (samba-tool)</li>
                <li>• Configuração smb.conf</li>
                <li>• Gerenciamento de DNS integrado</li>
                <li>• RSAT para Windows (ADUC, GPMC)</li>
                <li>• Troubleshooting de autenticação Kerberos</li>
              </ul>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <h4 className="font-medium text-slate-900 mb-2">Recursos de Aprendizado</h4>
              <ul className="text-sm space-y-2">
                <li>
                  <a 
                    href="https://wiki.samba.org/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    Samba Wiki (Oficial) <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a 
                    href="https://samba.tranquil.it/doc/en/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    Tranquil IT Samba Docs <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.samba.org/samba/docs/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    Samba Official Docs <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}