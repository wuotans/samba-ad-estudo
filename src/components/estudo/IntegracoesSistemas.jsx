import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Globe, CheckCircle2, AlertTriangle, ExternalLink, 
  Cloud, Database, Shield, HardDrive, Server
} from 'lucide-react';

export default function IntegracoesSistemas() {
  const integracoes = [
    {
      nome: "Nextcloud",
      icon: Cloud,
      status: "compatible",
      funcionalidades: [
        { item: "Autenticação LDAPS", status: "ok", nota: "Totalmente suportado" },
        { item: "Sincronização usuários/grupos", status: "ok", nota: "Funciona normalmente" },
        { item: "Mapeamento de atributos", status: "warning", nota: "Verificar atributos específicos (mail, displayName)" },
        { item: "Perfis existentes", status: "ok", nota: "Mantidos se o username não mudar" },
        { item: "Permissões de arquivos", status: "ok", nota: "Baseadas em grupos AD funcionam" },
      ],
      docs: [
        { titulo: "Nextcloud LDAP Documentation", url: "https://docs.nextcloud.com/server/stable/admin_manual/configuration_user/user_auth_ldap.html" },
      ],
      recomendacoes: "Configurar corretamente o Base DN, User Filter e Login Attribute (sAMAccountName ou userPrincipalName)."
    },
    {
      nome: "GLPI",
      icon: Database,
      status: "compatible",
      funcionalidades: [
        { item: "Autenticação LDAPS", status: "ok", nota: "Suportado" },
        { item: "Importação de usuários", status: "ok", nota: "Funciona via sincronização" },
        { item: "Mapeamento de grupos/perfis", status: "ok", nota: "Configurável" },
        { item: "Inventário", status: "ok", nota: "Independente do AD" },
        { item: "Plugins", status: "ok", nota: "Não afetados" },
      ],
      docs: [
        { titulo: "GLPI LDAP Setup", url: "https://help.glpi-project.org/tutorials/authentication/setup_ldap" },
        { titulo: "GLPI LDAP Documentation", url: "https://glpi-user-documentation.readthedocs.io/fr/latest/modules/configuration/authentication/ldap.html" },
      ],
      recomendacoes: "Usar filtro de conexão para ocultar usuários desativados. Testar sincronização em ambiente de homologação."
    },
    {
      nome: "Moodle",
      icon: Globe,
      status: "compatible",
      funcionalidades: [
        { item: "Autenticação LDAPS", status: "ok", nota: "Suportado nativamente" },
        { item: "Sincronização de usuários", status: "ok", nota: "Funciona" },
        { item: "Cursos via grupos", status: "warning", nota: "Requer configuração específica" },
        { item: "Atributos obrigatórios", status: "ok", nota: "sAMAccountName, mail funcionam" },
      ],
      docs: [
        { titulo: "Moodle LDAP Authentication", url: "https://docs.moodle.org/en/LDAP_authentication" },
        { titulo: "Moodle Active Directory", url: "https://docs.moodle.org/en/Active_Directory" },
      ],
      recomendacoes: "Definir corretamente o User Attribute (sAMAccountName) e testar sincronização de grupos."
    },
    {
      nome: "TacticalRMM",
      icon: Monitor,
      status: "warning",
      funcionalidades: [
        { item: "Autenticação LDAP/AD", status: "warning", nota: "Não possui integração LDAP nativa - usa autenticação local ou SSO/OIDC" },
        { item: "SSO (Single Sign-On)", status: "ok", nota: "Suporta OIDC providers (Keycloak, Authentik, Azure AD)" },
        { item: "Agentes em máquinas", status: "ok", nota: "Independente do AD - comunicação via API/WebSocket" },
        { item: "Listagem de máquinas AD", status: "warning", nota: "Não lista automaticamente do AD - requer deploy manual de agentes" },
        { item: "Políticas via AD", status: "warning", nota: "Não suportado - usa políticas internas do RMM" },
      ],
      docs: [
        { titulo: "TacticalRMM Documentation", url: "https://docs.tacticalrmm.com/" },
        { titulo: "TacticalRMM SSO Configuration", url: "https://docs.tacticalrmm.com/ee/sso/sso/" },
        { titulo: "GitHub Issue - SSO/LDAP Request", url: "https://github.com/amidaware/tacticalrmm/issues/508" },
      ],
      recomendacoes: "TacticalRMM não possui integração LDAP nativa. Para SSO, configure um provedor OIDC (Keycloak, Authentik) que se integre ao Samba AD via LDAP. Os agentes funcionam independentemente do AD."
    },
    {
      nome: "Check Point (Firewall)",
      icon: Shield,
      status: "warning",
      funcionalidades: [
        { item: "LDAP Account Unit", status: "ok", nota: "Suportado - Samba AD funciona como servidor LDAP padrão" },
        { item: "Identity Awareness (AD Query)", status: "warning", nota: "AD Query usa WMI/Event Log do Windows DC - não funciona com Samba" },
        { item: "Identity Awareness (LDAP)", status: "ok", nota: "Modo LDAP funciona com Samba AD" },
        { item: "Mapeamento de usuários", status: "ok", nota: "Via consultas LDAP ao Samba AD" },
        { item: "Mapeamento de grupos", status: "ok", nota: "Grupos do AD são reconhecidos" },
        { item: "LDAPS (porta 636)", status: "ok", nota: "Suportado - requer certificado configurado no Samba" },
        { item: "Captive Portal", status: "ok", nota: "Autenticação LDAP funciona" },
      ],
      docs: [
        { titulo: "Check Point Identity Awareness Admin Guide", url: "https://sc1.checkpoint.com/documents/R81.10/WebAdminGuides/EN/CP_R81.10_IdentityAwareness_AdminGuide/Topics-IDAG/Configuring-Identity-Sources-Configuring-AD-Query.htm" },
        { titulo: "Check Point LDAPS Configuration", url: "https://community.checkpoint.com/t5/Management/Using-LDAPS-636-for-AD-query-Identity-Awareness/td-p/185650" },
        { titulo: "Check Point Large Scale Deployment", url: "https://support.checkpoint.com/results/sk/sk88520" },
      ],
      recomendacoes: "IMPORTANTE: O recurso 'AD Query' do Identity Awareness NÃO funciona com Samba (requer WMI do Windows). Use o modo 'LDAP Servers' para integração. Configure LDAP Account Unit apontando para Samba AD DC. Testar todas as regras baseadas em identidade antes da migração."
    },
    {
      nome: "Veeam Backup & Replication",
      icon: HardDrive,
      status: "compatible",
      funcionalidades: [
        { item: "Repositório SMB/CIFS", status: "ok", nota: "Funciona com shares Samba usando credenciais AD" },
        { item: "Backup de File Shares SMB", status: "ok", nota: "Suportado - Samba File Server é compatível" },
        { item: "Autenticação da conta de serviço", status: "ok", nota: "Credenciais do Samba AD funcionam normalmente" },
        { item: "ACLs e permissões NTFS", status: "ok", nota: "Samba suporta ACLs Windows em shares" },
        { item: "Backup de AD DS", status: "error", nota: "Application-aware backup do AD DS não se aplica ao Samba" },
        { item: "Jobs de backup existentes", status: "ok", nota: "Continuam funcionando se credenciais forem válidas no novo AD" },
      ],
      docs: [
        { titulo: "Veeam - SMB File Share Backup", url: "https://helpcenter.veeam.com/docs/vbr/userguide/smb_share.html" },
        { titulo: "Veeam - Adding SMB Repositories", url: "https://helpcenter.veeam.com/docs/vbr/userguide/smb_repository_add.html" },
        { titulo: "Veeam - SMB Credentials Configuration", url: "https://helpcenter.veeam.com/docs/vbr/userguide/file_share_backup_smb_share_path_credentials.html" },
      ],
      recomendacoes: "Os jobs de backup para shares SMB continuarão funcionando se: 1) A conta de serviço do Veeam existir no Samba AD com as mesmas credenciais, 2) As permissões nos shares forem mantidas. Recriar a conta de serviço no Samba AD ou atualizar as credenciais nos jobs. ATENÇÃO: Veeam não recomenda repositórios SMB para backups críticos devido a questões de confiabilidade do protocolo."
    },
    {
      nome: "Zadara Storage (VPSA)",
      icon: Server,
      status: "compatible",
      funcionalidades: [
        { item: "Integração Active Directory", status: "ok", nota: "VPSA pode ser ingressado em domínio AD - funciona com Samba AD" },
        { item: "Integração LDAP", status: "ok", nota: "Suporte nativo a LDAP para autenticação de usuários NAS" },
        { item: "Shares SMB/CIFS", status: "ok", nota: "Totalmente compatível com Samba AD para autenticação" },
        { item: "Permissões baseadas em grupos AD", status: "ok", nota: "Grupos do Samba AD são reconhecidos para ACLs" },
        { item: "NAS Users via LDAP", status: "ok", nota: "Usuários podem autenticar usando credenciais do diretório" },
        { item: "Kerberos", status: "ok", nota: "Suportado quando ingressado no domínio" },
      ],
      docs: [
        { titulo: "Zadara VPSA - Active Directory Integration", url: "https://guides.zadarastorage.com/vpsa-guide/latest/active-directory.html" },
        { titulo: "Zadara VPSA - LDAP Integration", url: "https://guides.zadarastorage.com/vpsa-guide/latest/ldap.html" },
        { titulo: "Zadara VPSA - NAS Users and Groups", url: "https://guides.zadarastorage.com/vpsa-guide/latest/nas-users-and-groups.html" },
      ],
      recomendacoes: "Zadara VPSA suporta tanto ingresso em domínio AD quanto integração LDAP standalone. Para migração: 1) Remover VPSA do domínio AD DS atual, 2) Ingressar no novo domínio Samba AD, 3) Verificar se permissões de shares são mantidas (podem precisar ser recriadas se SIDs mudarem). Testar acesso aos shares após migração."
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <Card className="border-0 bg-gradient-to-r from-teal-900 to-teal-800 text-white">
        <CardContent className="p-8">
          <h2 className="text-2xl font-semibold mb-4">Integração com Sistemas e Aplicações</h2>
          <p className="text-teal-100 leading-relaxed">
            Análise de compatibilidade dos sistemas que atualmente utilizam LDAP/LDAPS 
            para autenticação com o Microsoft AD DS e sua viabilidade de migração para Samba AD.
          </p>
        </CardContent>
      </Card>

      {/* Info Box */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Ponto Positivo: Compatibilidade LDAP</h3>
              <p className="text-blue-800 text-sm leading-relaxed">
                A maioria das aplicações que usam <strong>LDAP padrão</strong> para autenticação 
                funcionará com Samba AD sem alterações significativas. O Samba implementa o 
                protocolo LDAP de forma compatível com o AD DS da Microsoft.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cards de Integração */}
      <div className="grid gap-6">
        {integracoes.map((sistema, index) => (
          <Card key={index} className="border border-slate-200">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    sistema.status === 'compatible' ? 'bg-emerald-100' : 'bg-amber-100'
                  }`}>
                    <sistema.icon className={`w-5 h-5 ${
                      sistema.status === 'compatible' ? 'text-emerald-600' : 'text-amber-600'
                    }`} />
                  </div>
                  {sistema.nome}
                </CardTitle>
                <Badge className={
                  sistema.status === 'compatible' 
                    ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100' 
                    : 'bg-amber-100 text-amber-700 hover:bg-amber-100'
                }>
                  {sistema.status === 'compatible' ? 'Compatível' : 'Verificar'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Funcionalidades */}
              <div className="grid md:grid-cols-2 gap-2">
                {sistema.funcionalidades.map((func, idx) => (
                  <div 
                    key={idx} 
                    className={`p-3 rounded-lg border ${
                      func.status === 'ok' 
                        ? 'border-emerald-200 bg-emerald-50' 
                        : 'border-amber-200 bg-amber-50'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {func.status === 'ok' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-amber-500" />
                      )}
                      <span className="font-medium text-sm text-slate-900">{func.item}</span>
                    </div>
                    <p className="text-xs text-slate-600 ml-6">{func.nota}</p>
                  </div>
                ))}
              </div>

              {/* Recomendações */}
              <div className="p-4 bg-slate-50 rounded-xl">
                <h4 className="font-medium text-slate-900 mb-2 text-sm">Recomendação</h4>
                <p className="text-sm text-slate-600">{sistema.recomendacoes}</p>
              </div>

              {/* Docs */}
              {sistema.docs.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {sistema.docs.map((doc, idx) => (
                    <a
                      key={idx}
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-full"
                    >
                      {doc.titulo} <ExternalLink className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Configuração LDAPS */}
      <Card className="border border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Shield className="w-5 h-5 text-slate-600" />
            Configuração LDAPS no Samba AD
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-slate-600">
            Para garantir a segurança das comunicações LDAP, é essencial configurar 
            LDAPS (LDAP sobre TLS) no Samba AD DC.
          </p>
          
          <div className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-sm overflow-x-auto">
            <p className="text-slate-400"># Exemplo de configuração em smb.conf</p>
            <p className="mt-2">[global]</p>
            <p className="ml-4">tls enabled = yes</p>
            <p className="ml-4">tls keyfile = /etc/samba/tls/key.pem</p>
            <p className="ml-4">tls certfile = /etc/samba/tls/cert.pem</p>
            <p className="ml-4">tls cafile = /etc/samba/tls/ca.pem</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <a
              href="https://wiki.samba.org/index.php/Configuring_LDAP_over_SSL_(LDAPS)_on_a_Samba_AD_DC"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              Documentação: Configuring LDAPS on Samba AD DC <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const Monitor = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
    <line x1="8" y1="21" x2="16" y2="21"></line>
    <line x1="12" y1="17" x2="12" y2="21"></line>
  </svg>
);