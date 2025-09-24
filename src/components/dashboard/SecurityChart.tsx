import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from "recharts";

interface SecurityChartProps {
  type: "line" | "area" | "pie" | "bar";
  title: string;
  data: any[];
  height?: number;
  showControls?: boolean;
}

const timeSeriesData = [
  { time: "00:00", threats: 12, anomalies: 3, normal: 450 },
  { time: "04:00", threats: 8, anomalies: 5, normal: 380 },
  { time: "08:00", threats: 15, anomalies: 8, normal: 620 },
  { time: "12:00", threats: 23, anomalies: 12, normal: 750 },
  { time: "16:00", threats: 18, anomalies: 6, normal: 680 },
  { time: "20:00", threats: 10, anomalies: 4, normal: 520 },
];

const threatDistribution = [
  { name: "SQL Injection", value: 35, color: "#ef4444" },
  { name: "XSS Attempts", value: 25, color: "#f59e0b" },
  { name: "Brute Force", value: 20, color: "#f56500" },
  { name: "DDoS", value: 15, color: "#1a365d" },
  { name: "Other", value: 5, color: "#475569" },
];

const applicationHealth = [
  { name: "E-commerce", health: 98, threats: 5 },
  { name: "Mobile API", health: 95, threats: 8 },
  { name: "Admin Panel", health: 92, threats: 12 },
  { name: "User Portal", health: 99, threats: 2 },
  { name: "Analytics", health: 96, threats: 6 },
];

export function SecurityChart({ type, title, height = 300, showControls = false }: SecurityChartProps) {
  const renderChart = () => {
    switch (type) {
      case "line":
        return (
          <ResponsiveContainer width="100%" height={height}>
            <LineChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="time" 
                className="text-xs"
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                className="text-xs"
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px"
                }}
              />
              <Line 
                type="monotone" 
                dataKey="threats" 
                stroke="hsl(var(--destructive))" 
                strokeWidth={2}
                dot={{ fill: "hsl(var(--destructive))", strokeWidth: 2, r: 4 }}
                name="Threats"
              />
              <Line 
                type="monotone" 
                dataKey="anomalies" 
                stroke="hsl(var(--warning))" 
                strokeWidth={2}
                dot={{ fill: "hsl(var(--warning))", strokeWidth: 2, r: 4 }}
                name="Anomalies"
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case "area":
        return (
          <ResponsiveContainer width="100%" height={height}>
            <AreaChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="time" 
                className="text-xs"
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                className="text-xs"
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px"
                }}
              />
              <Area 
                type="monotone" 
                dataKey="normal" 
                stackId="1"
                stroke="hsl(var(--success))" 
                fill="hsl(var(--success))"
                fillOpacity={0.6}
                name="Normal Traffic"
              />
              <Area 
                type="monotone" 
                dataKey="anomalies" 
                stackId="1"
                stroke="hsl(var(--warning))" 
                fill="hsl(var(--warning))"
                fillOpacity={0.6}
                name="Anomalies"
              />
              <Area 
                type="monotone" 
                dataKey="threats" 
                stackId="1"
                stroke="hsl(var(--destructive))" 
                fill="hsl(var(--destructive))"
                fillOpacity={0.6}
                name="Threats"
              />
            </AreaChart>
          </ResponsiveContainer>
        );

      case "pie":
        return (
          <ResponsiveContainer width="100%" height={height}>
            <PieChart>
              <Pie
                data={threatDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {threatDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value}%`, "Percentage"]}
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px"
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        );

      case "bar":
        return (
          <ResponsiveContainer width="100%" height={height}>
            <BarChart data={applicationHealth}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="name" 
                className="text-xs"
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                className="text-xs"
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px"
                }}
              />
              <Bar 
                dataKey="health" 
                fill="hsl(var(--success))"
                radius={[4, 4, 0, 0]}
                name="Health %"
              />
            </BarChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {renderChart()}
        {type === "pie" && (
          <div className="mt-4 grid grid-cols-2 gap-2">
            {threatDistribution.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs text-muted-foreground">
                  {item.name}: {item.value}%
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}