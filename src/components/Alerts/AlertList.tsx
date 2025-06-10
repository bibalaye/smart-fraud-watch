import { useState } from 'react';
import { Eye, Filter, Search, AlertTriangle, CheckCircle, Clock, UserCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

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

const mockAlerts: Alert[] = [
  {
    id: 'ALT-2024-001',
    transactionId: 'TXN-789456123',
    amount: 15789,
    currency: 'EUR',
    riskScore: 0.94,
    riskLevel: 'Élevé',
    status: 'En attente',
    merchantName: 'Boutique Électronique Paris',
    timestamp: '2024-06-10 14:23:15',
    location: 'Paris, France',
    cardHolder: 'Jean Dupont',
    assignedTo: 'Jean Martin'
  },
  {
    id: 'ALT-2024-002',
    transactionId: 'TXN-456789012',
    amount: 3245,
    currency: 'EUR',
    riskScore: 0.72,
    riskLevel: 'Moyen',
    status: 'En cours',
    merchantName: 'Restaurant Le Gourmet',
    timestamp: '2024-06-10 14:18:42',
    location: 'Lyon, France',
    cardHolder: 'Marie Martin',
    assignedTo: 'Sophie Durand'
  },
  {
    id: 'ALT-2024-003',
    transactionId: 'TXN-123456789',
    amount: 8901,
    currency: 'EUR',
    riskScore: 0.88,
    riskLevel: 'Élevé',
    status: 'Résolue',
    merchantName: 'Bijouterie Premium',
    timestamp: '2024-06-10 14:15:08',
    location: 'Nice, France',
    cardHolder: 'Pierre Durand'
  },
  {
    id: 'ALT-2024-004',
    transactionId: 'TXN-987654321',
    amount: 1567,
    currency: 'EUR',
    riskScore: 0.45,
    riskLevel: 'Faible',
    status: 'Fermée',
    merchantName: 'Supermarché Central',
    timestamp: '2024-06-10 14:12:33',
    location: 'Marseille, France',
    cardHolder: 'Sophie Bernard'
  }
];

type UserRole = 'analyst' | 'manager' | 'admin' | 'auditor';

interface AlertListProps {
  onAlertSelect: (alert: Alert) => void;
  userRole: UserRole;
}

export const AlertList = ({ onAlertSelect, userRole }: AlertListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [riskFilter, setRiskFilter] = useState<string>('all');
  const [assigneeFilter, setAssigneeFilter] = useState<string>('all');

  // Filter alerts based on user role
  const roleFilteredAlerts = mockAlerts.filter(alert => {
    if (userRole === 'analyst') {
      // Analysts only see their assigned alerts
      return alert.assignedTo === 'Jean Martin'; // This would be dynamic based on current user
    }
    return true; // Managers, admins, and auditors see all alerts
  });

  const filteredAlerts = roleFilteredAlerts.filter(alert => {
    const matchesSearch = alert.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.cardHolder.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.merchantName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || alert.status === statusFilter;
    const matchesRisk = riskFilter === 'all' || alert.riskLevel === riskFilter;
    const matchesAssignee = assigneeFilter === 'all' || alert.assignedTo === assigneeFilter;
    
    return matchesSearch && matchesStatus && matchesRisk && matchesAssignee;
  });

  const getStatusIcon = (status: Alert['status']) => {
    switch (status) {
      case 'En attente': return <Clock className="w-4 h-4" />;
      case 'En cours': return <AlertTriangle className="w-4 h-4" />;
      case 'Résolue': return <CheckCircle className="w-4 h-4" />;
      case 'Fermée': return <CheckCircle className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: Alert['status']) => {
    switch (status) {
      case 'En attente': return 'text-yellow-600 bg-yellow-100';
      case 'En cours': return 'text-blue-600 bg-blue-100';
      case 'Résolue': return 'text-green-600 bg-green-100';
      case 'Fermée': return 'text-gray-600 bg-gray-100';
    }
  };

  const getRiskColor = (risk: Alert['riskLevel']) => {
    switch (risk) {
      case 'Élevé': return 'text-red-600 bg-red-100';
      case 'Moyen': return 'text-yellow-600 bg-yellow-100';
      case 'Faible': return 'text-green-600 bg-green-100';
    }
  };

  const getPageTitle = () => {
    switch (userRole) {
      case 'analyst': return 'Mes Alertes';
      case 'manager': return 'Alertes de l\'Équipe';
      case 'admin': return 'Toutes les Alertes';
      case 'auditor': return 'Consultation des Alertes';
      default: return 'Gestion des Alertes';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">{getPageTitle()}</h1>
        <p className="text-muted-foreground mt-2">
          {userRole === 'analyst' 
            ? 'Vos alertes assignées et leur statut'
            : 'Surveillance et investigation des transactions suspectes'
          }
        </p>
      </div>

      {/* Filters */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              placeholder="Rechercher par ID, titulaire, ou marchand..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          <div className="flex gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">Tous les statuts</option>
              <option value="En attente">En attente</option>
              <option value="En cours">En cours</option>
              <option value="Résolue">Résolue</option>
              <option value="Fermée">Fermée</option>
            </select>
            
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="px-4 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">Tous les risques</option>
              <option value="Élevé">Risque élevé</option>
              <option value="Moyen">Risque moyen</option>
              <option value="Faible">Risque faible</option>
            </select>

            {/* Show assignee filter only for managers and admins */}
            {(userRole === 'manager' || userRole === 'admin') && (
              <select
                value={assigneeFilter}
                onChange={(e) => setAssigneeFilter(e.target.value)}
                className="px-4 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">Tous les analystes</option>
                <option value="Jean Martin">Jean Martin</option>
                <option value="Sophie Durand">Sophie Durand</option>
                <option value="Lucas Bernard">Lucas Bernard</option>
                <option value="Marie Petit">Marie Petit</option>
              </select>
            )}
          </div>
        </div>
      </div>

      {/* Alerts Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 font-medium text-muted-foreground">ID Alerte</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Porteur</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Montant</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Marchand</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Risque</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Statut</th>
                {(userRole === 'manager' || userRole === 'admin') && (
                  <th className="text-left p-4 font-medium text-muted-foreground">Assigné à</th>
                )}
                <th className="text-left p-4 font-medium text-muted-foreground">Date</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAlerts.map((alert) => (
                <tr key={alert.id} className="border-t border-border hover:bg-muted/25 transition-colors">
                  <td className="p-4">
                    <span className="font-mono text-sm font-medium">{alert.id}</span>
                  </td>
                  <td className="p-4">
                    <div>
                      <div className="font-medium">{alert.cardHolder}</div>
                      <div className="text-sm text-muted-foreground">{alert.location}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="font-semibold">{alert.amount.toLocaleString()} {alert.currency}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm">{alert.merchantName}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium",
                        getRiskColor(alert.riskLevel)
                      )}>
                        {alert.riskLevel}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {(alert.riskScore * 100).toFixed(1)}%
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className={cn(
                      "flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium w-fit",
                      getStatusColor(alert.status)
                    )}>
                      {getStatusIcon(alert.status)}
                      {alert.status}
                    </div>
                  </td>
                  {(userRole === 'manager' || userRole === 'admin') && (
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <UserCheck className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{alert.assignedTo || 'Non assignée'}</span>
                      </div>
                    </td>
                  )}
                  <td className="p-4">
                    <span className="text-sm text-muted-foreground">
                      {new Date(alert.timestamp).toLocaleDateString('fr-FR')}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => onAlertSelect(alert)}
                      className="flex items-center gap-1 px-3 py-1 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      {userRole === 'auditor' ? 'Consulter' : 'Détails'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredAlerts.length === 0 && (
          <div className="text-center py-12">
            <Filter className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              {userRole === 'analyst' 
                ? 'Aucune alerte ne vous est actuellement assignée'
                : 'Aucune alerte ne correspond aux critères de recherche'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
