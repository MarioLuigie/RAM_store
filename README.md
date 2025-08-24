# RAM_store - The complete e-commerce application.

[![Application intro](https://raw.githubusercontent.com/MarioLuigie/RAM_store/main/public/assets/images/readme-intro.jpg)](https://ram-store.vercel.app/)

## Introduction

**HealthCare** is a modern medical application that gives clinic patients full control over their health. With this app, users have access to their account, where they can quickly and conveniently schedule, edit, and cancel appointments with their doctors. The app also offers a clear dashboard where patients can monitor their health status, check test results, and sign up for additional consultations or diagnostic tests. HealthCare is the perfect solution for those who value easy access to essential medical information and want to actively manage their health.

You can try it out here: **[https://healthcare-clinic.vercel.app/](https://healthcare-clinic.vercel.app/)**

## Technologies

This project is built using modern full-stack web development technologies to ensure high performance, maintainability, and scalability. Below is a list of the key technologies and libraries used:

- **[Next.js](https://nextjs.org/)**: A powerful React-based framework for building server-rendered and statically generated web applications. Version `14.2.7` is used for optimized performance and features like dynamic routing, SSR (Server-Side Rendering), and API routes.

- **[React](https://reactjs.org/)**: A JavaScript library for building user interfaces, focusing on component-based architecture and efficient updates. This project uses React version `18` for features such as Concurrent Mode and Suspense.

- **[TypeScript](https://www.typescriptlang.org/)**: A statically typed superset of JavaScript that enhances code quality and maintainability by catching errors at compile time. The project uses TypeScript for improved developer experience and scalability.

- **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework that allows rapid UI development. Tailwind CSS, combined with `tailwind-merge` and `tailwindcss-animate`, helps create consistent and responsive designs with ease.

- **[React Hook Form](https://react-hook-form.com/)**: A flexible and efficient form management library. Paired with `Zod` for schema-based form validation, it simplifies handling forms and validation in React.

- **[Radix UI](https://www.radix-ui.com/)**: A collection of unstyled, accessible components such as checkboxes, radio buttons, and select dropdowns, used to build a customized and accessible UI.

- **[Appwrite](https://appwrite.io/)**: A backend-as-a-service platform used for managing databases, authentication, and storage in this project. The `node-appwrite` SDK simplifies integration with Appwrite’s API.

- **[Lucide Icons](https://lucide.dev/)**: A collection of beautiful, customizable icons used for enhancing the user interface.

- **[React Dropzone](https://react-dropzone.js.org/)**: A simple, flexible library for handling file uploads via drag-and-drop, improving the user experience for file management.

- **[ESLint](https://eslint.org/)**: A tool for identifying and fixing potential issues in JavaScript code. The project includes ESLint with Next.js-specific rules to enforce coding standards and ensure consistent quality.

This combination of technologies enables the project to be fast, responsive, and scalable, while also ensuring a high level of developer productivity and user experience.

## Key Features

**Registration and Login:**
- Users can create a new account or log in using existing credentials.

**User Panel:**
- Each registered user has access to their user panel.
- Ability to manage personal information, change password, etc.

**Browsing Resources:**
- Dynamic loading of data from the MongoDB database in real-time.
- The home page presents main resources or information.

**Creating and Editing Resources:**
- Allows users to add new resources to the system.
- Editing existing resources from the user interface.

**Search:**
- Advanced search features for users to quickly find the needed information.

**Authorization and Permissions:**
- Configured authorization systems determining which resources are available to individual users.

**Responsive Design:**
- User interface adapted to different devices, providing a consistent user experience.

## Planned Extensions

**Integration with External Services:**
- Planned integration with external services such as online payments, authorization systems, etc.

**Security Enhancements:**
- Planned implementation of additional security features, such as two-factor authentication.

**Multi-Language Support:**
- Planned functionality to support multiple languages in the user interface.

## Directory Structure

- `/MERN-APP`
  - `/client` 
    - `/node_modules`          
    - `/public`- Public files served by the development server
    - `/src/`- Source files of the application
      - `/assets/`- Static files
        - `/icons/`- Icons files
        - `/images/`- Graphics files
        - `/videos/`- Videos files
      - `/components/`- Reusable UI components
        - `/auth/`- Components for authentication
        - `/content/`- General components
          - `/footer/`- Footer components
          - `/forms/`- Forms components
          - `/landingPage/`- Landing page intro components
          - `/mainMenu/`- Main menu components
          - `/navbar/`- Navbar components
          - `/postDetails/`- Post details components
          - `/posts/`- Posts components
        - `/dialogs/`- Dialogs components
        - `/layout/`- Layout-related UI components
        - `/pages/`- Pages components
        - `/ui/`- Components specific to the Shadcn library
      - `/config/`- Configuration files used in the application
      - `/constants/`- Constant values
      - `/context/`- Context files
      - `/redux/`- Redux folders
        - `/api/`- Root folder for handling API-related code
        - `/actions/`- CRUD-related actions
        - `/reducers/`- Application`s state
        - `/store/`- Application state storage
      - `/utils/`- Tools to use throughout the application
      - `/App.jsx`- General component
      - `/index.jsx`- Entry point for the client-side application
      - `/index.scss`-Global styles and styling utilities for the application
      - `/index.html`- HTML template for the client application
  - `/api/`              
    - `/controllers/`- Controllers responsible for handling CRUD operations
    - `/middlewares/`- Middlewares related to CRUD operations.
    - `/models/`- Data models used in the application
    - `/routes/`- Route definitions for API endpoints
    - `/index.js`- Entry point for setting up and exporting the API
    - `/package.json`- Configuration file for managing API dependencies         
  - `/node_modules/`- Folder containing npm dependencies (automatically generated)        
  - `/.gitignore`- Configuration file specifying files and folders to be ignored by Git          
  - `/package.json`- Configuration file for managing project-level dependencies and scripts  
  - `/package-lock.json`- Automatically generated file locking dependencies versions        
  - `/README.md`- Project documentation providing an overview of the project structure and instructions for developers  
  - `/vercel.json`- Configuration file for Vercel deployment

## Setup

Follow these steps to set up the project locally.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/)

**Cloning the repository**

```bash
git clone https://github.com/MarioLuigie/HealthCare.git
cd healthcare
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Setup Environment Variables**

Create a new file named `.env.local` in the main catalog and add the following content:

```env
#GENERAL
APPWRITE_PROJECT_ID=
APPWRITE_API_KEY=
APPWRITE_DB_ID=
APPWRITE_DB_PATIENT_COLLECTION_ID=
APPWRITE_DB_DOCTOR_COLLECTION_ID=
APPWRITE_DB_APPOINTMENT_COLLECTION_ID=
APPWRITE_PUBLIC_BUCKET_ID=
NEXT_PUBLIC_APPWRITE_ENDPOINT=
```

Fill in the environmental variable values with your actual credentials.

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000/) in your browser to view the project.

## More
For more information please contact [mk.lotocki@gmail.com](mailto:mk.lotocki@gmail.com).


