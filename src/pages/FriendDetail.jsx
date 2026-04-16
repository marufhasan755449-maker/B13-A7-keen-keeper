import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Phone, MessageSquare, Video, AlarmClock, Archive, Trash2, Edit, ArrowLeft, Calendar, Target, Clock } from "lucide-react";
import toast from "react-hot-toast";
import { useTimeline } from "../context/TimelineContext";

const statusConfig = {
  overdue: { label: "Overdue", cls: "status-overdue" },
  "almost due": { label: "Almost Due", cls: "status-almost" },
  "on-track": { label: "On Track", cls: "status-ontrack" },
};

export default function FriendDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [friend, setFriend] = useState(null);
  const { addEntry } = useTimeline();

  useEffect(() => {
    fetch("/friends.json")
      .then((r) => r.json())
      .then((data) => {
        const found = data.find((f) => f.id === parseInt(id));
        if (!found) navigate("/404");
        else setFriend(found);
      });
  }, [id]);

  if (!friend) return <div className="loader-wrap"><div className="loader" /></div>;

  const st = statusConfig[friend.status] || statusConfig["on-track"];

  const handleCheckin = (type) => {
    addEntry(friend.name, type);
    toast.success(`${type} with ${friend.name} logged! 🎉`);
  };

  return (
    <div className="detail-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <ArrowLeft size={16} /> Back
      </button>

      <div className="detail-grid">
        {/* LEFT COLUMN */}
        <div className="detail-left">
          <div className="detail-card">
            <img src={friend.picture} alt={friend.name} className="detail-avatar" />
            <h2 className="detail-name">{friend.name}</h2>
            <span className={`card-badge ${st.cls}`}>{st.label}</span>

            <div className="detail-tags">
              {friend.tags.map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>

            <p className="detail-bio">{friend.bio}</p>
            <p className="detail-email">📧 {friend.email}</p>

            <div className="action-buttons">
              <button className="action-btn snooze"><AlarmClock size={15} /> Snooze 2 Weeks</button>
              <button className="action-btn archive"><Archive size={15} /> Archive</button>
              <button className="action-btn delete"><Trash2 size={15} /> Delete</button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="detail-right">
          {/* Stats Cards */}
          <div className="stats-row">
            <div className="stat-card">
              <Clock size={20} className="stat-icon" />
              <p className="stat-num">{friend.days_since_contact}</p>
              <p className="stat-label">Days Since Contact</p>
            </div>
            <div className="stat-card">
              <Target size={20} className="stat-icon" />
              <p className="stat-num">{friend.goal}</p>
              <p className="stat-label">Goal (days)</p>
            </div>
            <div className="stat-card">
              <Calendar size={20} className="stat-icon" />
              <p className="stat-num">{new Date(friend.next_due_date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</p>
              <p className="stat-label">Next Due Date</p>
            </div>
          </div>

          {/* Relationship Goal */}
          <div className="right-card">
            <div className="right-card-header">
              <h3>Relationship Goal</h3>
              <button className="edit-btn"><Edit size={14} /> Edit</button>
            </div>
            <p className="goal-text">Contact <strong>{friend.name.split(" ")[0]}</strong> every <strong>{friend.goal} days</strong> to maintain this friendship.</p>
            <div className="goal-bar-wrap">
              <div className="goal-bar">
                <div
                  className={`goal-fill ${st.cls}`}
                  style={{ width: `${Math.min((friend.days_since_contact / friend.goal) * 100, 100)}%` }}
                />
              </div>
              <span className="goal-pct">{Math.round((friend.days_since_contact / friend.goal) * 100)}%</span>
            </div>
          </div>

          {/* Quick Check-In */}
          <div className="right-card">
            <h3>Quick Check-In</h3>
            <p className="checkin-sub">Log an interaction to reset the timer</p>
            <div className="checkin-buttons">
              <button className="checkin-btn call" onClick={() => handleCheckin("Call")}>
                <Phone size={18} /> Call
              </button>
              <button className="checkin-btn text" onClick={() => handleCheckin("Text")}>
                <MessageSquare size={18} /> Text
              </button>
              <button className="checkin-btn video" onClick={() => handleCheckin("Video")}>
                <Video size={18} /> Video
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
