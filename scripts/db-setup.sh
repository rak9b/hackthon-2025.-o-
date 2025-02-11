#!/bin/bash

# Initialize database
psql -U postgres -c "CREATE DATABASE crime_reports;"

# Run migrations
cd backend
npx prisma migrate deploy

# Seed test data
if [ "$NODE_ENV" = "development" ]; then
  npx prisma db seed
fi
