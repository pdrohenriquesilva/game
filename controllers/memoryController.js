const Save = require('../models/save');

exports.saveGameData = async (req, res) => {
    const { userID, gameDate, failed, difficulty, completed, timeTaken } = req.body;

    console.log('Received data to save:', req.body); 

    try {
       
        if (!userID || !gameDate || difficulty === undefined || completed === undefined || timeTaken === undefined) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const newSave = new Save({
            userID,
            gameDate,
            failed,
            difficulty,
            completed,
            timeTaken,
        });

        await newSave.save(); 
        res.status(201).json({ message: 'Game data saved successfully' });
    } catch (error) {
        console.error('Error saving game data:', error);
        res.status(500).json({ message: 'Error saving game data', error });
    }
};

exports.getGameHistory = async (req, res) => {
    try {
        const { userID, difficulty, page = 1, limit = 20, sort = '-gameDate' } = req.query;
        
        const filter = {};
        if (userID) filter.userID = userID;
        if (difficulty) filter.difficulty = difficulty;
        
        const gameHistory = await Save.find(filter)
            .sort(sort)
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .select('-__v')
        
        res.status(200).json({
            count: gameHistory.length,
            data: gameHistory
        });

        console.log('Game history fetched successfully:', gameHistory);
    } catch (error) {
        console.error('Error fetch game history: ', error);
        res.status(500).json({ message: 'Error fetch game history: ', error: error.message });
    }
};