#!/bin/bash

echo "Installing node packages"
npm install
echo "Hurray! node packages installed"

echo "Running unit tests"
npm test
echo "Whoop-Dee-Doo! Unit tests still passed"

echo "Compiling Sass for the app"
npm run scss

echo "Starting Server and opening Starting Guillaume's Pop in a box eCOmmerce shop"
npm start
