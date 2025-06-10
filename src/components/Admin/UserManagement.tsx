
import { UserPlus, UserCheck, UserX, Edit } from 'lucide-react';

export const UserManagement = () => {
  const users = [
    { 
      id: 1,
      name: 'Jean Martin', 
      email: 'j.martin@company.com',
      role: 'Analyste',
      status: 'Actif',
      lastLogin: '2024-06-10 14:23',
      permissions: ['Lecture Alertes', 'Qualification', 'Investigation']
    },
    { 
      id: 2,
      name: 'Sophie Durand', 
      email: 's.durand@company.com',
      role: 'Analyste',
      status: 'Actif',
      lastLogin: '2024-06-10 13:45',
      permissions: ['Lecture Alertes', 'Qualification', 'Investigation']
    },
    { 
      id: 3,
      name: 'Marc Leclerc', 
      email: 'm.leclerc@company.com',
      role: 'Manager',
      status: 'Actif',
      lastLogin: '2024-06-10 09:12',
      permissions: ['Gestion Équipe', 'Supervision', 'Réassignation']
    },
    { 
      id: 4,
      name: 'Claire Moreau', 
      email: 'c.moreau@company.com',
      role: 'Auditeur',
      status: 'Inactif',
      lastLogin: '2024-06-08 16:30',
      permissions: ['Consultation Audit', 'Historique']
    }
  ];

  const roles = [
    { 
      name: 'Analyste', 
      permissions: ['Lecture Alertes', 'Qualification', 'Investigation', 'Escalade'],
      userCount: 12
    },
    { 
      name: 'Manager', 
      permissions: ['Gestion Équipe', 'Supervision', 'Réassignation', 'Configuration Règles'],
      userCount: 3
    },
    { 
      name: 'Administrateur', 
      permissions: ['Gestion Utilisateurs', 'Configuration Système', 'Gestion Modèles'],
      userCount: 2
    },
    { 
      name: 'Auditeur', 
      permissions: ['Consultation Audit', 'Historique', 'Rapports Conformité'],
      userCount: 2
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestion des Utilisateurs</h1>
          <p className="text-muted-foreground mt-2">Administration des comptes et permissions</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
          <UserPlus className="w-4 h-4" />
          Nouvel Utilisateur
        </button>
      </div>

      {/* User Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card rounded-xl border border-border p-6 text-center">
          <UserCheck className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-foreground">19</div>
          <div className="text-sm text-muted-foreground">Utilisateurs Actifs</div>
        </div>
        <div className="bg-card rounded-xl border border-border p-6 text-center">
          <UserX className="w-8 h-8 text-red-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-foreground">3</div>
          <div className="text-sm text-muted-foreground">Comptes Inactifs</div>
        </div>
        <div className="bg-card rounded-xl border border-border p-6 text-center">
          <Edit className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-foreground">4</div>
          <div className="text-sm text-muted-foreground">Rôles Configurés</div>
        </div>
        <div className="bg-card rounded-xl border border-border p-6 text-center">
          <UserPlus className="w-8 h-8 text-purple-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-foreground">2</div>
          <div className="text-sm text-muted-foreground">Créés Cette Semaine</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User List */}
        <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Liste des Utilisateurs</h3>
          <div className="space-y-3">
            {users.map((user) => (
              <div key={user.id} className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="font-medium text-foreground">{user.name}</div>
                    <div className="text-sm text-muted-foreground">{user.email}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.status === 'Actif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </div>
                    <div className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      {user.role}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="text-muted-foreground">
                    Dernière connexion: {user.lastLogin}
                  </div>
                  <div className="flex gap-2">
                    <button className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700">
                      Modifier
                    </button>
                    <button className="px-2 py-1 text-xs border border-border rounded hover:bg-accent">
                      Permissions
                    </button>
                  </div>
                </div>
                
                <div className="mt-2">
                  <div className="text-xs text-muted-foreground">Permissions:</div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {user.permissions.map((permission, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                        {permission}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Role Management */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Gestion des Rôles</h3>
          <div className="space-y-4">
            {roles.map((role, index) => (
              <div key={index} className="p-4 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-foreground">{role.name}</span>
                  <span className="text-sm text-muted-foreground">{role.userCount} utilisateurs</span>
                </div>
                
                <div className="text-xs text-muted-foreground mb-2">Permissions:</div>
                <div className="space-y-1">
                  {role.permissions.map((permission, permIndex) => (
                    <div key={permIndex} className="text-xs text-foreground flex items-center gap-2">
                      <div className="w-1 h-1 bg-primary rounded-full"></div>
                      {permission}
                    </div>
                  ))}
                </div>
                
                <button className="mt-3 w-full px-3 py-1 text-xs border border-border rounded hover:bg-accent">
                  Modifier Rôle
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Activité Récente</h3>
        <div className="space-y-3">
          {[
            { action: 'Création utilisateur', target: 'Lucas Bernard', user: 'Admin', time: 'Il y a 2h' },
            { action: 'Modification permissions', target: 'Sophie Durand', user: 'Admin', time: 'Il y a 4h' },
            { action: 'Désactivation compte', target: 'Claire Moreau', user: 'Admin', time: 'Il y a 1j' },
            { action: 'Création rôle', target: 'Superviseur', user: 'Admin', time: 'Il y a 2j' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-accent/30 rounded-lg">
              <div>
                <span className="font-medium text-foreground">{activity.action}</span>
                <span className="text-muted-foreground mx-2">•</span>
                <span className="text-sm text-muted-foreground">{activity.target}</span>
              </div>
              <div className="text-right">
                <div className="text-sm text-foreground">Par {activity.user}</div>
                <div className="text-xs text-muted-foreground">{activity.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
