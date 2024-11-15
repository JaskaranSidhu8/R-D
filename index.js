require('dotenv').config(); // Load environment variables
const express = require('express');
const { createClient } = require('@supabase/supabase-js'); // Import Supabase client
const app = express();
// Determine if we're in production or development
const isProduction = process.env.NODE_ENV === 'production';
const supabaseUrl = isProduction ? process.env.SUPABASE_URL_PROD : process.env.SUPABASE_URL_DEV;
const supabaseKey = isProduction ? process.env.SUPABASE_KEY_PROD : process.env.SUPABASE_KEY_DEV;
// Initialize the Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});
// New route to test database connection and query data from test_table
app.get('/test-db', async (req, res) => {
  try {
    // Query the data from the test_table
    let { data, error } = await supabase
      .from('test_table')
      .select('*'); // Select all data from the test_table
    if (error) {
      throw error; // Throw error if any
    }
    // Send the queried data as a response
    res.json(data);
  } catch (error) {
    console.error('Error querying the database:', error.message);
    res.status(500).send('Error querying the database');
  }
});
// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
  console.log('Supabase URL:', supabaseUrl);
});