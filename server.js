import express, { json } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
const app = express();

// MongoDB connection URI
const uri = 'mongodb://localhost:27017/FoodCat-Hotpot';
const port = 3000;
// Middleware
app.use(cors()); // Allow Cross-Origin Resource Sharing (CORS)
app.use(json()); // Parse JSON request bodies

// Connect to MongoDB
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB')
})
.catch((error) => console.error('Error connecting to MongoDB:', error));

// Define Mongoose schema and model for the 'users' collection
const userSchema = new mongoose.Schema({
  userId: String,
  signInMethod: String,
  email: String,
  phoneNumber: String,
  username: String,
  gender: String,
});

const User = mongoose.model('User', userSchema);

app.get('/api/checkRegistration/:userId', async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.userId });
    res.json({ isRegistered: !!user });
  } catch (error) {
    console.error("Error checking user registration:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/saveProfile', async (req, res) => {
  const userProfile = req.body;

  try {
    const user = new User(userProfile);
    await user.save();
    res.status(200).send('User profile saved successfully');
  } catch (error) {
    console.error('Error saving user profile:', error);
    res.status(500).send('Error saving user profile');
  }
});

app.post("/api/getUsername", async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findOne({ userId });
    if (user) {
      res.json({ username: user.username });
    } else {
      res.json({ username: null });
    }
  } catch (error) {
    console.error("Error getting username:", error);
    res.status(500).send("Error getting username");
  }
});

// Define Mongoose schema and model for the 'bookings' collection
const bookingSchema = new mongoose.Schema({
  tableNumber: Number,
  user: String,
  reservedDate: String,
  startTime: String,
  endTime: String,
  // Add other booking properties as needed
});

const Booking = mongoose.model('Booking', bookingSchema);

// For table checking reservations
app.get('/api/reservations', async (req, res) => {
  console.log('Received request for reservations:', req.query);
  const { tableNumber, reservedDate, startTime, endTime } = req.query;

  try {
    const reservations = await Booking.find({
      tableNumber: parseInt(tableNumber),
      reservedDate,
      $or: [
        {
          startTime: { $lt: endTime },
          endTime: { $gt: startTime },
        },
      ],
    });

    if (reservations.length > 0) {
      res.json(true); // Send true if there are any reservations for the given time range
    } else {
      res.json(false);
    }
  } catch (error) {
    console.error('Error checking table reservation:', error.message);
    res.status(500).send('Error checking table reservation');
  }
});

app.post('/api/reserve', async (req, res) => {
  const { tableNumber, user, reservedDate, startTime, endTime } = req.body;

  try {
    const booking = new Booking({
      tableNumber: parseInt(tableNumber),
      user,
      reservedDate,
      startTime,
      endTime,
    });

    await booking.save();
    res.status(200).send('Reservation successful');
  } catch (error) {
    console.error('Error reserving table:', error);
    res.status(500).send('Error reserving table');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
