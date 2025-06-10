
import { useState } from 'react';
import { Sidebar } from '@/components/Layout/Sidebar';
import { Dashboard } from '@/components/Dashboard/Dashboard';
import { AlertList } from '@/components/Alerts/AlertList';
import { AlertDetail } from '@/components/Alerts/AlertDetail';
import { Settings } from '@/components/Settings/Settings';
import { AnalystDashboard } from '@/components/Role/AnalystDashboard';
import { ManagerDashboard } from '@/components/Role/ManagerDashboard';
import { AdminDashboard } from '@/components/Role/AdminDashboard';
import { AuditorDashboard } from '@/components/Role/AuditorDashboard';
import { WorkloadManagement } from '@/components/Manager/WorkloadManagement';
import { UserManagement } from '@/components/Admin/UserManagement';
import { AuditLogs } from '@/components/Audit/AuditLogs';
import { Shield, TrendingUp, AlertTriangle, Activity } from 'lucide-react';

interface Alert {
  id: string;
  transactionId: string;
  amount: number;
  currency: string;
  riskScore: number;
  riskLevel: 'Élevé' | 'Moyen' | 'Faible';
  status: 'En attente' | 'En cours' | 'Résolue' | 'Fermée';
  merchantName: string;
  timestamp: string;
  location: string;
  cardHolder: string;
  assignedTo?: string;
}

type UserRole = 'analyst' | 'manager' | 'admin' | 'auditor';

const Index = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>('analyst');

  const getSectionTitle = () => {
    if (selectedAlert) return `Alerte #${selectedAlert.id}`;
    
    switch (activeSection) {
      case 'dashboard': return 'Tableau de Bord';
      case 'alerts': return 'Gestion des Alertes de Fraude';
      case 'workload': return 'Gestion de l\'Équipe';
      case 'users': return 'Gestion des Utilisateurs';
      case 'audit': return 'Journal d\'Audit';
      case 'settings': return 'Administration Système';
      default: return 'Tableau de Bord';
    }
  };

  const getSectionDescription = () => {
    if (selectedAlert) return `Investigation détaillée de la transaction ${selectedAlert.transactionId}`;
    
    switch (activeSection) {
      case 'dashboard': return 'Vue d\'ensemble des métriques de détection et performance du système';
      case 'alerts': return 'Surveillance et traitement des alertes de fraude en temps réel';
      case 'workload': return 'Répartition et optimisation de la charge de travail des analystes';
      case 'users': return 'Configuration des comptes et permissions d\'accès';
      case 'audit': return 'Traçabilité complète des actions et décisions du système';
      case 'settings': return 'Configuration des paramètres système et modèles IA';
      default: return 'Système de détection et de prévention des fraudes bancaires';
    }
  };

  const getSectionIcon = () => {
    switch (activeSection) {
      case 'dashboard': return TrendingUp;
      case 'alerts': return AlertTriangle;
      case 'workload': return Activity;
      case 'users': return Shield;
      case 'audit': return Activity;
      case 'settings': return Shield;
      default: return TrendingUp;
    }
  };

  const renderContent = () => {
    if (selectedAlert) {
      return (
        <AlertDetail 
          alert={selectedAlert} 
          onBack={() => setSelectedAlert(null)} 
        />
      );
    }

    switch (activeSection) {
      case 'dashboard':
        switch (currentUserRole) {
          case 'analyst': return <AnalystDashboard />;
          case 'manager': return <ManagerDashboard />;
          case 'admin': return <AdminDashboard />;
          case 'auditor': return <AuditorDashboard />;
          default: return <Dashboard />;
        }
      case 'alerts':
        return <AlertList onAlertSelect={setSelectedAlert} userRole={currentUserRole} />;
      case 'workload':
        return currentUserRole === 'manager' ? <WorkloadManagement /> : <Dashboard />;
      case 'users':
        return currentUserRole === 'admin' ? <UserManagement /> : <Dashboard />;
      case 'audit':
        return currentUserRole === 'auditor' ? <AuditLogs /> : <Dashboard />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  const SectionIcon = getSectionIcon();

  return (
    <div className="min-h-screen bg-background flex w-full">
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={(section) => {
          setActiveSection(section);
          setSelectedAlert(null);
        }}
        userRole={currentUserRole}
        onRoleChange={setCurrentUserRole}
      />
      
      <main className="flex-1 overflow-auto">
        <div className="p-6 lg:p-8">
          {/* Header amélioré */}
          <header className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl">
                <SectionIcon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="dashboard-title text-2xl lg:text-3xl">
                  {getSectionTitle()}
                </h1>
                <p className="text-muted-foreground text-sm lg:text-base">
                  {getSectionDescription()}
                </p>
              </div>
            </div>
            
            {/* Breadcrumb et statut système */}
            <div className="flex items-center justify-between pt-4 border-t border-border/50">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4" />
                <span>FraudGuard</span>
                <span>/</span>
                <span className="text-foreground font-medium">{getSectionTitle()}</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 dark:bg-green-950/20 rounded-full border border-green-200 dark:border-green-800">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-green-700 dark:text-green-400">Système Opérationnel</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Dernière mise à jour: {new Date().toLocaleTimeString('fr-FR')}
                </div>
              </div>
            </div>
          </header>
          
          {/* Contenu principal avec animation */}
          <div className="fade-in">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
