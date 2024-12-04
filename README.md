# Club Hub: A Comprehensive Platform for University Club Management

Project description

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Contributions](#contributions)

## Features

- **User authentication and authorization:** Users can sign up, log in, and log out
- **Create club:** Each user can create a single club
- **Search for clubs:** Search for clubs and join based on keywords
- **Threads discussion:** Each club can create threads and nested-reply to threads
- **Make announcements:** Each club can create social posts as announcements
- **Manage events:** Each club can create events and members can register/unregister for events
- **Chatting:** Each club can create chatrooms and send messages to club members. Chatrooms are live and can be accessed by any club members.

## Prerequisites

- Node.js (v12.0.0 or higher)
- npm (v10.1.0)

- Option 1: MySQL server running on your local system and any preferred GUI (e.g. MySQL Workbench)
- .env file with the following variables:

  - DB_HOST (e.g. localhost)
  - DB_USER (e.g. root)
  - DB_PASSWORD (e.g. password)
  - DB_NAME (e.g. clubhub)
  - You can run the code in clubhub_create_db.sql file to create the database and tables on your local system

- Option 2 (preferred): We also host our database server online, in which case you can use the following variables (we used freemysqlhosting.net):
  - DB_HOST= sql3.freemysqlhosting.net
  - DB_USER= sql3749296
  - DB_PASSWORD= ZXRZuYlU94
  - DB_NAME= sql3749296

## Installation

To get started Club Hub, follow these steps:

1. Clone the repository

   ```
   git clone https://github.com/Daoranger/Club-Hub.git
   ```

2. To run Club Hub on your local system, open two terminals and run the following commands:

   On the first terminal, navigate to the backend directory and run the following command:

   ```
   cd backend
   npm install
   npm start
   ```

   Your backend should be running now. you should get two message that said

   ```
   "Connected to backend!"
   "DB Connection is good!"
   ```

   On the second terminal, navigate to the client directory and run the following command:

   ```
   cd client
   npm install
   npm start
   ```

   After running the command, your browser should automatically open the Club Hub application. You should see home page of Club Hub.

   If it is your first time running the application, you will need to sign up for an account. Then log in with your account credentials.

   Once you login, explore and have fun!

## Usage

I want to include some screenshots of the website here!

## Contributions

- **Hoang Nguyen:**

- **Nathan Cohn:**

- **Nathan Durrant:**

- **Shervan Shahparnia:**

- **Aaron Sam**
