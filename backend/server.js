// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();
// const app = express();


// // Use the route
// app.use('/api', reportRoutes);


// app.use(cors());
// app.use(express.json());
// app.use(express.static('public'));

// const appointmentRoutes = require('./routes/appointmentRoutes');
// app.use('/api/appointments', appointmentRoutes);

// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => console.log('MongoDB connected'))
//   .catch((err) => console.log(err));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
    secret: "secret123",
    resave: false,
    saveUninitialized: true
}));

// Load users
const users = JSON.parse(fs.readFileSync(path.join(__dirname, 'users.json')));

// Routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/pages/login.html"));
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        return res.status(401).send("Invalid credentials");
    }

    req.session.user = user;

    if (user.role === "barangay") {
      res.redirect("/pages/barangay-dashboard.html");
  } else if (user.role === "health") {
      res.redirect("/pages/healthcare-dashboard.html");
  } else {
        res.status(403).send("Unknown role");
    }
});

// Protect dashboard pages
app.get("/pages/barangay-dashboard.html", (req, res) => {
  if (req.session.user?.role !== "barangay") return res.redirect("/");
  res.sendFile(path.join(__dirname, "../public/pages/barangay-dashboard.html"));
});

app.get("/pages/healthcare-dashboard.html", (req, res) => {
  if (req.session.user?.role !== "health") return res.redirect("/");
  res.sendFile(path.join(__dirname, "../public/pages/healthcare-dashboard.html"));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
