
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
        // Role-based dashboard rendering
        switch (currentUserRole) {
          case 'analyst':
            return <AnalystDashboard />;
          case 'manager':
            return <ManagerDashboard />;
          case 'admin':
            return <AdminDashboard />;
          case 'auditor':
            return <AuditorDashboard />;
          default:
            return <Dashboard />;
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
      
      <main className="flex-1 p-4 lg:p-8 overflow-auto">
        <div className="max-w-7xl mx-auto pt-12 lg:pt-0">
          <header className="mb-8 pb-4 border-b border-border">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              {activeSection === 'dashboard' ? 'Tableau de Bord' : 
               activeSection === 'alerts' ? 'Gestion des Alertes' :
               activeSection === 'workload' ? 'Gestion de l\'Équipe' :
               activeSection === 'users' ? 'Gestion des Utilisateurs' :
               activeSection === 'audit' ? 'Journal d\'Audit' :
               'Paramètres du Système'}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {selectedAlert 
                ? `Détail de l'alerte #${selectedAlert.id}` 
                : "Système de détection et de gestion des fraudes bancaires"}
            </p>
          </header>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-border p-6">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
