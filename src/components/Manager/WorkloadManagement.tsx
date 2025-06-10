
import { Users, Clock, AlertTriangle, ArrowRight } from 'lucide-react';

export const WorkloadManagement = () => {
  const analysts = [
    { 
      id: 1,
      name: 'Jean Martin', 
      assignedAlerts: 8, 
      inProgress: 2,
      completed: 12, 
      avgTime: '7.5min', 
      precision: 94,
      status: 'Actif'
    },
    { 
      id: 2,
      name: 'Sophie Durand', 
      assignedAlerts: 6, 
      inProgress: 1,
      completed: 15, 
      avgTime: '8.2min', 
      precision: 96,
      status: 'Actif'
    },
    { 
      id: 3,
      name: 'Lucas Bernard', 
      assignedAlerts: 10, 
      inProgress: 3,
      completed: 9, 
      avgTime: '9.1min', 
      precision: 91,
      status: 'Pause'
    },
    { 
      id: 4,
      name: 'Marie Petit', 
      assignedAlerts: 5, 
      inProgress: 1,
      completed: 11, 
      avgTime: '6.8min', 
      precision: 93,
      status: 'Actif'
    },
  ];

  const unassignedAlerts = [
    { id: 'ALT-2024-020', score: 87, amount: '€12,450', merchant: 'Tech Store' },
    { id: 'ALT-2024-021', score: 92, amount: '€8,900', merchant: 'Fashion Boutique' },
    { id: 'ALT-2024-022', score: 78, amount: '€5,600', merchant: 'Restaurant' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Gestion de la Charge de Travail</h1>
        <p className="text-muted-foreground mt-2">Répartition et suivi des alertes par analyste</p>
      </div>

      {/* Team Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card rounded-xl border border-border p-6 text-center">
          <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-foreground">4</div>
          <div className="text-sm text-muted-foreground">Analystes Équipe</div>
        </div>
        <div className="bg-card rounded-xl border border-border p-6 text-center">
          <AlertTriangle className="w-8 h-8 text-orange-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-foreground">29</div>
          <div className="text-sm text-muted-foreground">Alertes Assignées</div>
        </div>
        <div className="bg-card rounded-xl border border-border p-6 text-center">
          <Clock className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-foreground">8.1min</div>
          <div className="text-sm text-muted-foreground">Temps Moyen</div>
        </div>
        <div className="bg-card rounded-xl border border-border p-6 text-center">
          <ArrowRight className="w-8 h-8 text-purple-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-foreground">3</div>
          <div className="text-sm text-muted-foreground">Non Assignées</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Analyst Workload */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Charge par Analyste</h3>
          <div className="space-y-4">
            {analysts.map((analyst) => (
              <div key={analyst.id} className="p-4 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-foreground">{analyst.name}</span>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      analyst.status === 'Actif' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {analyst.status}
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">Précision: {analyst.precision}%</span>
                </div>
                
                <div className="grid grid-cols-4 gap-3 text-sm">
                  <div className="text-center">
                    <div className="font-semibold text-foreground">{analyst.assignedAlerts}</div>
                    <div className="text-muted-foreground">Assignées</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-blue-600">{analyst.inProgress}</div>
                    <div className="text-muted-foreground">En cours</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-green-600">{analyst.completed}</div>
                    <div className="text-muted-foreground">Traitées</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-foreground">{analyst.avgTime}</div>
                    <div className="text-muted-foreground">Temps moy.</div>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-3">
                  <button className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700">
                    Réassigner
                  </button>
                  <button className="px-3 py-1 text-xs border border-border rounded hover:bg-accent">
                    Détails
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Unassigned Alerts */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Alertes Non Assignées</h3>
          <div className="space-y-3">
            {unassignedAlerts.map((alert) => (
              <div key={alert.id} className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-foreground">{alert.id}</span>
                  <span className="text-sm font-semibold text-red-600">Score: {alert.score}%</span>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{alert.merchant}</span>
                  <span className="font-medium text-foreground">{alert.amount}</span>
                </div>
                <div className="mt-3">
                  <select className="w-full px-3 py-1 text-sm border border-border rounded focus:ring-2 focus:ring-primary">
                    <option>Assigner à...</option>
                    {analysts.filter(a => a.status === 'Actif').map(analyst => (
                      <option key={analyst.id} value={analyst.id}>{analyst.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Trends */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Tendances de Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">+8%</div>
            <div className="text-sm text-muted-foreground">Productivité cette semaine</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">-12%</div>
            <div className="text-sm text-muted-foreground">Temps moyen de traitement</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">94.2%</div>
            <div className="text-sm text-muted-foreground">Précision moyenne équipe</div>
          </div>
        </div>
      </div>
    </div>
  );
};
