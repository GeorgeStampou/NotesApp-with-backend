# NotesApp-with-backend

The **NotesApp-with-Backend** is a Node.js API that allows you to create, read, update, and delete notes. It's built using Express.js and MongoDB. The frontend is from another project i made: [Notes App](https://github.com/GeorgeStampou/NotesApp). All the notes are now saved at a database.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)

## Prerequisites
Before you get started, make sure you have the following installed:

- Node.js
- MongoDB (create an account at mongodb.com and create a database)
- Git (optional)

## Installation

To use the NotesApp-with-Backend locally, follow these steps:

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/GeorgeStampou/NotesApp-with-backend.git

2. Open the project directory:
   
   ```bash
   cd NotesApp-with-backend-main

3. Install the project dependencies:

   ```bash
   npm install
4. Create a `.env` file in the project root and add your environment variables, e.g.:
   ```env
   PORT = some port number (like 3000 or 5000)
   MONGO_URI = your string to connect to the database

## Usage

1. Start the server:
   ```bash
   node app.js
2. The app will be available at `http://localhost:whatever port you add at the .env file` when you see a message at your command window like: `Server is listening on port port_number...`
3. You can interact with the app. Add new notes, edit, remove. All of your notes are kept at your database.
