
import { AlertTriangle, Shield, TrendingUp, Users } from 'lucide-react';
import { MetricCard } from './MetricCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const fraudData = [
  { name: 'Lun', detectees: 24, bloquees: 18 },
  { name: 'Mar', detectees: 18, bloquees: 14 },
  { name: 'Mer', detectees: 32, bloquees: 28 },
  { name: 'Jeu', detectees: 45, bloquees: 38 },
  { name: 'Ven', detectees: 52, bloquees: 47 },
  { name: 'Sam', detectees: 28, bloquees: 22 },
  { name: 'Dim', detectees: 19, bloquees: 15 },
];

const scoreData = [
  { time: '00:00', score: 0.85 },
  { time: '04:00', score: 0.92 },
  { time: '08:00', score: 0.88 },
  { time: '12:00', score: 0.95 },
  { time: '16:00', score: 0.87 },
  { time: '20:00', score: 0.91 },
];

const alertTypes = [
  { name: 'Montants élevés', value: 35, color: '#ef4444' },
  { name: 'Géolocalisation', value: 28, color: '#f59e0b' },
  { name: 'Comportement', value: 22, color: '#8b5cf6' },
  { name: 'Fréquence', value: 15, color: '#06b6d4' },
];

export const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Vue d'ensemble de la détection de fraude en temps réel</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Alertes Aujourd'hui"
          value="127"
          change="+12% vs hier"
          changeType="negative"
          icon={AlertTriangle}
          gradient="from-red-500 to-red-600"
        />
        <MetricCard
          title="Fraudes Bloquées"
          value="89"
          change="+8% vs hier"
          changeType="positive"
          icon={Shield}
          gradient="from-green-500 to-green-600"
        />
        <MetricCard
          title="Score Précision IA"
          value="94.2%"
          change="+2.1% ce mois"
          changeType="positive"
          icon={TrendingUp}
          gradient="from-blue-500 to-blue-600"
        />
        <MetricCard
          title="Analystes Actifs"
          value="12"
          change="3 en formation"
          changeType="neutral"
          icon={Users}
          gradient="from-purple-500 to-purple-600"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fraud Detection Chart */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Détection Hebdomadaire</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={fraudData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="detectees" fill="#ef4444" name="Détectées" />
              <Bar dataKey="bloquees" fill="#22c55e" name="Bloquées" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* AI Score Evolution */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Évolution Score IA (24h)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={scoreData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={[0.8, 1]} />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alert Types Distribution */}
        <div className="lg:col-span-1 bg-card rounded-xl border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Types d'Alertes</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={alertTypes}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
              >
                {alertTypes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {alertTypes.map((type) => (
              <div key={type.name} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: type.color }}
                />
                <span className="text-xs text-muted-foreground">{type.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Alertes Récentes</h3>
          <div className="space-y-3">
            {[
              { id: 'ALT-2024-001', amount: '€15,789', risk: 'Élevé', time: 'Il y a 2min' },
              { id: 'ALT-2024-002', amount: '€3,245', risk: 'Moyen', time: 'Il y a 5min' },
              { id: 'ALT-2024-003', amount: '€8,901', risk: 'Élevé', time: 'Il y a 8min' },
              { id: 'ALT-2024-004', amount: '€1,567', risk: 'Faible', time: 'Il y a 12min' },
            ].map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-3 bg-accent/50 rounded-lg hover:bg-accent transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    alert.risk === 'Élevé' ? 'bg-red-500' :
                    alert.risk === 'Moyen' ? 'bg-yellow-500' : 'bg-green-500'
                  }`} />
                  <span className="font-medium text-foreground">{alert.id}</span>
                  <span className="text-muted-foreground">{alert.amount}</span>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-medium ${
                    alert.risk === 'Élevé' ? 'text-red-600' :
                    alert.risk === 'Moyen' ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {alert.risk}
                  </div>
                  <div className="text-xs text-muted-foreground">{alert.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
