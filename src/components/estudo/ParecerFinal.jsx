import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, CheckCircle2, XCircle, FileText,
  ExternalLink, Scale, ArrowRight, Info
} from 'lucide-react';

export default function ParecerFinal() {
  const criteriosAvaliacao = [
    { criterio: "Compatibilidade de Autenticação (LDAP/Kerberos)", nota: 9, max: 10, status: "ok" },
    { criterio: "Suporte a Estações Windows 10/11", nota: 7, max: 10, status: "partial" },
    { criterio: "Compatibilidade de GPO", nota: 4, max: 10, status: "warning" },
    { criterio: "Integração com Aplicações Existentes", nota: 8, max: 10, status: "ok" },
    { criterio: "Segurança e Conformidade", nota: 7, max: 10, status: "partial" },
    { criterio: "Alta Disponibilidade", nota: 8, max: 10, status: "ok" },
    { criterio: "Escalabilidade", nota: 7, max: 10, status: "partial" },
    { criterio: "Maturidade da Solução", nota: 6, max: 10, status: "partial" },
    { criterio: "Suporte e Comunidade", nota: 7, max: 10, status: "partial" },
    { criterio: "Custo Total de Propriedade", nota: 9, max: 10, status: "ok" },
  ];

  const pontuacaoTotal = criteriosAvaliacao.reduce((acc, c) => acc + c.nota, 0);
  const pontuacaoMaxima = criteriosAvaliacao.reduce((acc, c) => acc + c.max, 0);
  const percentual = Math.round((pontuacaoTotal / pontuacaoMaxima) * 100);

  const conclusoes = [
    {
      tipo: "positivo",
      texto: "O Samba AD é uma alternativa tecnicamente viável para ambientes que buscam redução de custos com licenciamento Microsoft."
    },
    {
      tipo: "positivo",
      texto: "A maioria das aplicações que usam LDAP padrão (Nextcloud, GLPI, Moodle, etc.) funcionará sem grandes alterações."
    },
    {
      tipo: "positivo",
      texto: "Autenticação Kerberos e LDAPS são totalmente suportados, garantindo segurança adequada."
    },
    {
      tipo: "negativo",
      texto: "As limitações de GPO são significativas e exigirão soluções alternativas (scripts, ferramentas de terceiros)."
    },
    {
      tipo: "negativo",
      texto: "O risco de atualizações do Windows quebrarem compatibilidade é real e requer monitoramento constante."
    },
    {
      tipo: "negativo",
      texto: "A equipe precisará de capacitação específica em Linux/Samba, o que representa um investimento adicional."
    },
    {
      tipo: "negativo",
      texto: "Aplicações que dependem de funcionalidades específicas do AD DS (BitLocker, gMSA, LAPS) não funcionarão."
    },
    {
      tipo: "atencao",
      texto: "Softwares de biometria e impressão de crachás precisam ser testados individualmente."
    },
  ];

  const recomendacaoFinal = {
    parecer: "Viável com Restrições Significativas",
    cor: "amber",
    descricao: `A migração do Microsoft AD DS para Samba Active Directory é tecnicamente possível, 
    mas apresenta restrições importantes que devem ser cuidadosamente avaliadas. 
    A decisão deve considerar o trade-off entre economia de licenciamento e as limitações funcionais.`
  };

  const proximosPassos = [
    "Realizar inventário detalhado das GPOs em uso e classificá-las por criticidade",
    "Identificar alternativas para cada GPO não compatível",
    "Montar ambiente de homologação completo",
    "Testar TODAS as aplicações que dependem do AD",
    "Testar softwares especiais (biometria, crachás) com o fornecedor",
    "Definir critérios claros de Go/No-Go",
    "Capacitar equipe técnica em Samba AD",
    "Preparar plano de rollback detalhado",
  ];

  const documentacaoPrincipal = [
    { titulo: "Samba Wiki - AD DC Setup", url: "https://wiki.samba.org/index.php/Setting_up_Samba_as_an_Active_Directory_Domain_Controller" },
    { titulo: "Samba Wiki - Group Policy", url: "https://wiki.samba.org/index.php/Group_Policy" },
    { titulo: "Samba Wiki - LDAPS Configuration", url: "https://wiki.samba.org/index.php/Configuring_LDAP_over_SSL_(LDAPS)_on_a_Samba_AD_DC" },
    { titulo: "Samba Wiki - Backup and Restore", url: "https://wiki.samba.org/index.php/Back_up_and_Restoring_a_Samba_AD_DC" },
    { titulo: "Samba Wiki - Functional Levels", url: "https://wiki.samba.org/index.php/Raising_the_Functional_Levels" },
    { titulo: "Tranquil IT - Samba Documentation", url: "https://samba.tranquil.it/doc/en/" },
    { titulo: "Red Hat - Samba Documentation", url: "https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html/configuring_and_using_network_file_services/assembly_using-samba-as-a-server_configuring-and-using-network-file-services" },
    { titulo: "Nextcloud - LDAP Documentation", url: "https://docs.nextcloud.com/server/stable/admin_manual/configuration_user/user_auth_ldap.html" },
    { titulo: "GLPI - LDAP Documentation", url: "https://glpi-user-documentation.readthedocs.io/fr/latest/modules/configuration/authentication/ldap.html" },
    { titulo: "Moodle - LDAP Authentication", url: "https://docs.moodle.org/en/LDAP_authentication" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <Card className="border-0 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <CardContent className="p-8">
          <h2 className="text-2xl font-semibold mb-4">Parecer Final</h2>
          <p className="text-slate-300 leading-relaxed">
            Conclusão consolidada do estudo de viabilidade, incluindo avaliação 
            quantitativa, recomendações e próximos passos sugeridos.
          </p>
        </CardContent>
      </Card>

      {/* Parecer Principal */}
      <Card className={`border-2 border-amber-400 bg-amber-50`}>
        <CardContent className="p-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-amber-100 rounded-xl">
              <Scale className="w-8 h-8 text-amber-600" />
            </div>
            <div>
              <Badge className="bg-amber-500 text-white mb-2">
                {recomendacaoFinal.parecer}
              </Badge>
              <h3 className="text-xl font-semibold text-amber-900">
                Conclusão do Estudo
              </h3>
            </div>
          </div>
          <p className="text-amber-800 leading-relaxed">
            {recomendacaoFinal.descricao}
          </p>
        </CardContent>
      </Card>

      {/* Pontuação */}
      <Card className="border border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg flex items-center justify-between">
            <span>Avaliação Quantitativa</span>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-slate-900">{pontuacaoTotal}</span>
              <span className="text-slate-500">/ {pontuacaoMaxima}</span>
              <Badge className={
                percentual >= 80 ? 'bg-emerald-100 text-emerald-700' :
                percentual >= 60 ? 'bg-amber-100 text-amber-700' :
                'bg-red-100 text-red-700'
              }>
                {percentual}%
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {criteriosAvaliacao.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-slate-700">{item.criterio}</span>
                    <span className="text-sm text-slate-500">{item.nota}/{item.max}</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        item.nota >= 8 ? 'bg-emerald-500' :
                        item.nota >= 6 ? 'bg-amber-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${(item.nota / item.max) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Conclusões */}
      <Card className="border border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg">Conclusões Principais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {conclusoes.map((item, index) => (
            <div 
              key={index}
              className={`p-4 rounded-xl flex items-start gap-3 ${
                item.tipo === 'positivo' ? 'bg-emerald-50 border border-emerald-200' :
                item.tipo === 'negativo' ? 'bg-red-50 border border-red-200' :
                'bg-amber-50 border border-amber-200'
              }`}
            >
              {item.tipo === 'positivo' && <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />}
              {item.tipo === 'negativo' && <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />}
              {item.tipo === 'atencao' && <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />}
              <p className={`text-sm ${
                item.tipo === 'positivo' ? 'text-emerald-800' :
                item.tipo === 'negativo' ? 'text-red-800' :
                'text-amber-800'
              }`}>
                {item.texto}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Cenários de Decisão */}
      <Card className="border border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <ArrowRight className="w-5 h-5 text-slate-600" />
            Cenários de Decisão
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
            <h4 className="font-semibold text-emerald-900 mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              Recomendado se:
            </h4>
            <ul className="text-sm text-emerald-800 space-y-1 ml-7">
              <li>• O custo de licenciamento é um fator crítico</li>
              <li>• As GPOs em uso são relativamente simples</li>
              <li>• A equipe tem ou pode adquirir expertise em Linux</li>
              <li>• Não há dependência forte de BitLocker gerenciado por AD</li>
              <li>• Há tempo e recursos para um projeto de migração completo</li>
            </ul>
          </div>

          <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
            <h4 className="font-semibold text-red-900 mb-2 flex items-center gap-2">
              <XCircle className="w-5 h-5" />
              Não recomendado se:
            </h4>
            <ul className="text-sm text-red-800 space-y-1 ml-7">
              <li>• Há uso intensivo de GPOs avançadas ou Group Policy Preferences</li>
              <li>• BitLocker com backup de chaves no AD é mandatório</li>
              <li>• Há aplicações que dependem de extensões de schema específicas</li>
              <li>• A equipe não tem capacidade para manter infraestrutura Linux</li>
              <li>• O risco de incompatibilidades é inaceitável para o negócio</li>
            </ul>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
              <Info className="w-5 h-5" />
              Alternativa a considerar:
            </h4>
            <p className="text-sm text-blue-800">
              Manter o AD DS para estações Windows e serviços críticos, e utilizar 
              Samba como file server e para serviços Linux específicos. Essa abordagem 
              híbrida pode oferecer o melhor dos dois mundos.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Próximos Passos */}
      <Card className="border border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg">Próximos Passos Recomendados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-3">
            {proximosPassos.map((passo, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center">
                  {index + 1}
                </div>
                <span className="text-sm text-slate-700">{passo}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Documentação */}
      <Card className="border border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <FileText className="w-5 h-5 text-slate-600" />
            Documentação de Referência
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-2">
            {documentacaoPrincipal.map((doc, index) => (
              <a
                key={index}
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-slate-50 rounded-lg text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 flex items-center justify-between transition-colors"
              >
                <span>{doc.titulo}</span>
                <ExternalLink className="w-4 h-4 flex-shrink-0" />
              </a>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <Card className="border border-slate-200 bg-slate-50">
        <CardContent className="p-6">
          <p className="text-xs text-slate-500 text-center">
            Este documento é um estudo técnico de viabilidade e não constitui 
            garantia de funcionamento. A decisão final deve ser baseada em testes 
            práticos no ambiente específico da organização. Recomenda-se consultar 
            a documentação oficial do Samba e, se necessário, contratar consultoria 
            especializada para o projeto de migração.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}