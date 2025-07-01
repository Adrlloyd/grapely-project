# Grapely

A beautifully interactive wine discovery and recommendation platform that allows users to explore wines around the world based on country and price, with deeper engagement through user accounts, personalised recommendations, and search/filter tools.

## Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Usage](#usage)


## Features

- Browse wines by country, price range and food pairing
- Select wine from a suggested list
- View a summary and description of each wine
- Create an account and log in for peronalised features
- Rate the wines you have tried
- Select your favourite wines and access your list at anytime

##  Screenshots

Home Page

![alt text](<docs/screenshots/Screenshot 2025-07-01 at 09.25.58.png>)

Select Wine Region

![alt text](<docs/screenshots/Screenshot 2025-07-01 at 09.26.21.png>)

Select Country

![alt text](<docs/screenshots/Screenshot 2025-07-01 at 09.26.42.png>)

Select Price range

![alt text](<docs/screenshots/Screenshot 2025-07-01 at 09.27.41.png>)

Select Food Pairing

![alt text](<docs/screenshots/Screenshot 2025-07-01 at 09.27.55.png>)

Choose Bottle

![alt text](<docs/screenshots/Screenshot 2025-07-01 at 09.28.58.png>)

Bottle Summary

![alt text](<docs/screenshots/Screenshot 2025-07-01 at 09.29.14.png>)

Search Bottle

![alt text](<docs/screenshots/Screenshot 2025-07-01 at 09.29.48.png>)

Log in

![alt text](<docs/screenshots/Screenshot 2025-07-01 at 09.30.12.png>)

Create an account

![alt text](<docs/screenshots/Screenshot 2025-07-01 at 09.32.54.png>)

##  Tech Stack

### Frontend

- React – UI library ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
- React Router – Router for React ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
- Vite – Web project Build tool ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
- TypeScript –  Strongly typed programming language that builds on JavaScript ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
- Chakra UI – Component library for styling ![Chakra UI](https://img.shields.io/badge/Chakra_UI-319795?style=for-the-badge&logo=chakra-ui&logoColor=white)
- Emotion – CSS-in-JS styling library ![Emotion](https://img.shields.io/badge/Emotion-D94892?style=for-the-badge&logo=emotion&logoColor=white)
- Framer Motion – Animations library ![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
- D3-geo + react-simple-maps – SVG maps creation ![D3.js](https://img.shields.io/badge/D3.js-F9A03C?style=for-the-badge&logo=d3.js&logoColor=white)


### Backend
- Express – Web framework for node.js![Express](https://img.shields.io/badge/Express-404D59?style=for-the-badge)
- TypeScript –  Strongly typed programming language that builds on JavaScript ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
- PostgreSQL – Database ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)
- Prisma – ORM ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
- Puppeteer – JS library for scraping ![Puppeteer](https://img.shields.io/badge/Puppeteer-000000?style=for-the-badge&logo=puppeteer&logoColor=white)
- JWT (jsonwebtoken) – Authentication ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
- Bcrypt – Password hashing ![Bcrypt](https://img.shields.io/badge/Bcrypt-632960?style=for-the-badge)







##  Getting Started

### Prerequisites

- Node.js
- PostgreSQL: Create a new database named grapelyDb and keep PostgreSQL running

### Environment setup

Create .env files based on structure below:

**grapely-project/client/.env**

    VITE_API_BASE_URL=http://localhost:3000

    VITE_IMAGE_BASE_URL=http://localhost:3000

**grapely-project/client/.env.production**

    VITE_IMAGE_BASE_URL= ... your ss3 bucket

**grapely-project/server/.env**

    DATABASE_URL= ... postgresql://<user>:<password>@localhost:5432/grapelyDb

    JWT_SECRET= ... your jwt password

    **For Production Only:**

    AWS_ACCESS_KEY_ID= ... your access key id

    AWS_SECRET_ACCESS_KEY= ... your secret access key

    AWS_REGION=eu-north-1

    S3_BUCKET_NAME= your bucket name

### Installation Steps

Open two terminals:

**Terminal 1 - Server:**

    cd server

    npm install

    npx prisma generate (only for the initial set up)

    npx prisma db push (only for the initial set up)

    npx prisma db seed (only for the initial set up)

    npm run dev

**Terminal 2 - Client:**

    cd client

    npm run install:legacy

    npm run dev

    Then open the Vite link in your browser (usually http://localhost:5173)

## Usage

**0 - Navigation Bar**
- Log in / Sign up: Create or access your account
- Bottle icon: Return to Home Page
- Grapely logo: Return to Wine Region selection
- Search bar: Start directly for a specific wine bottle

**1 - Home Page**
- Globe button: Begin selecting a wine by country and preferences
- Random button: Get a surprise wine suggestion

**2 - Select Wine Region**
- Click on preferred Continent


**3 - Select Country**
- Click on preferred country

**4 - Set your budget**
- Use sliders to define minimum and maximum prices
- Click Confirm to apply

**5 - What do you fancy eating?**
- Choose a food category to pair with the wine

**6 - Choose a bottle**
- Select a bottle among suggestions

**7 - Results**
- View detailed information and description of the selected bottle







