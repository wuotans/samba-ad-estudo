import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Server, Shield, FileText, Database, Monitor, Lock, 
  ArrowRight, CheckCircle2, XCircle, AlertTriangle, 
  ExternalLink, ChevronRight, Layers, Settings, Users,
  HardDrive, Globe, BookOpen, AlertCircle, Zap
} from 'lucide-react';
import VisaoGeral from '@/components/estudo/VisaoGeral.jsx';
import InfraestruturaAtual from '@/components/estudo/InfraestruturaAtual.jsx';
import AnaliseGPO from '@/components/estudo/AnaliseGPO.jsx';
import IntegracoesSistemas from '@/components/estudo/IntegracoesSistemas.jsx';
import EstacoesWindows from '@/components/estudo/EstacoesWindows.jsx';
import SegurancaConformidade from '@/components/estudo/SegurancaConformidade.jsx';
import EstrategiaMigracao from '@/components/estudo/EstrategiaMigracao.jsx';
import ParecerFinal from '@/components/estudo/ParecerFinal.jsx';

export default function Home() {
  const [activeTab, setActiveTab] = useState('visao-geral');

  const sections = [
    { id: 'visao-geral', label: 'Visão Geral', icon: BookOpen },
    { id: 'infraestrutura', label: 'Infraestrutura', icon: Server },
    { id: 'gpo', label: 'Group Policy', icon: FileText },
    { id: 'integracoes', label: 'Integrações', icon: Globe },
    { id: 'windows', label: 'Windows', icon: Monitor },
    { id: 'seguranca', label: 'Segurança', icon: Shield },
    { id: 'migracao', label: 'Migração', icon: ArrowRight },
    { id: 'parecer', label: 'Parecer Final', icon: AlertCircle },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
                Estudo de Viabilidade
              </h1>
              <p className="text-slate-500 mt-1">
                Migração de Microsoft AD DS para Samba Active Directory
              </p>
            </div>
            <Badge variant="outline" className="border-amber-300 bg-amber-50 text-amber-700">
              <AlertTriangle className="w-3 h-3 mr-1" />
              Viável com Restrições
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          {/* Navigation */}
          <div className="bg-white rounded-2xl border border-slate-200 p-2 shadow-sm">
            <TabsList className="grid grid-cols-4 lg:grid-cols-8 gap-1 bg-transparent h-auto">
              {sections.map((section) => (
                <TabsTrigger
                  key={section.id}
                  value={section.id}
                  className="flex flex-col items-center gap-1 py-3 px-2 rounded-xl data-[state=active]:bg-slate-900 data-[state=active]:text-white transition-all"
                >
                  <section.icon className="w-4 h-4" />
                  <span className="text-xs font-medium">{section.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Content */}
          <div className="min-h-[600px]">
            <TabsContent value="visao-geral" className="mt-0">
              <VisaoGeral />
            </TabsContent>
            <TabsContent value="infraestrutura" className="mt-0">
              <InfraestruturaAtual />
            </TabsContent>
            <TabsContent value="gpo" className="mt-0">
              <AnaliseGPO />
            </TabsContent>
            <TabsContent value="integracoes" className="mt-0">
              <IntegracoesSistemas />
            </TabsContent>
            <TabsContent value="windows" className="mt-0">
              <EstacoesWindows />
            </TabsContent>
            <TabsContent value="seguranca" className="mt-0">
              <SegurancaConformidade />
            </TabsContent>
            <TabsContent value="migracao" className="mt-0">
              <EstrategiaMigracao />
            </TabsContent>
            <TabsContent value="parecer" className="mt-0">
              <ParecerFinal />
            </TabsContent>
          </div>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white mt-12">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <p className="text-sm text-slate-500 text-center">
            Documento técnico de análise de viabilidade • Atualizado em {new Date().toLocaleDateString('pt-BR')}
          </p>
        </div>
      </footer>
    </div>
  );
}