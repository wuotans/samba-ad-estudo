import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Server, Database, Shield, CheckCircle2, AlertTriangle, 
  ExternalLink, Info, ArrowRight
} from 'lucide-react';

export default function InfraestruturaAtual() {
  const niveisAnalisados = [
    { 
      item: "Floresta AD", 
      adDs: "Multi-domínio suportado", 
      sambaAd: "Suportado", 
      status: "compatible",
      nota: "Samba suporta florestas, mas migração de floresta complexa pode ter desafios"
    },
    { 
      item: "Nível Funcional", 
      adDs: "2008 R2 a 2025", 
      sambaAd: "2008 R2 (4.19: até 2016)", 
      status: "partial",
      nota: "Samba 4.19+ começou suporte experimental a 2012 R2 e 2016"
    },
    { 
      item: "Sites e Replicação", 
      adDs: "Completo", 
      sambaAd: "Suportado", 
      status: "compatible",
      nota: "Replicação entre DCs Samba funciona adequadamente"
    },
    { 
      item: "Schema Extensions", 
      adDs: "Extensível", 
      sambaAd: "Limitado", 
      status: "partial",
      nota: "Extensões de schema de terceiros podem não ser compatíveis"
    },
    { 
      item: "UPN Suffixes", 
      adDs: "Múltiplos", 
      sambaAd: "Suportado", 
      status: "compatible",
      nota: "Sufixos UPN alternativos são suportados"
    },
    { 
      item: "Contas de Serviço (gMSA)", 
      adDs: "Completo", 
      sambaAd: "Não suportado", 
      status: "incompatible",
      nota: "Group Managed Service Accounts não são suportados no Samba"
    },
  ];

  const autenticacao = [
    { 
      protocolo: "Kerberos", 
      sambaStatus: "Totalmente suportado", 
      status: "compatible",
      doc: "https://wiki.samba.org/index.php/Samba_AD_DC_Howto"
    },
    { 
      protocolo: "NTLM", 
      sambaStatus: "Suportado (legado)", 
      status: "compatible",
      doc: "https://wiki.samba.org/index.php/NTLM_Authentication"
    },
    { 
      protocolo: "LDAP", 
      sambaStatus: "Totalmente suportado", 
      status: "compatible",
      doc: "https://wiki.samba.org/index.php/Setting_up_Samba_as_an_Active_Directory_Domain_Controller"
    },
    { 
      protocolo: "LDAPS (TLS)", 
      sambaStatus: "Totalmente suportado", 
      status: "compatible",
      doc: "https://wiki.samba.org/index.php/Configuring_LDAP_over_SSL_(LDAPS)_on_a_Samba_AD_DC"
    },
    { 
      protocolo: "SAML/SSO", 
      sambaStatus: "Via integração terceiros", 
      status: "partial",
      doc: "https://wiki.samba.org/index.php/Samba_AD_DC_Howto"
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <Card className="border-0 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <CardContent className="p-8">
          <h2 className="text-2xl font-semibold mb-4">Análise da Infraestrutura</h2>
          <p className="text-blue-100 leading-relaxed">
            Mapeamento detalhado dos componentes do AD DS atual e sua compatibilidade 
            com o Samba Active Directory, incluindo estrutura de domínio, autenticação 
            e mecanismos de segurança.
          </p>
        </CardContent>
      </Card>

      {/* Nível Funcional Alert */}
      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-amber-900 mb-2">Limitação Crítica: Nível Funcional</h3>
              <p className="text-amber-800 text-sm leading-relaxed mb-3">
                O Samba historicamente suporta apenas o nível funcional <strong>2008 R2</strong>. 
                A partir da versão <strong>4.19</strong> (setembro 2023), há suporte experimental 
                para níveis <strong>2012 R2 e 2016</strong>, mas ainda não é considerado estável 
                para produção.
              </p>
              <a 
                href="https://wiki.samba.org/index.php/Raising_the_Functional_Levels" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-amber-700 hover:text-amber-900 flex items-center gap-1 underline"
              >
                Documentação: Raising the Functional Levels <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comparativo Estrutura */}
      <Card className="border border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Server className="w-5 h-5 text-slate-600" />
            Comparativo: Estrutura de Domínio
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="font-semibold">Componente</TableHead>
                  <TableHead className="font-semibold">AD DS (Microsoft)</TableHead>
                  <TableHead className="font-semibold">Samba AD</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {niveisAnalisados.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.item}</TableCell>
                    <TableCell className="text-slate-600">{item.adDs}</TableCell>
                    <TableCell className="text-slate-600">{item.sambaAd}</TableCell>
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
                          Não Suportado
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Autenticação */}
      <Card className="border border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Shield className="w-5 h-5 text-slate-600" />
            Protocolos de Autenticação
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {autenticacao.map((item, index) => (
              <div 
                key={index} 
                className={`p-4 rounded-xl border ${
                  item.status === 'compatible' 
                    ? 'border-emerald-200 bg-emerald-50' 
                    : 'border-amber-200 bg-amber-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-slate-900">{item.protocolo}</h4>
                  {item.status === 'compatible' ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                  )}
                </div>
                <p className="text-sm text-slate-600 mb-3">{item.sambaStatus}</p>
                <a 
                  href={item.doc} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  Documentação <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Schema e Extensões */}
      <Card className="border border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Database className="w-5 h-5 text-slate-600" />
            Schema do Active Directory
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-slate-600 leading-relaxed">
            O schema do Samba AD é baseado no schema do Windows Server 2008 R2. Extensões 
            de schema adicionadas por aplicações (como Exchange, Lync/Skype, ou sistemas 
            de terceiros) podem não ser totalmente compatíveis.
          </p>
          
          <div className="bg-blue-50 p-4 rounded-xl">
            <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
              <Info className="w-4 h-4" />
              Recomendação
            </h4>
            <p className="text-sm text-blue-800">
              Antes da migração, execute um inventário completo das extensões de schema 
              presentes no AD atual usando ferramentas como <code className="bg-blue-100 px-1 rounded">ldifde</code> ou 
              <code className="bg-blue-100 px-1 rounded">Get-ADObject</code> no PowerShell.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="p-4 bg-slate-50 rounded-xl">
              <h4 className="font-medium text-slate-900 mb-2">Verificar no AD DS Atual</h4>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Classes de objeto customizadas</li>
                <li>• Atributos adicionados por aplicações</li>
                <li>• OIDs registrados</li>
                <li>• Índices de atributos</li>
              </ul>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <h4 className="font-medium text-slate-900 mb-2">Documentação Relacionada</h4>
              <ul className="text-sm space-y-2">
                <li>
                  <a 
                    href="https://wiki.samba.org/index.php/Samba_AD_schema" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    Samba AD Schema <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a 
                    href="https://learn.microsoft.com/en-us/windows/win32/ad/active-directory-schema" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    Microsoft AD Schema Reference <ExternalLink className="w-3 h-3" />
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