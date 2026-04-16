import { useNavigate } from "react-router-dom";

const statusConfig = {
  overdue: { label: "Overdue", cls: "status-overdue" },
  "almost due": { label: "Almost Due", cls: "status-almost" },
  "on-track": { label: "On Track", cls: "status-ontrack" },
};

export default function FriendCard({ friend }) {
  const navigate = useNavigate();
  const st = statusConfig[friend.status] || statusConfig["on-track"];

  return (
    <div className="friend-card" onClick={() => navigate(`/friend/${friend.id}`)}>
      <div className={`card-status-bar ${st.cls}`} />
      <div className="card-body">
        <img src={friend.picture} alt={friend.name} className="card-avatar" />
        <div className="card-info">
          <h3 className="card-name">{friend.name}</h3>
          <p className="card-days">
            <span className="days-num">{friend.days_since_contact}</span> days since contact
          </p>
          <div className="card-tags">
            {friend.tags.map((tag) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
          <span className={`card-badge ${st.cls}`}>{st.label}</span>
        </div>
      </div>
    </div>
  );
}
