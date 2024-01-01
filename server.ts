import express = require('express');
import path = require('path');

const app = express();
const port = process.env.PORT || 5000;

// Serve static files from the "build" directory
app.use(express.static(path.join(__dirname, 'build')));

// Handle requests to your React app
app.get('*', async (req: Request, res: Response) => {
    try {
        await res.sendFile('index.html', { root: 'build' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error serving static file');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
