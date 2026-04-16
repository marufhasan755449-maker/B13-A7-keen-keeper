import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus, Users, AlertCircle, Clock, CheckCircle } from "lucide-react";
import FriendCard from "../components/FriendCard";

export default function Home() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      fetch("/friends.json")
        .then((r) => r.json())
        .then((data) => {
          setFriends(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const overdue = friends.filter((f) => f.status === "overdue").length;
  const almostDue = friends.filter((f) => f.status === "almost due").length;
  const onTrack = friends.filter((f) => f.status === "on-track").length;

  return (
    <div className="home-page">
      {/* Banner */}
      <section className="banner">
        <div className="banner-content">
          <h1 className="banner-title">Keep Your Friendships Alive</h1>
          <p className="banner-subtitle">
            Never let important relationships fade away. Track your connections, set goals, and check in regularly.
          </p>
          <button className="btn-primary" onClick={() => {}}>
            <UserPlus size={18} />
            Add a Friend
          </button>
        </div>

        {/* Summary Cards */}
        <div className="summary-cards">
          <div className="summary-card">
            <Users size={24} className="summary-icon" />
            <div>
              <p className="summary-num">{friends.length}</p>
              <p className="summary-label">Total Friends</p>
            </div>
          </div>
          <div className="summary-card overdue-card">
            <AlertCircle size={24} className="summary-icon" />
            <div>
              <p className="summary-num">{overdue}</p>
              <p className="summary-label">Overdue</p>
            </div>
          </div>
          <div className="summary-card almost-card">
            <Clock size={24} className="summary-icon" />
            <div>
              <p className="summary-num">{almostDue}</p>
              <p className="summary-label">Almost Due</p>
            </div>
          </div>
          <div className="summary-card ontrack-card">
            <CheckCircle size={24} className="summary-icon" />
            <div>
              <p className="summary-num">{onTrack}</p>
              <p className="summary-label">On Track</p>
            </div>
          </div>
        </div>
      </section>

      {/* Friends Section */}
      <section className="friends-section">
        <h2 className="section-title">Your Friends</h2>
        {loading ? (
          <div className="loader-wrap">
            <div className="loader" />
            <p>Loading your friends...</p>
          </div>
        ) : (
          <div className="friends-grid">
            {friends.map((friend) => (
              <FriendCard key={friend.id} friend={friend} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
