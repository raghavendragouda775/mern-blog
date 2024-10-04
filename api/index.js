import express from 'express';

const app = express();

// Define a simple GET route to verify the server is running
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
