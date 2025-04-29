### 🚀 **Setup Guide:**

1. Set up the backend:
   ```bash
   cd ./backend
   npm install
   npm start
   ```
2. Endpoint curl:
   ```bash
   /save: curl -X POST http://localhost:5000/api/memory/save -H "Content-Type: application/json" -d '{"userID": "644b1f4e5f1b2c001c8e4d9a", "gameDate": "2025-04-28", "failed": 2, "difficulty": "Normal", "completed": true, "timeTaken": 40}'
   /history: curl -X GET "http://localhost:5000/api/memory/history?userID=644b1f4e5f1b2c001c8e4d9a&page=1&limit=2"
   ```
