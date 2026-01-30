import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  FileText, CheckCircle2, XCircle, AlertTriangle, 
  ExternalLink, Info, Settings, Monitor
} from 'lucide-react';

export default function AnaliseGPO() {
  const gpoCompatibilidade = [
    { 
      categoria: "Políticas de Senha",
      exemplos: "Complexidade, histórico, expiração",
      status: "compatible",
      notas: "Configurável via samba-tool ou RSAT"
    },
    { 
      categoria: "Bloqueio de Conta",
      exemplos: "Tentativas, duração do bloqueio",
      status: "compatible",
      notas: "Suportado nativamente"
    },
    { 
      categoria: "Scripts de Logon (Batch/VBS)",
      exemplos: "Mapeamento drives, impressoras",
      status: "compatible",
      notas: "Funcionam para clientes Windows"
    },
    { 
      categoria: "Scripts PowerShell",
      exemplos: "Automação complexa",
      status: "partial",
      notas: "Podem funcionar, mas sem garantia total"
    },
    { 
      categoria: "Mapeamento de Unidades",
      exemplos: "Drive Mappings via GPP",
      status: "partial",
      notas: "Group Policy Preferences têm suporte limitado"
    },
    { 
      categoria: "Instalação de Software (MSI)",
      exemplos: "Deploy de aplicações",
      status: "incompatible",
      notas: "Não suportado - usar SCCM/PDQ/similar"
    },
    { 
      categoria: "Windows Defender Policies",
      exemplos: "Exclusões, configurações AV",
      status: "partial",
      notas: "Políticas básicas podem funcionar via registry"
    },
    { 
      categoria: "BitLocker Management",
      exemplos: "Recuperação de chaves, enforcement",
      status: "incompatible",
      notas: "Requer AD DS para backup de chaves"
    },
    { 
      categoria: "Windows Firewall",
      exemplos: "Regras, perfis de rede",
      status: "partial",
      notas: "Políticas básicas via registry"
    },
    { 
      categoria: "Windows Update (WSUS)",
      exemplos: "Configuração de updates",
      status: "partial",
      notas: "Políticas de registry funcionam"
    },
    { 
      categoria: "Folder Redirection",
      exemplos: "Documentos, Desktop para rede",
      status: "partial",
      notas: "Limitado - requer testes"
    },
    { 
      categoria: "AppLocker/WDAC",
      exemplos: "Controle de aplicações",
      status: "incompatible",
      notas: "Depende de funcionalidades AD DS específicas"
    },
    { 
      categoria: "Preferências de Impressora",
      exemplos: "Deploy de impressoras",
      status: "partial",
      notas: "Scripts de logon como alternativa"
    },
    { 
      categoria: "Restrições de Desktop",
      exemplos: "Painel de controle, CMD",
      status: "compatible",
      notas: "Políticas de registro funcionam"
    },
    { 
      categoria: "ADMX Templates Customizados",
      exemplos: "Chrome, Office, Adobe",
      status: "compatible",
      notas: "Funcionam se aplicam registry"
    },
    { 
      categoria: "Wallpaper/Personalização",
      exemplos: "Papel de parede corporativo",
      status: "compatible",
      notas: "Via políticas de registro"
    },
    { 
      categoria: "Homepage Navegadores",
      exemplos: "Página inicial padrão",
      status: "compatible",
      notas: "Via ADMX do navegador"
    },
  ];

  const estatisticas = {
    compativeis: gpoCompatibilidade.filter(g => g.status === 'compatible').length,
    parciais: gpoCompatibilidade.filter(g => g.status === 'partial').length,
    incompativeis: gpoCompatibilidade.filter(g => g.status === 'incompatible').length,
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <Card className="border-0 bg-gradient-to-r from-purple-900 to-purple-800 text-white">
        <CardContent className="p-8">
          <h2 className="text-2xl font-semibold mb-4">Análise de Group Policy Objects (GPO)</h2>
          <p className="text-purple-100 leading-relaxed">
            Avaliação detalhada da compatibilidade das políticas de grupo do Windows 
            com o Samba Active Directory. As GPOs são um dos pontos mais críticos 
            da migração.
          </p>
        </CardContent>
      </Card>

      {/* Alerta Importante */}
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-red-900 mb-2">Limitação Fundamental do Samba AD</h3>
              <p className="text-red-800 text-sm leading-relaxed mb-3">
                O Samba AD <strong>armazena e replica GPOs</strong>, mas não as <strong>processa 
                nem aplica</strong> em clientes Linux. Apenas clientes Windows conseguem processar 
                as políticas. Políticas que dependem de funcionalidades específicas do AD DS 
                da Microsoft (como LAPS, BitLocker, gMSA) não funcionarão.
              </p>
              <a 
                href="https://wiki.samba.org/index.php/Group_Policy" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-red-700 hover:text-red-900 flex items-center gap-1 underline"
              >
                Documentação: Samba Group Policy <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="border-emerald-200 bg-emerald-50">
          <CardContent className="p-6 text-center">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
            <p className="text-3xl font-bold text-emerald-700">{estatisticas.compativeis}</p>
            <p className="text-sm text-emerald-600">Totalmente Compatíveis</p>
          </CardContent>
        </Card>
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="p-6 text-center">
            <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
            <p className="text-3xl font-bold text-amber-700">{estatisticas.parciais}</p>
            <p className="text-sm text-amber-600">Parcialmente Compatíveis</p>
          </CardContent>
        </Card>
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6 text-center">
            <XCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <p className="text-3xl font-bold text-red-700">{estatisticas.incompativeis}</p>
            <p className="text-sm text-red-600">Não Suportadas</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabela Completa */}
      <Card className="border border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <FileText className="w-5 h-5 text-slate-600" />
            Matriz de Compatibilidade GPO
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="font-semibold">Categoria</TableHead>
                  <TableHead className="font-semibold">Exemplos</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Observações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {gpoCompatibilidade.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.categoria}</TableCell>
                    <TableCell className="text-slate-600 text-sm">{item.exemplos}</TableCell>
                    <TableCell>
                      {item.status === 'compatible' && (
                        <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                          <CheckCircle2 className="w-3 h-3 mr-1" /> Compatível
                        </Badge>
                      )}
                      {item.status === 'partial' && (
                        <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
                          <AlertTriangle className="w-3 h-3 mr-1" /> Parcial
                        </Badge>
                      )}
                      {item.status === 'incompatible' && (
                        <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                          <XCircle className="w-3 h-3 mr-1" /> Não Suportado
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

      {/* Recomendações */}
      <Card className="border border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Settings className="w-5 h-5 text-slate-600" />
            Estratégias de Mitigação para GPOs Não Suportadas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl">
              <h4 className="font-medium text-slate-900 mb-2">Para Deploy de Software</h4>
              <p className="text-sm text-slate-600">
                Utilizar ferramentas como PDQ Deploy, SCCM, Ansible, ou scripts 
                de inicialização para instalação automatizada de software.
              </p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <h4 className="font-medium text-slate-900 mb-2">Para BitLocker</h4>
              <p className="text-sm text-slate-600">
                Implementar solução de gerenciamento de criptografia separada 
                ou manter o backup de chaves em local seguro manualmente.
              </p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <h4 className="font-medium text-slate-900 mb-2">Para GPO Preferences</h4>
              <p className="text-sm text-slate-600">
                Substituir por scripts de logon (batch, PowerShell) ou 
                ferramentas de automação como Ansible/Puppet.
              </p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <h4 className="font-medium text-slate-900 mb-2">Para RSAT/Gerenciamento</h4>
              <p className="text-sm text-slate-600">
                Manter uma estação Windows com RSAT instalado para gerenciar 
                GPOs. O Samba é totalmente compatível com GPMC.
              </p>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-xl mt-4">
            <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
              <Info className="w-4 h-4" />
              Documentação Adicional
            </h4>
            <ul className="text-sm text-blue-800 space-y-2">
              <li>
                <a 
                  href="https://wiki.samba.org/index.php/Group_Policy" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-blue-900 flex items-center gap-1"
                >
                  Samba Wiki: Configuring Group Policy <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://samba.tranquil.it/doc/en/samba_fundamentals-about_gpo.html" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-blue-900 flex items-center gap-1"
                >
                  Tranquil IT: About GPOs in Samba <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/10/html/configuring_and_using_network_file_services/using-samba-as-a-server" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-blue-900 flex items-center gap-1"
                >
                  Red Hat: Using Samba as a Server <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}