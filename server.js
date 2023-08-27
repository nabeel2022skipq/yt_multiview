const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')

mongoose.connect('mongodb+srv://ytmultiview:DFnHdTnpmKX5BxvA@cluster0.0hprzrn.mongodb.net/YTMultiView?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(express.json());
app.use(cors())

const multiViewSchema = new mongoose.Schema({
    url: String,
    videos: [String],
});

const MultiView = mongoose.model('MultiView', multiViewSchema);

app.get('/', async (req, res) => {
    res.send("Hello World")
})

app.post('/api/multiViews', async (req, res) => {
    const { url, videos } = req.body;

    try {
        const multiView = await MultiView.create({ url, videos });
        res.json(multiView);
    } catch (error) {
        res.status(500).json({ error: 'Could not create multi-view' });
    }
});

app.get('/api/multiViews/:uuid', async (req, res) => {
    const uuid = req.params.uuid;

    try {
        const multiView = await MultiView.findOne({ url: uuid });
        if (multiView) {
            res.json(multiView);
        } else {
            res.status(404).json({ error: 'Multi-view not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Could not fetch multi-view' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
