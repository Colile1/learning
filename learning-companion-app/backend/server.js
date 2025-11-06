const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const projectManagementRoutes = require('./routes/projectManagementRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/learning_companion', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error(err));

// Register routes
app.use('/api/projectmanagement', projectManagementRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 [${new Date().toLocaleTimeString()}] Server running on port ${PORT}`));