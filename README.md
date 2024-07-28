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

![image](https://github.com/user-attachments/assets/c1175cca-3b8f-4bd7-8e33-7393aaedb6c1)

![image](https://github.com/user-attachments/assets/8cbb9dd3-e7fd-4b69-b0e0-3e6269863532)

![image](https://github.com/user-attachments/assets/afc05137-8e7b-479a-a0a5-78052f57f072)

![image](https://github.com/user-attachments/assets/5d65e660-e254-41a2-be69-9d26b97d6997)

## Note: Because this project require a complex series of step to set things up, so i decided to provide you a vid for your convenient:
[Demo](https://drive.google.com/file/d/1-Rso9G-W-qzYK1421MG8Vk-6kg8X-cMe/view?usp=sharing)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm (Node Package Manager) installed. You can download them from [Node.js official website](https://nodejs.org/).
- Firebase project setup for backend services. You can create a new project on the [Firebase Console](https://console.firebase.google.com/).
- Twilio is required in this repository for SMS verification.

## Installation

Follow these steps to set up the project on your local machine:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/skiplinow-challenge.git](https://github.com/Mike20403/skipli-fe
    cd skiplinow-challenge
    ```

2. **Install dependencies:**

    ```bash
    npm install
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
├── src/
│   ├── apis/
│   │   └── auth/
│   │       └── services.api.ts
│   ├── components/
│   │   ├── cards/
│   │   │   └── CaptionCard.tsx
│   │   ├── ui/  // shadcn ui lib
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
- **Shadcn**: A tailwindcss UI library.
- **Zustand**: State management library.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
