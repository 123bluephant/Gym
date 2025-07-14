import React, { useEffect, useState } from "react";
import { fetchDailyFeed } from "../api/feed";
import { logUserAction } from "../api/log";

export default function DailyFeed({ onBack }) {
  const [feed, setFeed] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDailyFeed()
      .then(setFeed)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!feed) return <div>No data available.</div>;

  return (
    <div style={{
      maxWidth: 500, margin: "40px auto", padding: 24, background: "#fff",
      borderRadius: 14, boxShadow: "0 4px 16px rgba(0,0,0,0.07)"
    }}>
      <button onClick={onBack} style={{ marginBottom: 16 }}>← Back</button>
      <h2>Today</h2>
      <section style={{ marginBottom: 24 }}>
        <h3>Suggested Workout</h3>
        <div style={{ background: "#f1f8ff", borderRadius: 8, padding: 16 }}>
          <b>{feed.workout.title}</b> ({feed.workout.duration})
          <p>{feed.workout.description}</p>
          <small>Equipment: {feed.workout.equipment}</small>
          <br />
          <button onClick={() => logUserAction("workout_started", { workoutId: feed.workout.id })} style={buttonStyle}>
            Start Workout
          </button>
        </div>
      </section>
      <section style={{ marginBottom: 24 }}>
        <h3>Meal Plan</h3>
        <div style={{ background: "#fffbe7", borderRadius: 8, padding: 16 }}>
          {feed.mealPlan.map((meal, idx) => (
            <div key={idx} style={{ marginBottom: 8 }}>
              <b>{meal.meal}:</b> {meal.details}
              <button onClick={() => logUserAction("meal_logged", { meal: meal.meal })} style={smallButtonStyle}>Log Meal</button>
            </div>
          ))}
          {feed.periodPhase && (
            <div style={{ marginTop: 12, color: "#636e72", fontStyle: "italic" }}>
              Period Sync: <b>{feed.periodPhase}</b> phase. {feed.periodTip}
            </div>
          )}
        </div>
      </section>
      <section style={{ marginBottom: 24 }}>
        <h3>AI Tip of the Day</h3>
        <div style={{ background: "#eafaf1", borderRadius: 8, padding: 16, marginBottom: 8 }}>
          {feed.aiTip}
        </div>
        <h3>Challenge of the Day</h3>
        <div style={{ background: "#f3f0ff", borderRadius: 8, padding: 16 }}>
          {feed.challenge}
          <button onClick={() => logUserAction("challenge_accepted", { challenge: feed.challenge })} style={smallButtonStyle}>
            Accept Challenge
          </button>
        </div>
      </section>
    </div>
  );
}

const buttonStyle = {
  background: "#0984e3", color: "#fff", border: "none", borderRadius: 5,
  padding: "8px 16px", margin: "12px 8px 0 0", fontWeight: "bold", cursor: "pointer"
};
const smallButtonStyle = { ...buttonStyle, padding: "4px 8px", fontSize: "0.9em", marginLeft: 8 };
