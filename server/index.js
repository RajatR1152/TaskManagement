const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const users = require('./modules/user');
const tasks = require('./modules/TaskModule');
const jwt = require('jsonwebtoken');
const jwtscerete = "secrete124";  // This should ideally be moved to an env variable for security
const port = 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(`mongodb+srv://rajat:rajat123@cluster0.otatf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connection successful"))
    .catch(err => {
        console.error("Connection failed: ", err);
        process.exit(1); // Exit if the connection fails
    });

// JWT Authentication Middleware
const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header

    if (token) {
        jwt.verify(token, jwtscerete, (err, user) => {
            if (err) {
                return res.sendStatus(403); // Forbidden if token is invalid
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401); // Unauthorized if no token is provided
    }
};

// Routes
app.get('/', (req, res) => {
    res.send("ok...");
});

app.post('/login', (req, res) => {
    users.findOne({ email: req.body.email }).then(async (data) => {
        if (data) {
            const passwordMatch = await bcrypt.compare(req.body.password, data.password);
            if (passwordMatch) {
                const token = jwt.sign({ id: data._id, email: data.email }, jwtscerete, { expiresIn: '1h' });
                return res.json({ status: 'ok', user: true, token: token });
            } else {
                return res.json({ status: 'error', user: false, message: 'Invalid credentials' });
            }
        } else {
            return res.json({ status: 'error', user: false, message: 'User not found' });
        }
    }).catch(error => {
        console.error('Login error:', error);
        res.status(500).json({ status: 'error', message: 'Login failed' });
    });
});

app.post('/register', async (req, res) => {
    try {
        const userExists = await users.findOne({ email: req.body.email });
        if (userExists) {
            res.send({ created: false, message: "User already exists" });
        } else {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            const newUser = new users({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
                title: req.body.title
            });

            await newUser.save();
            res.json({ status: 'ok', message: 'User created successfully! Please login', created: true });
        }
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ status: 'error', message: 'User registration failed' });
    }
});

app.get('/protected', authenticateJWT, (req, res) => {
    res.json({ message: 'You are authorized!', user: req.user });
});

app.post('/users', async (req, res) => {
    try {
        const data = await users.find();
        res.send(data);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send({ error: 'Failed to fetch users' });
    }
});

app.post('/create', async (req, res) => {
    try {
        const newTask = new tasks(req.body);
        await newTask.save();
        res.send({ saved: true, message: 'Task created successfully' });
    } catch (error) {
        console.error('Task creation error:', error);
        res.status(500).send({ saved: false, message: 'Task creation failed' });
    }
});

app.post('/gettasks', async (req, res) => {
    try {
        const data = await tasks.find();
        res.send(data);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).send({ error: 'Failed to fetch tasks' });
    }
});

app.post('/delete', async (req, res) => {
    try {
        const result = await tasks.deleteOne(req.body);
        res.send({ deleted: true, data: result });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).send({ deleted: false, error: 'Failed to delete task' });
    }
});

app.post('/getpost', async (req, res) => {
    try {
        const data = await tasks.findOne(req.body);
        res.send({ found: true, data });
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).send({ found: false, error: 'Failed to fetch post' });
    }
});

app.post('/update', async (req, res) => {
    try {
        const result = await tasks.updateOne({ _id: req.body._id }, { $set: req.body });

        if (result.nModified === 1) {
            res.send({ edited: true, message: 'Data updated successfully' });
        } else {
            res.send({ edited: false, message: 'No document found or no changes made' });
        }
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).send({ edited: false, message: 'Error updating document' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app; // Export app for serverless
