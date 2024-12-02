// import dotEnv from "dotenv";
// import express from "express";
// // import @supabase
// dotEnv.config(); // Load environment variables
// const express = express;
// // const { createClient } = require('@supabase/supabase-js'); // Import Supabase client
// const app = express();
// // Determine if we're in production or development
// const isProduction = false;
// const supabaseUrl = isProduction
//   ? "https://omezdwvclavebxjljgeb.supabase.co"
//   : "https://uqcrymzvamkqgrpribjf.supabase.co";
// const supabaseKey = isProduction
//   ? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9tZXpkd3ZjbGF2ZWJ4amxqZ2ViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA1NTUyMjYsImV4cCI6MjA0NjEzMTIyNn0.teFBO9QdY4kxdIuXcqoIALsNLRMHvB77yuX6wHCbaA4"
//   : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxY3J5bXp2YW1rcWdycHJpYmpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAyMTM2MTAsImV4cCI6MjA0NTc4OTYxMH0.Br46z5HHUTT3m7U1w9tbnF1VA4KhnauoExEhUNMPVZo";
// // Initialize the Supabase client
// const supabase = createClient(supabaseUrl, supabaseKey);
// app.get("/", (req, res) => {
//   res.send("Hello from the backend!");
// });
// // New route to test database connection and query data from test_table
// app.get("/test-db", async (req, res) => {
//   try {
//     // Query the data from the test_table
//     let { data, error } = await supabase.from("test_table").select("*"); // Select all data from the test_table
//     if (error) {
//       throw error; // Throw error if any
//     }
//     // Send the queried data as a response
//     res.json(data);
//   } catch (error) {
//     console.error("Error querying the database:", error.message);
//     res.status(500).send("Error querying the database");
//   }
// });
// // Start the server
// app.listen(3000, () => {
//   console.log("Server is running on port 3000");
//   console.log("Supabase URL:", supabaseUrl);
// });
