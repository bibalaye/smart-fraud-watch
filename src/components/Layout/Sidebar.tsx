
import { useState } from 'react';
import { Shield, BarChart3, AlertTriangle, Settings, Menu, X, Users, FileText, Briefcase, UserCheck, LogOut, TrendingUp } from 'lucide-react';
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
    { id: 'alerts', name: 'Alertes de fraude', icon: AlertTriangle },
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
    manager: 'Responsable d\'Équipe',
    admin: 'Administrateur Système',
    auditor: 'Auditeur Conformité'
  };

  const handleLogout = () => {
    navigate('/auth');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-sidebar-border/50">
        <div className="flex items-center justify-center w-12 h-12 banking-gradient rounded-xl shadow-lg">
          <Shield className="w-7 h-7 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-sidebar-foreground tracking-tight">FraudGuard</h1>
          <p className="text-xs text-sidebar-foreground/60 font-medium">AI Detection Platform</p>
        </div>
      </div>

      {/* User Profile & Role */}
      <div className="px-6 py-5 border-b border-sidebar-border/50 bg-sidebar-accent/20">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">JD</span>
          </div>
          <div>
            <p className="text-sidebar-foreground font-medium text-sm">John Doe</p>
            <p className="text-sidebar-foreground/60 text-xs">{roleLabels[userRole]}</p>
          </div>
        </div>
        
        <select
          value={userRole}
          onChange={(e) => onRoleChange(e.target.value as UserRole)}
          className="w-full px-3 py-2 text-sm border border-sidebar-border/30 rounded-lg bg-sidebar-background/50 text-sidebar-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
        >
          {Object.entries(roleLabels).map(([value, label]) => (
            <option key={value} value={value} className="bg-sidebar-background">{label}</option>
          ))}
        </select>
      </div>

      {/* Quick Stats */}
      <div className="px-6 py-4 border-b border-sidebar-border/50">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-green-500/10 rounded-lg p-3 text-center">
            <TrendingUp className="w-4 h-4 text-green-400 mx-auto mb-1" />
            <p className="text-xs text-sidebar-foreground/60">Détection</p>
            <p className="text-sm font-bold text-green-400">98.5%</p>
          </div>
          <div className="bg-blue-500/10 rounded-lg p-3 text-center">
            <AlertTriangle className="w-4 h-4 text-blue-400 mx-auto mb-1" />
            <p className="text-xs text-sidebar-foreground/60">Alertes</p>
            <p className="text-sm font-bold text-blue-400">247</p>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
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
                "nav-item w-full text-left",
                isActive ? "nav-item-active" : "nav-item-inactive"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
              {isActive && <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-6 border-t border-sidebar-border/50 space-y-3">
        <div className="px-4 py-3 bg-sidebar-accent/20 rounded-lg">
          <p className="text-xs text-sidebar-foreground/60 mb-1">Système</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-sidebar-foreground font-medium">Opérationnel</span>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center gap-2 text-sidebar-foreground/80 hover:text-sidebar-foreground border-sidebar-border/30 hover:bg-sidebar-accent/30 bg-transparent"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4" />
          Déconnexion
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-3 glass rounded-xl shadow-lg border backdrop-blur-md"
        >
          {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile sidebar */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setIsMobileOpen(false)} />
          <div className="fixed top-0 left-0 h-full w-80 bg-sidebar-background border-r border-sidebar-border shadow-2xl">
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-80 bg-sidebar-background border-r border-sidebar-border/50 shadow-xl">
        <SidebarContent />
      </div>
    </>
  );
};
