#!/bin/bash

echo "🔄 Cleaning and restarting YouTube Clone..."

# Kill all processes
echo "1. Stopping existing processes..."
kill -9 $(lsof -ti:3000,5000,5001) 2>/dev/null || true

# Go to frontend
echo "2. Setting up frontend..."
cd ~/GitHub/youtube-clone/frontend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
  echo "   Installing dependencies..."
  npm install
fi

# Start backend in background
echo "3. Starting backend..."
cd ~/GitHub/youtube-clone/backend
npm run dev > backend.log 2>&1 &

# Wait for backend to start
echo "   Waiting for backend to start..."
sleep 3

# Start frontend
echo "4. Starting frontend..."
cd ~/GitHub/youtube-clone/frontend
npm run dev > frontend.log 2>&1 &

echo "✅ Started! Check:"
echo "   - Frontend: http://localhost:3000"
echo "   - Backend: http://localhost:5001/api/health"
echo "   - Logs: backend.log and frontend.log"