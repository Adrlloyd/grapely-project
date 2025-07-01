# Grapely

A beautifully interactive wine discovery and recommendation platform that allows users to explore wines around the world based on country and price, with deeper engagement through user accounts, personalized recommendations, and search/filter tools.

Primary color: #7B2E5A;

## Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Usage](#usage)


## Features

- Browse wines by country, price range and food pairing.
- Select wine from a suggested list
- View a summary and description of each wine.
- Create an account and log in for peronalised features
- Rate the wines you have tried
- Select your favourite wines and access your list at anytime

##  Screenshots

Home Page
![alt text](<Screenshot 2025-07-01 at 09.25.58.png>)

Select Wine Region
![alt text](<Screenshot 2025-07-01 at 09.26.21.png>)

Select Country
![alt text](<Screenshot 2025-07-01 at 09.26.42.png>)

Select Price range
![alt text](<Screenshot 2025-07-01 at 09.27.41.png>)

Select Food Pairing
![alt text](<Screenshot 2025-07-01 at 09.27.55.png>)

Choose Bottle
![alt text](<Screenshot 2025-07-01 at 09.28.58.png>)

Bottle Summary
![alt text](<Screenshot 2025-07-01 at 09.29.14.png>)

Search Bottle
![alt text](<Screenshot 2025-07-01 at 09.29.48.png>)

Log in
![alt text](<Screenshot 2025-07-01 at 09.30.12.png>)

Create an account
![alt text](<Screenshot 2025-07-01 at 09.32.54.png>)

##  Tech Stack

### Frontend

React – UI library

React Router – Router for React

Vite – Web project Build tool

TypeScript –  Strongly typed programming language that builds on JavaScript

Chakra UI – Component library for styling

Emotion – CSS-in-JS styling library

Framer Motion – Animations library

D3-geo + react-simple-maps – SVG maps creation


### Backend

Express – Web framework for node.js

TypeScript –  Strongly typed programming language that builds on JavaScript

PostgreSQL – Database

Prisma – ORM

Puppeteer – JS library for scraping

JWT (jsonwebtoken) – Authentication

Bcrypt – Password hashing


##  Getting Started

### Prerequisites

- Node.js
- PostgreSQL

### Environment setup

Create .env files based on structure below:

grapely-project/client/.env

VITE_API_BASE_URL=http://localhost:3000
VITE_IMAGE_BASE_URL=http://localhost:3000

grapely-project/client/.env.production

VITE_IMAGE_BASE_URL= ... your ss3 bucket

grapely-project/server/.env

DATABASE_URL= ... postgresql://<user>:<password>@localhost:5432/grapely
AWS_ACCESS_KEY_ID= ... your access key id
AWS_SECRET_ACCESS_KEY= ... your secret access key
AWS_REGION=eu-north-1
S3_BUCKET_NAME= your bucket name
JWT_SECRET= ... your jwt password

### Installation Steps

Open two terminals:

Terminal 1 - Server:

cd server
npm install
npx prisma generate
npx prisma db push
npx prisma db seed
npm run dev

Terminal 2 - Client:

cd client
npm run install:legacy
npm run dev

Then open the Vite link in your browser (usually http://localhost:5173)

## Usage

0 **Navigation Bar**
- Log in / Sign up: Create or access your account
- Bottle icon: Return to Home Page
- Grapely logo: Return to Wine Region selection
- Seach bar: Start directly for a specific wine bottle

1 **Home Page**
- Globe button: Begin selecting a wine by country and preferences
- Random button: Get a surprise wine suggestion

2 **Select Wine Region**
- Click on preferred Continent


3 **Select Country**
- Click on preferred country

4 **Set your budget**
- Use sliders to define minimum and maximum prices
- Click Confirm to apply

5 **What do you fancy eating?**
- Choose a food category to pair with the wine

6 **Choose a bottle**
- Select a bottle among suggestions

7 **Results**
- View detailed information and description of the selected bottle







