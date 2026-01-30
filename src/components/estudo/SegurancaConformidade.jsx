import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, Lock, CheckCircle2, AlertTriangle, XCircle,
  ExternalLink, Key, FileText, Eye, Server, RefreshCw
} from 'lucide-react';

export default function SegurancaConformidade() {
  const politicasSeguranca = [
    { 
      item: "Políticas de senha (complexidade)",
      status: "ok",
      descricao: "Configurável via samba-tool ou smb.conf"
    },
    { 
      item: "Histórico de senhas",
      status: "ok",
      descricao: "Suportado nativamente"
    },
    { 
      item: "Expiração de senha",
      status: "ok",
      descricao: "Configurável por política de domínio"
    },
    { 
      item: "Bloqueio de conta",
      status: "ok",
      descricao: "Tentativas inválidas e duração configuráveis"
    },
    { 
      item: "ACLs Windows",
      status: "ok",
      descricao: "Totalmente suportado para permissões NTFS"
    },
    { 
      item: "Auditoria de eventos",
      status: "partial",
      descricao: "Logs disponíveis, mas menos detalhados que AD DS"
    },
    { 
      item: "Fine-Grained Password Policies",
      status: "partial",
      descricao: "Suporte limitado em versões recentes"
    },
  ];

  const aspectosConformidade = [
    {
      norma: "LGPD",
      impacto: "Médio",
      descricao: "Garantir que logs de acesso e dados pessoais sejam tratados adequadamente. Samba suporta logging configurável.",
      recomendacao: "Configurar retenção de logs e acesso restrito aos dados de diretório."
    },
    {
      norma: "ISO 27001",
      impacto: "Médio",
      descricao: "Requer controles de acesso, auditoria e gestão de identidades. Samba atende parcialmente.",
      recomendacao: "Documentar controles compensatórios para funcionalidades não suportadas."
    },
    {
      norma: "Políticas Institucionais",
      impacto: "Variável",
      descricao: "Depende dos requisitos específicos da organização.",
      recomendacao: "Mapear requisitos e verificar cobertura do Samba AD."
    },
  ];

  const altaDisponibilidade = [
    {
      item: "Replicação entre DCs",
      status: "ok",
      descricao: "Suportado nativamente entre múltiplos Samba AD DCs"
    },
    {
      item: "SYSVOL Replication",
      status: "partial",
      descricao: "Requer configuração manual (rsync ou sysvol-replicate)"
    },
    {
      item: "Balanceamento de carga",
      status: "ok",
      descricao: "Possível via DNS round-robin ou load balancer"
    },
    {
      item: "Backup do diretório",
      status: "ok",
      descricao: "samba-tool domain backup disponível"
    },
    {
      item: "Restore/DR",
      status: "ok",
      descricao: "Procedimentos documentados para recuperação"
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <Card className="border-0 bg-gradient-to-r from-emerald-900 to-emerald-800 text-white">
        <CardContent className="p-8">
          <h2 className="text-2xl font-semibold mb-4">Segurança e Conformidade</h2>
          <p className="text-emerald-100 leading-relaxed">
            Análise das capacidades de segurança do Samba AD, políticas de senha, 
            auditoria, conformidade regulatória e procedimentos de alta disponibilidade 
            e recuperação de desastres.
          </p>
        </CardContent>
      </Card>

      {/* Políticas de Segurança */}
      <Card className="border border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Lock className="w-5 h-5 text-slate-600" />
            Políticas de Segurança
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-3">
            {politicasSeguranca.map((item, index) => (
              <div 
                key={index}
                className={`p-4 rounded-xl border ${
                  item.status === 'ok' 
                    ? 'border-emerald-200 bg-emerald-50' 
                    : 'border-amber-200 bg-amber-50'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {item.status === 'ok' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                  )}
                  <span className="font-medium text-slate-900">{item.item}</span>
                </div>
                <p className="text-sm text-slate-600 ml-6">{item.descricao}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-slate-50 rounded-xl">
            <h4 className="font-medium text-slate-900 mb-2">Configuração de Políticas de Senha</h4>
            <div className="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <p className="text-slate-400"># Exemplo usando samba-tool</p>
              <p className="mt-2">samba-tool domain passwordsettings set \</p>
              <p className="ml-4">--complexity=on \</p>
              <p className="ml-4">--min-pwd-length=12 \</p>
              <p className="ml-4">--min-pwd-age=1 \</p>
              <p className="ml-4">--max-pwd-age=90 \</p>
              <p className="ml-4">--history-length=24 \</p>
              <p className="ml-4">--account-lockout-threshold=5</p>
            </div>
            <a 
              href="https://wiki.samba.org/index.php/Password_Settings_Objects" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1 mt-3"
            >
              Documentação: Password Settings Objects <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </CardContent>
      </Card>

      {/* LDAPS e Kerberos */}
      <Card className="border border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Key className="w-5 h-5 text-slate-600" />
            Criptografia e Protocolos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <h4 className="font-semibold text-emerald-900">LDAPS (TLS)</h4>
              </div>
              <p className="text-sm text-emerald-800 mb-3">
                Totalmente suportado. Requer configuração de certificados no smb.conf.
              </p>
              <a 
                href="https://wiki.samba.org/index.php/Configuring_LDAP_over_SSL_(LDAPS)_on_a_Samba_AD_DC" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
              >
                Documentação <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <h4 className="font-semibold text-emerald-900">Kerberos</h4>
              </div>
              <p className="text-sm text-emerald-800 mb-3">
                MIT Kerberos integrado. Suporta autenticação segura para Windows e Linux.
              </p>
              <a 
                href="https://wiki.samba.org/index.php/Samba_AD_DC_Howto" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
              >
                Documentação <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Hardening Recomendado
            </h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Usar certificados de CA confiável (não auto-assinados) para LDAPS</li>
              <li>• Desabilitar NTLM quando possível, preferir Kerberos</li>
              <li>• Configurar SMB signing obrigatório</li>
              <li>• Manter Samba atualizado com patches de segurança</li>
              <li>• Hardening do sistema operacional Linux (SELinux/AppArmor)</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Conformidade */}
      <Card className="border border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <FileText className="w-5 h-5 text-slate-600" />
            Conformidade Regulatória
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {aspectosConformidade.map((item, index) => (
            <div key={index} className="p-4 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <Badge variant="outline" className="border-slate-300">
                  {item.norma}
                </Badge>
                <Badge className={
                  item.impacto === 'Baixo' 
                    ? 'bg-emerald-100 text-emerald-700' 
                    : 'bg-amber-100 text-amber-700'
                }>
                  Impacto {item.impacto}
                </Badge>
              </div>
              <p className="text-sm text-slate-600 mb-2">{item.descricao}</p>
              <p className="text-sm text-slate-700">
                <strong>Recomendação:</strong> {item.recomendacao}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Auditoria */}
      <Card className="border border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Eye className="w-5 h-5 text-slate-600" />
            Auditoria e Logs
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <h4 className="font-semibold text-amber-900">Limitação</h4>
            </div>
            <p className="text-sm text-amber-800">
              Os logs de auditoria do Samba são menos detalhados que os Event Logs 
              do Windows AD DS. Eventos como alterações de grupo, criação de usuários 
              e tentativas de login são registrados, mas a granularidade é menor.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl">
            <h4 className="font-medium text-slate-900 mb-2">Configuração de Logging</h4>
            <div className="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <p className="text-slate-400"># Em smb.conf - seção [global]</p>
              <p className="mt-2">log level = 3 auth_audit:5</p>
              <p>log file = /var/log/samba/log.%m</p>
              <p>max log size = 50000</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alta Disponibilidade */}
      <Card className="border border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-slate-600" />
            Alta Disponibilidade e Recuperação de Desastres
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-3 mb-6">
            {altaDisponibilidade.map((item, index) => (
              <div 
                key={index}
                className={`p-4 rounded-xl border ${
                  item.status === 'ok' 
                    ? 'border-emerald-200 bg-emerald-50' 
                    : 'border-amber-200 bg-amber-50'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {item.status === 'ok' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                  )}
                  <span className="font-medium text-slate-900">{item.item}</span>
                </div>
                <p className="text-sm text-slate-600 ml-6">{item.descricao}</p>
              </div>
            ))}
          </div>

          <div className="p-4 bg-slate-50 rounded-xl">
            <h4 className="font-medium text-slate-900 mb-2">Backup e Restore</h4>
            <div className="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <p className="text-slate-400"># Backup do domínio</p>
              <p>samba-tool domain backup online --targetdir=/backup/samba</p>
              <p className="mt-3 text-slate-400"># Restore</p>
              <p>samba-tool domain backup restore --backup-file=/backup/file.tar.bz2</p>
            </div>
            <a 
              href="https://wiki.samba.org/index.php/Back_up_and_Restoring_a_Samba_AD_DC" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1 mt-3"
            >
              Documentação: Backup and Restore <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}