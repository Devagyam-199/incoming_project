import app from "./app.js";
import dotenv from "dotenv";
import dbConn from "./DB/dbConn.js";

dotenv.config();

dbConn()
  .then(() => {
    app.listen(process.env.PORT || 8080, (req, res) => {
      console.log(`Server is running on port ${process.env.PORT || 8080} `);
    });
  })
  .catch((err) => {
    console.log(`database connection failed: ${err}`);
  });
