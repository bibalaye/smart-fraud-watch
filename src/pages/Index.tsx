
import { useState } from 'react';
import { Sidebar } from '@/components/Layout/Sidebar';
import { Dashboard } from '@/components/Dashboard/Dashboard';
import { AlertList } from '@/components/Alerts/AlertList';
import { AlertDetail } from '@/components/Alerts/AlertDetail';
import { Settings } from '@/components/Settings/Settings';

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
}

const Index = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

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
        return <Dashboard />;
      case 'alerts':
        return <AlertList onAlertSelect={setSelectedAlert} />;
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
      />
      
      <main className="flex-1 p-4 lg:p-8 lg:ml-0 ml-0">
        <div className="max-w-7xl mx-auto pt-12 lg:pt-0">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Index;
