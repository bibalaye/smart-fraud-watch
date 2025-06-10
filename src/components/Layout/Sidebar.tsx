
import { useState } from 'react';
import { Shield, BarChart3, AlertTriangle, Settings, Menu, X, Users, FileText, Briefcase, UserCheck, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

type UserRole = 'analyst' | 'manager' | 'admin' | 'auditor';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  userRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

const getNavigationForRole = (role: UserRole) => {
  const baseNavigation = [
    { id: 'dashboard', name: 'Tableau de bord', icon: BarChart3 },
    { id: 'alerts', name: 'Alertes', icon: AlertTriangle },
  ];

  switch (role) {
    case 'analyst':
      return baseNavigation;
    case 'manager':
      return [
        ...baseNavigation,
        { id: 'workload', name: 'Gestion Équipe', icon: Briefcase },
      ];
    case 'admin':
      return [
        ...baseNavigation,
        { id: 'users', name: 'Utilisateurs', icon: UserCheck },
        { id: 'settings', name: 'Administration', icon: Settings },
      ];
    case 'auditor':
      return [
        ...baseNavigation,
        { id: 'audit', name: 'Journal d\'Audit', icon: FileText },
      ];
    default:
      return baseNavigation;
  }
};

export const Sidebar = ({ activeSection, onSectionChange, userRole, onRoleChange }: SidebarProps) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();
  
  const navigation = getNavigationForRole(userRole);
  
  const roleLabels = {
    analyst: 'Analyste Fraude',
    manager: 'Manager',
    admin: 'Administrateur',
    auditor: 'Auditeur'
  };

  const handleLogout = () => {
    // Dans une vraie application, vous feriez ici votre logique de déconnexion
    navigate('/auth');
  };

  const SidebarContent = () => (
    <>
      <div className="flex items-center gap-3 px-6 py-6 border-b border-sidebar-border">
        <div className="flex items-center justify-center w-10 h-10 banking-gradient rounded-xl">
          <Shield className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-sidebar-foreground">FraudGuard</h1>
          <p className="text-sm text-muted-foreground">Détection IA</p>
        </div>
      </div>

      {/* Role Selector */}
      <div className="px-6 py-4 border-b border-sidebar-border">
        <label className="block text-sm font-medium text-muted-foreground mb-2">
          Rôle Utilisateur
        </label>
        <select
          value={userRole}
          onChange={(e) => onRoleChange(e.target.value as UserRole)}
          className="w-full px-3 py-2 text-sm border border-sidebar-border rounded-lg bg-sidebar-background focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          {Object.entries(roleLabels).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => {
                onSectionChange(item.id);
                setIsMobileOpen(false);
              }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-all duration-200",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto px-4 py-6 border-t border-sidebar-border">
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center gap-2 text-rose-600 hover:text-rose-700 border-rose-200 hover:bg-rose-50"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4" />
          Déconnexion
        </Button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 bg-background border border-border rounded-lg shadow-lg"
        >
          {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile sidebar */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="fixed inset-0 bg-black/20" onClick={() => setIsMobileOpen(false)} />
          <div className="fixed top-0 left-0 h-full w-80 bg-sidebar-background border-r border-sidebar-border shadow-xl">
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-80 bg-sidebar-background border-r border-sidebar-border">
        <SidebarContent />
      </div>
    </>
  );
};
