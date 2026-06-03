export type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
  team?: { _id: string; name: string; description: string };
};

export type Team = {
  _id: string;
  name: string;
  description: string;
  members: Array<{ _id: string; name: string; email: string; role: string }>;
};

export type Activity = {
  _id: string;
  user: { _id: string; name: string; email: string };
  activityType: string;
  durationMinutes: number;
  distanceKilometers?: number;
  caloriesBurned: number;
  date: string;
};

export type Workout = {
  _id: string;
  user: { _id: string; name: string; email: string };
  title: string;
  description: string;
  durationMinutes: number;
  intensity: string;
  scheduledAt: string;
  completed: boolean;
};

export type LeaderboardEntry = {
  _id: string;
  entityType: string;
  entityId: string;
  entityName: string;
  score: number;
  rank: number;
  category: string;
};

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to load ${path}`);
  }
  return response.json();
}

export function getUsers() {
  return fetchJson<{ users: User[] }>("/api/users");
}

export function getTeams() {
  return fetchJson<{ teams: Team[] }>("/api/teams");
}

export function getActivities() {
  return fetchJson<{ activities: Activity[] }>("/api/activities");
}

export function getWorkouts() {
  return fetchJson<{ workouts: Workout[] }>("/api/workouts");
}

export function getLeaderboard() {
  return fetchJson<{ leaderboard: LeaderboardEntry[] }>("/api/leaderboard");
}

export function getApiConfig() {
  return fetchJson<{ apiUrl: string }>("/api/config");
}
