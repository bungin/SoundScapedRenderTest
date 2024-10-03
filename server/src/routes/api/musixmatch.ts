import express from 'express';
import axios from 'axios';

const router = express.Router();
const MUSIXMATCH_API_KEY = process.env.MUSIXMATCH_API_KEY; // Ensure this is in your .env file

// Endpoint to get lyrics based on track ID
router.get('/lyrics', async (req, res) => {
    const { trackId } = req.query; // Get the track ID from query parameters

    if (!trackId) {
        return res.status(400).json({ error: 'Track ID is required' });
    }

    try {
        const response = await axios.get(`https://api.musixmatch.com/ws/1.1/track.lyrics.get`, {
            params: {
                track_id: trackId,
                apikey: MUSIXMATCH_API_KEY,
            },
        });

        const lyrics = response.data.message.body.lyrics;
        res.json(lyrics);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching lyrics' });
    }
});

// Endpoint to search for a track by song title and artist
router.get('/search', async (req, res) => {
    const { song, artist } = req.query; // Get song title and artist from query parameters

    if (!song) {
        return res.status(400).json({ error: 'Song title is required' });
    }

    try {
        // Search for the track based on song title and artist
        const response = await axios.get(`https://api.musixmatch.com/ws/1.1/track.search`, {
            params: {
                q_track: song,
                q_artist: artist,
                apikey: MUSIXMATCH_API_KEY,
                page_size: 1,
                s_track_rating: 'desc',
            },
        });

        const trackList = response.data.message.body.track_list;

        if (trackList.length === 0) {
            return res.status(404).json({ error: 'No track found' });
        }

        res.json(trackList[0].track); // Return the first track in the list
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while searching for the track' });
    }
});

export { router as musixRouter };
