/**
 * Bootstraps and listens
 */
import app from "./app";

const PORT = process.env.PORT || 7777;

app.listen(PORT, () => {
  console.log(`🚀 ClarityFi server running at http://localhost:${PORT}`);
});
