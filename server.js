require("dotenv").config();
const connectDB = require("./config/db");
const app = require("./app");

const PORT = process.env.PORT || 3000;

if (!process.env.JWT_SECRET) {
  // eslint-disable-next-line no-console
  console.warn("Warning: JWT_SECRET is not set. Set it in .env for production.");
}

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error("Database connection failed:", err.message);
    process.exit(1);
  });
