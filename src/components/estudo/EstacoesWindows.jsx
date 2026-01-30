import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Monitor, CheckCircle2, XCircle, AlertTriangle, 
  ExternalLink, Info, Printer, Image, Fingerprint
} from 'lucide-react';

export default function EstacoesWindows() {
  const compatibilidadeWindows = [
    { 
      item: "Windows 10 Pro (21H2+)",
      status: "compatible",
      versaoSamba: "4.15+",
      notas: "Suportado, pode requerer ajustes de registro"
    },
    { 
      item: "Windows 11 Pro (22H2)",
      status: "warning",
      versaoSamba: "4.16+",
      notas: "Suportado com Samba 4.16+, alguns ajustes necessários"
    },
    { 
      item: "Windows 11 Pro (24H2)",
      status: "warning",
      versaoSamba: "4.20+",
      notas: "Verificar atualizações Microsoft que podem afetar"
    },
    { 
      item: "Windows Server 2019",
      status: "compatible",
      versaoSamba: "4.15+",
      notas: "Suportado como member server"
    },
    { 
      item: "Windows Server 2022",
      status: "warning",
      versaoSamba: "4.20+",
      notas: "Suportado, mas com limitações conhecidas"
    },
  ];

  const funcionalidades = [
    { 
      item: "Ingresso no domínio",
      status: "ok",
      descricao: "Funciona normalmente via interface padrão do Windows"
    },
    { 
      item: "Login de usuários",
      status: "ok",
      descricao: "Autenticação Kerberos funciona corretamente"
    },
    { 
      item: "Perfis locais",
      status: "ok",
      descricao: "Perfis locais funcionam, roaming profiles com limitações"
    },
    { 
      item: "Mapeamento de unidades",
      status: "ok",
      descricao: "Via scripts de logon ou GPO de registro"
    },
    { 
      item: "Mapeamento de impressoras",
      status: "ok",
      descricao: "Via scripts de logon"
    },
    { 
      item: "BitLocker",
      status: "error",
      descricao: "Backup de chaves no AD não suportado"
    },
    { 
      item: "Windows Defender via GPO",
      status: "partial",
      descricao: "Configurações básicas via registro"
    },
    { 
      item: "Windows Firewall via GPO",
      status: "partial",
      descricao: "Configurações básicas via registro"
    },
    { 
      item: "Windows Update (WSUS)",
      status: "ok",
      descricao: "Configurável via GPO de registro"
    },
    { 
      item: "Wallpaper corporativo",
      status: "ok",
      descricao: "Via GPO de registro ou scripts"
    },
    { 
      item: "Homepage navegadores",
      status: "ok",
      descricao: "Via ADMX templates"
    },
  ];

  const aplicativosEspeciais = [
    {
      nome: "Software de impressão de crachás",
      status: "warning",
      descricao: "Depende do fabricante. Se usar AD para autenticação LDAP, deve funcionar. Se usar funcionalidades específicas do AD DS, pode falhar.",
      recomendacao: "Testar em ambiente de homologação antes da migração."
    },
    {
      nome: "Software de cadastro de biometria",
      status: "warning",
      descricao: "Sistemas que armazenam dados biométricos no AD Schema podem não ser compatíveis. Extensões de schema personalizadas podem não migrar.",
      recomendacao: "Verificar com fornecedor se suporta Samba AD ou armazenamento alternativo."
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <Card className="border-0 bg-gradient-to-r from-indigo-900 to-indigo-800 text-white">
        <CardContent className="p-8">
          <h2 className="text-2xl font-semibold mb-4">Estações de Trabalho e Servers Windows</h2>
          <p className="text-indigo-100 leading-relaxed">
            Análise detalhada da compatibilidade de estações Windows 10/11 e Windows Server 
            com o Samba Active Directory, incluindo funcionalidades e limitações conhecidas.
          </p>
        </CardContent>
      </Card>

      {/* Alerta Windows 11 */}
      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-amber-900 mb-2">Atenção: Windows 11 e Atualizações Microsoft</h3>
              <p className="text-amber-800 text-sm leading-relaxed mb-3">
                A Microsoft periodicamente lança atualizações que podem afetar a compatibilidade 
                com controladores de domínio não-Microsoft. Em julho de 2024, uma atualização 
                de segurança afetou o SMB/Samba. A equipe Samba geralmente lança correções 
                rapidamente, mas isso representa um risco operacional.
              </p>
              <div className="flex flex-wrap gap-2">
                <a 
                  href="https://samba.plus/blog/detail/important-change-in-upcoming-microsoft-update-samba-affected-fix-available-soon" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-amber-700 hover:text-amber-900 flex items-center gap-1 underline"
                >
                  SAMBA+ Blog: Microsoft Update Impact <ExternalLink className="w-3 h-3" />
                </a>
                <a 
                  href="https://learn.microsoft.com/en-us/answers/questions/1483688/samba-domain-stopped-working-on-windows-11-2024-no" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-amber-700 hover:text-amber-900 flex items-center gap-1 underline"
                >
                  Microsoft Q&A: Samba Domain Issues <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compatibilidade por Versão */}
      <Card className="border border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Monitor className="w-5 h-5 text-slate-600" />
            Compatibilidade por Versão do Windows
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="font-semibold">Sistema Operacional</TableHead>
                  <TableHead className="font-semibold">Versão Mínima Samba</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Observações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {compatibilidadeWindows.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.item}</TableCell>
                    <TableCell className="text-slate-600">{item.versaoSamba}</TableCell>
                    <TableCell>
                      {item.status === 'compatible' && (
                        <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                          <CheckCircle2 className="w-3 h-3 mr-1" /> Compatível
                        </Badge>
                      )}
                      {item.status === 'warning' && (
                        <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
                          <AlertTriangle className="w-3 h-3 mr-1" /> Verificar
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-slate-600 text-sm">{item.notas}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Funcionalidades */}
      <Card className="border border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg">Funcionalidades em Estações Windows</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-3">
            {funcionalidades.map((func, index) => (
              <div 
                key={index}
                className={`p-4 rounded-xl border ${
                  func.status === 'ok' 
                    ? 'border-emerald-200 bg-emerald-50' 
                    : func.status === 'partial'
                    ? 'border-amber-200 bg-amber-50'
                    : 'border-red-200 bg-red-50'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {func.status === 'ok' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                  {func.status === 'partial' && <AlertTriangle className="w-4 h-4 text-amber-500" />}
                  {func.status === 'error' && <XCircle className="w-4 h-4 text-red-500" />}
                  <span className="font-medium text-slate-900">{func.item}</span>
                </div>
                <p className="text-sm text-slate-600 ml-6">{func.descricao}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Aplicativos Especiais */}
      <Card className="border border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Fingerprint className="w-5 h-5 text-slate-600" />
            Aplicativos Especiais (Crachás e Biometria)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {aplicativosEspeciais.map((app, index) => (
            <div key={index} className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <h4 className="font-semibold text-amber-900">{app.nome}</h4>
              </div>
              <p className="text-sm text-amber-800 mb-3">{app.descricao}</p>
              <div className="p-3 bg-white rounded-lg">
                <p className="text-sm text-slate-700">
                  <strong>Recomendação:</strong> {app.recomendacao}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Reingresso no Domínio */}
      <Card className="border border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Info className="w-5 h-5 text-slate-600" />
            Necessidade de Reingresso no Domínio
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
            <h4 className="font-semibold text-red-900 mb-2">Migração Completa: Reingresso Necessário</h4>
            <p className="text-sm text-red-800">
              Em uma migração completa do AD DS para Samba AD (novo domínio), <strong>todas as 
              estações precisarão ser reingressadas no domínio</strong>. Isso implica:
            </p>
            <ul className="text-sm text-red-800 mt-2 space-y-1 ml-4">
              <li>• Remoção do domínio atual</li>
              <li>• Ingresso no novo domínio Samba</li>
              <li>• Recriação de perfis locais (ou migração manual)</li>
              <li>• Reconfiguração de algumas aplicações locais</li>
            </ul>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <h4 className="font-semibold text-blue-900 mb-2">Coexistência Temporária</h4>
            <p className="text-sm text-blue-800">
              Se for possível estabelecer uma relação de confiança entre os domínios (AD DS e Samba AD), 
              o reingresso pode ser gradual. No entanto, relações de confiança bidirecional entre 
              AD DS e Samba AD têm limitações conhecidas.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <a 
              href="https://wiki.samba.org/index.php/Setting_up_Samba_as_an_Active_Directory_Domain_Controller" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              Documentação: Samba AD DC Setup <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}