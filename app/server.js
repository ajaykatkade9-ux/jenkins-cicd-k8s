const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('🚀 Jenkins CI/CD Pipeline is Working!');
});

app.get('/health', (req, res) => {
    res.send('OK');
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

