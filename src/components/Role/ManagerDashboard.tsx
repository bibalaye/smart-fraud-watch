
import { Users, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';
import { MetricCard } from '@/components/Dashboard/MetricCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const teamPerformanceData = [
  { name: 'J. Martin', traites: 45, precision: 94 },
  { name: 'S. Durand', traites: 38, precision: 96 },
  { name: 'L. Bernard', traites: 42, precision: 91 },
  { name: 'M. Petit', traites: 35, precision: 93 },
];

export const ManagerDashboard = () => {
  const teamMembers = [
    { name: 'Jean Martin', assignedAlerts: 8, completed: 12, avgTime: '7.5min', precision: '94%' },
    { name: 'Sophie Durand', assignedAlerts: 6, completed: 15, avgTime: '8.2min', precision: '96%' },
    { name: 'Lucas Bernard', assignedAlerts: 10, completed: 9, avgTime: '9.1min', precision: '91%' },
    { name: 'Marie Petit', assignedAlerts: 5, completed: 11, avgTime: '6.8min', precision: '93%' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Tableau de Bord Manager</h1>
        <p className="text-muted-foreground mt-2">Supervision de l'équipe et performance globale</p>
      </div>

      {/* Team Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Alertes Équipe"
          value="127"
          change="29 assignées"
          changeType="neutral"
          icon={AlertTriangle}
          gradient="from-red-500 to-red-600"
        />
        <MetricCard
          title="Taux Traitement"
          value="92%"
          change="+5% vs semaine"
          changeType="positive"
          icon={CheckCircle}
          gradient="from-green-500 to-green-600"
        />
        <MetricCard
          title="Temps Moyen Équipe"
          value="8.1min"
          change="-0.8min amélioration"
          changeType="positive"
          icon={TrendingUp}
          gradient="from-blue-500 to-blue-600"
        />
        <MetricCard
          title="Analystes Actifs"
          value="4"
          change="Tous connectés"
          changeType="positive"
          icon={Users}
          gradient="from-purple-500 to-purple-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Team Performance Chart */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Performance par Analyste</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={teamPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="traites" fill="#3b82f6" name="Alertes Traitées" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Team Workload */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Charge de Travail Équipe</h3>
          <div className="space-y-4">
            {teamMembers.map((member, index) => (
              <div key={index} className="p-4 bg-accent/30 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-foreground">{member.name}</span>
                  <span className="text-sm text-muted-foreground">Précision: {member.precision}</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Assignées: </span>
                    <span className="font-medium">{member.assignedAlerts}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Traitées: </span>
                    <span className="font-medium">{member.completed}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Temps moy: </span>
                    <span className="font-medium">{member.avgTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Escalated Alerts */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Alertes Escaladées</h3>
        <div className="space-y-3">
          {[
            { id: 'ALT-2024-002', analyst: 'J. Martin', reason: 'Montant exceptionnel', amount: '€45,000', time: 'Il y a 1h' },
            { id: 'ALT-2024-015', analyst: 'L. Bernard', reason: 'Client VIP', amount: '€23,500', time: 'Il y a 3h' },
          ].map((alert) => (
            <div key={alert.id} className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex-1">
                <div className="font-medium text-foreground">{alert.id}</div>
                <div className="text-sm text-muted-foreground">
                  Escaladé par {alert.analyst} • {alert.reason}
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-foreground">{alert.amount}</div>
                <div className="text-xs text-muted-foreground">{alert.time}</div>
              </div>
              <button className="ml-4 px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
                Examiner
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
