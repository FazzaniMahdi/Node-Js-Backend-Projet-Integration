require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoute = require('./routes/userRoutes');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;


if (!process.env.JWT_SECRET_KEY || !process.env.MONGODB_URI) {
  console.error('Error: Missing necessary environment variables.');
  process.exit(1);
}

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => {
  console.error('MongoDB connection error:', err.message);
  process.exit(1);
});


app.use('/api/users', userRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
