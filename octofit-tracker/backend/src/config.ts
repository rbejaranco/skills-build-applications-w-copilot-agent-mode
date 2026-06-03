export const API_PORT = Number(process.env.PORT || 8000);
export const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/octofit_db";
export const API_URL = process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-8000.githubpreview.dev`
  : `http://localhost:${API_PORT}`;
