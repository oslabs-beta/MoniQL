#!/bin/bash

echo "Enter your ElephantSQL database URI:"
read DATABASE_URI

echo "Applying schema to the database..."
psql $DATABASE_URI < init.sql

echo "Database setup complete."