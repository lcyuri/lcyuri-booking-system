<p align="center"><h1 align="center">lcyuri-booking-system</h1></p>
<p align="center">
  <em>Booking Systme MVP</em>
</p>
<p align="center">
  <img src="https://img.shields.io/github/last-commit/lcyuri/lcyuri-booking-system?style=default&logo=git&logoColor=white&color=0080ff" alt="last-commit">
  <img src="https://img.shields.io/github/languages/top/lcyuri/lcyuri-booking-system?style=default&color=0080ff" alt="repo-top-language">
  <img src="https://img.shields.io/github/languages/count/lcyuri/lcyuri-booking-system?style=default&color=0080ff" alt="repo-language-count">
</p>
<br>

## 📌 Table of Contents

-   [Overview](#overview)
-   [Features](#features)
-   [Project Structure](#project-structure)
-   [Getting Started](#getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Installation](#installation)
    -   [Usage](#usage)
-   [Possible Future Features](#possible-future-features)


## 📝 Overview

This is a booking system MPV, developed as the solution for the Arionkoder code challenge.

Technologies used:

-   Next.js
-   React.js
-   Tailwind CSS
-   Headless UI
-   Vercel

AIs used:

-   ChatGPT - for speeding up the development process and improving the code
-   Claude AI - for designing the UX
-   README-AI - for creating the core of this README

The total development time was approximately 48 hours.

Production URL: **https://lcyuri-booking-system.vercel.app/{centerId}**

Mock APIs available: `center1` and `center2`.


## ✨ Features

### 📍 Center Information

-   Name
-   Description
-   Logo

### 💇‍♂️ Services List

-   Service name
-   Description
-   Time duration
-   Price

### 📅 Booking

-   Client name and email
-   Day selection
-   Time selection (enabled after choosing a day)

### ⚙️ Others

-   Loading spinner
-   Feedback alerts
-   Fake errors (10% of chance) for API calls to simulate real scenarios **(if face it loading pages, just keep refreshing)**

### ✔️ Business Rules

-   Center ID must be valid
-   Name must not be empty or invalid
-   Email must not be empty or invalid
-   Day selection is required
-   Time selection is required


## 📂 Project Structure

``` sh
└── lcyuri-booking-system/
    ├── README.md
    ├── app
    │   ├── [center]
    │   ├── favicon.ico
    │   ├── globals.css
    │   └── layout.tsx
    ├── components
    │   ├── Alert.tsx
    │   ├── Button.tsx
    │   ├── Card.tsx
    │   ├── CenterLanding.tsx
    │   ├── DatePicker.tsx
    │   ├── Input.tsx
    │   ├── Modal.tsx
    │   └── Select.tsx
    ├── eslint.config.mjs
    ├── lib
    │   ├── constants.ts
    │   ├── services.ts
    │   └── utils.ts
    ├── next.config.ts
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.mjs
    ├── public
    │   ├── api
    │   │   ├── center-1-booking.json
    │   │   ├── center-1-info.json
    │   │   ├── center-1-logo.json
    │   │   ├── center-2-booking.json
    │   │   ├── center-2-info.json
    │   │   ├── center-2-logo.json
    │   ├── file.svg
    │   ├── globe.svg
    │   ├── next.svg
    │   ├── vercel.svg
    │   └── window.svg
    ├── tsconfig.json
    └── types
        ├── Booking.ts
        ├── Center.ts
        ├── Component.ts
        └── Service.ts
```


## 🚀 Getting Started

### 🔧 Prerequisites

-   NodeJS
-   npm


## 📦 Installation

``` sh
git clone https://github.com/lcyuri/lcyuri-booking-system
cd lcyuri-booking-system
npm install
```


## ▶️ Usage
``` sh
npm run dev
```

The application will be available at: http://localhost:3000


## 🔮 Possible Future Features
-   [ ] Client login system
-   [ ] Reschedule or cancel bookings
-   [ ] Branch selection before booking
-   [ ] SMS/WhatsApp booking confirmation
-   [ ] SMS/WhatsApp reminders
-   [ ] E2E/Unit tests
