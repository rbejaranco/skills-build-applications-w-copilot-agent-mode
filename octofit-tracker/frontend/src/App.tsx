import { useEffect, useState } from "react";
import {
  getActivities,
  getApiConfig,
  getLeaderboard,
  getTeams,
  getUsers,
  getWorkouts,
  Activity,
  LeaderboardEntry,
  Team,
  User,
  Workout
} from "./api";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [apiUrl, setApiUrl] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [usersResult, teamsResult, activitiesResult, workoutsResult, leaderboardResult, configResult] = await Promise.all([
          getUsers(),
          getTeams(),
          getActivities(),
          getWorkouts(),
          getLeaderboard(),
          getApiConfig()
        ]);

        setUsers(usersResult.users);
        setTeams(teamsResult.teams);
        setActivities(activitiesResult.activities);
        setWorkouts(workoutsResult.workouts);
        setLeaderboard(leaderboardResult.leaderboard);
        setApiUrl(configResult.apiUrl);
      } catch (err) {
        setError("Unable to load backend data.");
      } finally {
        setIsLoading(false);
      }
    }

    load();
  }, []);

  return (
    <div className="app-shell">
      <main>
        <h1>OctoFit Tracker</h1>
        <p>Modern multi-tier fitness tracking with React, Vite, Express, TypeScript, and MongoDB.</p>
        {isLoading && <p>Loading backend data...</p>}
        {error && <p className="error">{error}</p>}
        {!isLoading && !error && (
          <section className="summary-grid">
            <div>
              <h2>API</h2>
              <p>{apiUrl}</p>
            </div>
            <div>
              <h2>Users</h2>
              <p>{users.length} total</p>
            </div>
            <div>
              <h2>Teams</h2>
              <p>{teams.length} total</p>
            </div>
            <div>
              <h2>Activities</h2>
              <p>{activities.length} logged</p>
            </div>
            <div>
              <h2>Workouts</h2>
              <p>{workouts.length} scheduled</p>
            </div>
            <div>
              <h2>Leaderboard</h2>
              <p>{leaderboard.length} entries</p>
            </div>
          </section>
        )}
        {!isLoading && !error && (
          <section className="detail-list">
            <h2>Top users</h2>
            <ul>
              {leaderboard.map((entry) => (
                <li key={entry._id}>
                  {entry.rank}. {entry.entityName} — {entry.score} pts ({entry.category})
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
