---

# Skiplinow Challenge

This repository contains the implementation of the Skiplinow Challenge. 

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [License](#license)

## Overview

The Skiplinow Challenge is a project aimed at demonstrating a specific set of functionalities using a modern tech stack. It includes features like generating captions for social media posts, saving and sharing these captions, and managing state efficiently.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm (Node Package Manager) installed. You can download them from [Node.js official website](https://nodejs.org/).
- Firebase project setup for backend services. You can create a new project on the [Firebase Console](https://console.firebase.google.com/).
- Twilio is required in this repository for SMS verification.

## Installation

Follow these steps to set up the project on your local machine:

1. **Clone the repository:**

    ```bash
    git clone [https://github.com/yourusername/skiplinow-challenge.git](https://github.com/Mike20403/skipli-fe)
    cd skiplinow-challenge
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up Firebase:**

    - Create a `.env` file in the root directory and add your Firebase configuration ( or you can run directly with my env configuration .env.development with Twilio and Firebase 've already been setted up )

    ```env
    REACT_APP_FIREBASE_API_KEY=your-api-key
    REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
    REACT_APP_FIREBASE_PROJECT_ID=your-project-id
    REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
    REACT_APP_FIREBASE_APP_ID=your-app-id
    ```

## Running the Project

To run the project locally, use the following command:

```bash
npm run dev
```

This will start the development server and you can view the application by navigating to `http://localhost:5173` in your browser.

## Project Structure

Here is an overview of the project structure:

```plaintext
skiplinow-challenge/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── apis/
│   │   └── auth/
│   │       └── services.api.ts
│   ├── components/
│   │   ├── cards/
│   │   │   └── CaptionCard.tsx
│   │   ├── ui/
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   └── select.tsx
│   ├── constants/
│   │   ├── common.constant.ts
│   │   └── environment.constant.ts
│   ├── hooks/
│   │   ├── use-query-params.ts
│   │   ├── use-refresh.ts
│   ├── pages/
│   │   ├── CaptionGeneratePage.tsx
│   │   ├── GetInspiredPage.tsx
│   │   └── MediaFormPage.tsx
│   ├── utils/
│   │   └── string.utils.ts
│   ├── App.tsx
│   ├── index.tsx
│   └── ...
├── .env
├── package.json
└── README.md
```

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A strongly typed programming language that builds on JavaScript.
- **Firebase**: A platform developed by Google for creating mobile and web applications.
- **React Hook Form**: A library for managing form state.
- **Yup**: A JavaScript schema builder for value parsing and validation.
- **Tailwind CSS**: A utility-first CSS framework.
- **React Router**: A collection of navigational components for React applications.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to customize this `README.md` to better fit your project and provide more specific details as needed.
