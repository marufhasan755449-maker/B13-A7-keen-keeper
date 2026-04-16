import { useState } from "react";
import { Phone, MessageSquare, Video, Clock } from "lucide-react";
import { useTimeline } from "../context/TimelineContext";

const iconMap = {
  Call: <Phone size={18} />,
  Text: <MessageSquare size={18} />,
  Video: <Video size={18} />,
};

const colorMap = {
  Call: "entry-call",
  Text: "entry-text",
  Video: "entry-video",
};

export default function Timeline() {
  const { entries } = useTimeline();
  const [filter, setFilter] = useState("All");

  const filters = ["All", "Call", "Text", "Video"];
  const filtered = filter === "All" ? entries : entries.filter((e) => e.type === filter);

  return (
    <div className="timeline-page">
      <div className="page-header">
        <h1 className="page-title">Timeline</h1>
        <p className="page-sub">Your history of interactions with friends</p>
      </div>

      {/* Filters */}
      <div className="filter-row">
        {filters.map((f) => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? "active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f !== "All" && iconMap[f]}
            {f}
          </button>
        ))}
      </div>

      {/* Entries */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <Clock size={48} className="empty-icon" />
          <h3>No interactions yet</h3>
          <p>Go to a friend's page and log a call, text, or video chat to see it here.</p>
        </div>
      ) : (
        <div className="timeline-list">
          {filtered.map((entry) => (
            <div key={entry.id} className={`timeline-entry ${colorMap[entry.type]}`}>
              <div className="entry-icon">{iconMap[entry.type]}</div>
              <div className="entry-content">
                <p className="entry-title">{entry.title}</p>
                <p className="entry-date">
                  {new Date(entry.date).toLocaleDateString("en-GB", {
                    weekday: "short",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <span className="entry-type-badge">{entry.type}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
