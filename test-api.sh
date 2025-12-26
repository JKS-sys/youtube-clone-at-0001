#!/bin/bash

echo "Testing YouTube Clone API..."
echo "============================="

echo "1. Testing health endpoint:"
curl -s "http://localhost:5000/api/health" 

echo -e "\n2. Getting all videos:"
curl -s "http://localhost:5000/api/videos"  # Show first 2 videos

echo -e "\n3. Testing search (React):"
curl -s "http://localhost:5000/api/videos?search=react" 

echo -e "\n4. Testing filter (Education):"
curl -s "http://localhost:5000/api/videos?category=Education"

echo -e "\n5. Testing authentication (register):"
curl -s -X POST "http://localhost:5000/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}' 