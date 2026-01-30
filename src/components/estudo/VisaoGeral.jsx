import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Server, Shield, CheckCircle2, XCircle, AlertTriangle, 
  ExternalLink, DollarSign, Clock, Users, Zap
} from 'lucide-react';

export default function VisaoGeral() {
  const resumoExecutivo = [
    {
      titulo: "Nível Funcional",
      status: "warning",
      descricao: "Samba 4.19+ suporta até 2016, porém com limitações",
      doc: "https://wiki.samba.org/index.php/Raising_the_Functional_Levels"
    },
    {
      titulo: "Compatibilidade GPO",
      status: "warning",
      descricao: "Parcial - muitas políticas Windows não funcionam",
      doc: "https://wiki.samba.org/index.php/Group_Policy"
    },
    {
      titulo: "Windows 11/Server 2022",
      status: "warning",
      descricao: "Compatível com Samba 4.16+, mas com ajustes",
      doc: "https://wiki.samba.org/index.php/Setting_up_Samba_as_an_Active_Directory_Domain_Controller"
    },
    {
      titulo: "LDAPS/Kerberos",
      status: "success",
      descricao: "Totalmente suportado",
      doc: "https://wiki.samba.org/index.php/Configuring_LDAP_over_SSL_(LDAPS)_on_a_Samba_AD_DC"
    },
  ];

  const beneficios = [
    { icon: DollarSign, titulo: "Redução de Custos", descricao: "Eliminação de licenças Windows Server e CALs" },
    { icon: Shield, titulo: "Código Aberto", descricao: "Transparência e auditabilidade do código" },
    { icon: Zap, titulo: "Flexibilidade", descricao: "Customização e integração com Linux" },
  ];

  const riscos = [
    { nivel: "Alto", titulo: "GPO Limitadas", descricao: "Muitas políticas não são suportadas nativamente" },
    { nivel: "Alto", titulo: "Suporte Especializado", descricao: "Equipe precisa de conhecimento Linux/Samba" },
    { nivel: "Médio", titulo: "Windows Updates", descricao: "Atualizações Microsoft podem quebrar compatibilidade" },
    { nivel: "Médio", titulo: "Aplicações Específicas", descricao: "Softwares de biometria/crachás podem falhar" },
  ];

  return (
    <div className="space-y-8">
      {/* Header Card */}
      <Card className="border-0 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <CardContent className="p-8">
          <h2 className="text-2xl font-semibold mb-4">Resumo Executivo</h2>
          <p className="text-slate-300 leading-relaxed mb-6">
            Este estudo avalia a viabilidade técnica e operacional da migração do ambiente 
            Microsoft Active Directory Domain Services (AD DS) para uma infraestrutura baseada 
            em Samba Active Directory em sistema operacional Linux.
          </p>
          <div className="flex items-center gap-2">
            <Badge className="bg-amber-500 hover:bg-amber-600">
              <AlertTriangle className="w-3 h-3 mr-1" />
              Parecer: Viável com Restrições Significativas
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Status Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {resumoExecutivo.map((item, index) => (
          <Card key={index} className="border border-slate-200 hover:border-slate-300 transition-colors">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-medium text-slate-900">{item.titulo}</h3>
                {item.status === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                {item.status === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-500" />}
                {item.status === 'error' && <XCircle className="w-5 h-5 text-red-500" />}
              </div>
              <p className="text-sm text-slate-600 mb-3">{item.descricao}</p>
              <a 
                href={item.doc} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                Documentação <ExternalLink className="w-3 h-3" />
              </a>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Benefícios */}
        <Card className="border border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              Benefícios Potenciais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {beneficios.map((item, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-emerald-50 rounded-xl">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <item.icon className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-medium text-slate-900">{item.titulo}</h4>
                  <p className="text-sm text-slate-600">{item.descricao}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Riscos */}
        <Card className="border border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              Riscos Identificados
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {riscos.map((item, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl">
                <Badge 
                  variant="outline" 
                  className={
                    item.nivel === 'Alto' 
                      ? 'border-red-300 bg-red-50 text-red-700' 
                      : 'border-amber-300 bg-amber-50 text-amber-700'
                  }
                >
                  {item.nivel}
                </Badge>
                <div>
                  <h4 className="font-medium text-slate-900">{item.titulo}</h4>
                  <p className="text-sm text-slate-600">{item.descricao}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* O que é Samba AD */}
      <Card className="border border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg">O que é o Samba Active Directory?</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-slate max-w-none">
          <p className="text-slate-600 leading-relaxed">
            O <strong>Samba 4</strong> (lançado em 2012) implementa um controlador de domínio 
            Active Directory compatível com o protocolo da Microsoft, permitindo que servidores 
            Linux funcionem como Domain Controllers. O Samba fornece:
          </p>
          <ul className="mt-4 space-y-2 text-slate-600">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
              <span>Serviço LDAP integrado para autenticação e diretório</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
              <span>Kerberos KDC para autenticação segura</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
              <span>DNS integrado ou compatível com BIND9</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
              <span>Suporte a Group Policies (com limitações)</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
              <span>Replicação entre múltiplos DCs</span>
            </li>
          </ul>
          <div className="mt-6 p-4 bg-blue-50 rounded-xl">
            <p className="text-sm text-blue-800">
              <strong>Documentação Oficial:</strong>{' '}
              <a 
                href="https://wiki.samba.org/index.php/Setting_up_Samba_as_an_Active_Directory_Domain_Controller" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:text-blue-900"
              >
                wiki.samba.org - Setting up Samba as an AD DC
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}