
import { Search, Filter, Download, Eye } from 'lucide-react';
import { useState } from 'react';

export const AuditLogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterUser, setFilterUser] = useState('all');

  const auditEntries = [
    {
      id: 'AUD-001',
      timestamp: '2024-06-10 14:23:15',
      user: 'Jean Martin',
      userRole: 'Analyste',
      action: 'Qualification Alerte',
      target: 'ALT-2024-001',
      details: 'Qualification: Fraude Avérée • Commentaire: Transaction suspecte confirmée',
      ipAddress: '192.168.1.105',
      result: 'Succès'
    },
    {
      id: 'AUD-002',
      timestamp: '2024-06-10 14:18:42',
      user: 'System',
      userRole: 'Système',
      action: 'Déploiement Modèle',
      target: 'Fraud Detection v2.1',
      details: 'Mise à jour automatique du modèle IA • Précision: 94.2%',
      ipAddress: 'localhost',
      result: 'Succès'
    },
    {
      id: 'AUD-003',
      timestamp: '2024-06-10 14:15:08',
      user: 'Sophie Durand',
      userRole: 'Analyste',
      action: 'Connexion Utilisateur',
      target: 'Interface Web',
      details: 'Connexion réussie via authentification JWT',
      ipAddress: '192.168.1.112',
      result: 'Succès'
    },
    {
      id: 'AUD-004',
      timestamp: '2024-06-10 14:12:33',
      user: 'Admin System',
      userRole: 'Administrateur',
      action: 'Modification Configuration',
      target: 'Seuil Détection IA',
      details: 'Modification seuil: 0.75 → 0.80 • Raison: Réduction faux positifs',
      ipAddress: '192.168.1.101',
      result: 'Succès'
    },
    {
      id: 'AUD-005',
      timestamp: '2024-06-10 14:08:22',
      user: 'Marc Leclerc',
      userRole: 'Manager',
      action: 'Réassignation Alerte',
      target: 'ALT-2024-015',
      details: 'Réassignation: Lucas Bernard → Sophie Durand • Raison: Équilibrage charge',
      ipAddress: '192.168.1.108',
      result: 'Succès'
    },
    {
      id: 'AUD-006',
      timestamp: '2024-06-10 13:45:17',
      user: 'Claire Moreau',
      userRole: 'Auditeur',
      action: 'Consultation Historique',
      target: 'ALT-2024-001',
      details: 'Consultation complète historique alerte pour audit conformité',
      ipAddress: '192.168.1.115',
      result: 'Succès'
    }
  ];

  const filteredEntries = auditEntries.filter(entry => {
    const matchesSearch = 
      entry.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.target.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || entry.action.toLowerCase().includes(filterType.toLowerCase());
    const matchesUser = filterUser === 'all' || entry.user === filterUser;
    
    return matchesSearch && matchesType && matchesUser;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Journal d'Audit</h1>
        <p className="text-muted-foreground mt-2">Traçabilité complète des actions système et utilisateurs</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              placeholder="Rechercher par utilisateur, action ou cible..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          <div className="flex gap-3">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">Toutes les actions</option>
              <option value="connexion">Connexions</option>
              <option value="qualification">Qualifications</option>
              <option value="configuration">Configurations</option>
              <option value="déploiement">Déploiements</option>
            </select>
            
            <select
              value={filterUser}
              onChange={(e) => setFilterUser(e.target.value)}
              className="px-4 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">Tous les utilisateurs</option>
              <option value="Jean Martin">Jean Martin</option>
              <option value="Sophie Durand">Sophie Durand</option>
              <option value="Marc Leclerc">Marc Leclerc</option>
              <option value="System">Système</option>
            </select>

            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
              <Download className="w-4 h-4" />
              Exporter
            </button>
          </div>
        </div>
      </div>

      {/* Audit Entries */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 font-medium text-muted-foreground">Horodatage</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Utilisateur</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Action</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Cible</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Résultat</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Détails</th>
              </tr>
            </thead>
            <tbody>
              {filteredEntries.map((entry) => (
                <tr key={entry.id} className="border-t border-border hover:bg-muted/25 transition-colors">
                  <td className="p-4">
                    <div className="font-mono text-sm">{entry.timestamp}</div>
                  </td>
                  <td className="p-4">
                    <div>
                      <div className="font-medium">{entry.user}</div>
                      <div className="text-sm text-muted-foreground">{entry.userRole}</div>
                      <div className="text-xs text-muted-foreground">{entry.ipAddress}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="font-medium">{entry.action}</span>
                  </td>
                  <td className="p-4">
                    <span className="font-mono text-sm">{entry.target}</span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      entry.result === 'Succès' ? 'bg-green-100 text-green-800' : 
                      entry.result === 'Échec' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {entry.result}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground truncate max-w-xs">
                        {entry.details}
                      </span>
                      <button className="p-1 hover:bg-accent rounded">
                        <Eye className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredEntries.length === 0 && (
          <div className="text-center py-12">
            <Filter className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Aucune entrée d'audit ne correspond aux critères de recherche</p>
          </div>
        )}
      </div>

      {/* Audit Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card rounded-xl border border-border p-6 text-center">
          <div className="text-2xl font-bold text-foreground">1,247</div>
          <div className="text-sm text-muted-foreground">Entrées totales</div>
          <div className="text-xs text-muted-foreground mt-1">Cette semaine</div>
        </div>
        <div className="bg-card rounded-xl border border-border p-6 text-center">
          <div className="text-2xl font-bold text-green-600">99.8%</div>
          <div className="text-sm text-muted-foreground">Actions réussies</div>
          <div className="text-xs text-muted-foreground mt-1">Taux de succès</div>
        </div>
        <div className="bg-card rounded-xl border border-border p-6 text-center">
          <div className="text-2xl font-bold text-blue-600">42</div>
          <div className="text-sm text-muted-foreground">Utilisateurs uniques</div>
          <div className="text-xs text-muted-foreground mt-1">Activité récente</div>
        </div>
      </div>
    </div>
  );
};
