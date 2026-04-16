import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useTimeline } from "../context/TimelineContext";
import { BarChart2 } from "lucide-react";

const COLORS = ["#2D6A4F", "#74C69D", "#B7E4C7"];
const BORDER_COLORS = ["#2D6A4F", "#52b788", "#95d5b2"];

export default function Stats() {
  const { entries } = useTimeline();

  const counts = { Call: 0, Text: 0, Video: 0 };
  entries.forEach((e) => {
    if (counts[e.type] !== undefined) counts[e.type]++;
  });

  const data = [
    { name: "Call",  value: counts.Call  },
    { name: "Text",  value: counts.Text  },
    { name: "Video", value: counts.Video },
  ].filter((d) => d.value > 0);

  return (
    <div className="stats-page">
      <div className="page-header">
        <h1 className="page-title">Friendship Analytics</h1>
        <p className="page-sub">Visualize how you connect with your friends</p>
      </div>

      {data.length === 0 ? (
        <div className="empty-state">
          <BarChart2 size={48} className="empty-icon" />
          <h3>No data yet</h3>
          <p>Log some interactions from friend pages to see your analytics here.</p>
        </div>
      ) : (
        <div className="chart-card">
          <h2 className="chart-title">By Interaction Type</h2>
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={120}
                innerRadius={58}
                paddingAngle={4}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                labelLine={{ stroke: "#9ca3af", strokeWidth: 1 }}
              >
                {data.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "10px",
                  color: "#111827",
                  fontSize: "0.875rem",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                }}
              />
              <Legend
                formatter={(value) => (
                  <span style={{ color: "#374151", fontSize: "0.84rem" }}>{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="stats-summary">
            {["Call", "Text", "Video"].map((type, i) => (
              <div
                key={type}
                className="stat-pill"
                style={{ borderColor: BORDER_COLORS[i] }}
              >
                <span className="pill-dot" style={{ background: COLORS[i] }} />
                <span>{type}</span>
                <strong>{counts[type]}</strong>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
