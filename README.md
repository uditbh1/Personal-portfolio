
# Personal Portfolio Website

This is a dynamic and responsive personal portfolio website built to showcase projects, skills, education, and professional experience. It serves as a central hub for potential employers, collaborators, and anyone interested in learning more about my work and capabilities.

## ✨ Features

-   **Hero Section:** Engaging introductory section with animated background and call-to-action buttons.
-   **Project Showcase:** Displays a variety of personal and professional projects with descriptions, tech stacks, images, and links to GitHub repositories and live demos. Projects are filterable by tags.
-   **About Me:** A detailed section including a professional summary, key values, and an interactive, theme-aware profile card.
-   **Work Experience:** Timeline-style presentation of professional roles and responsibilities.
-   **Education:** Highlights academic background, degrees, and notable achievements (e.g., scholarships).
-   **Skills Section:** Categorized overview of technical skills with proficiency levels displayed using progress bars.
-   **Contact Form:** Allows visitors to send messages directly, with backend email sending functionality via Nodemailer.
-   **Responsive Design:** Optimized for seamless viewing across various devices, from desktops to mobile phones.
-   **Dark/Light Mode:** Includes a theme toggle for user preference, with the entire UI adapting to the selected mode.
-   **Interactive UI Elements:** Utilizes 3D cards for projects and an interactive profile card for a modern user experience.
-   **Smooth Scrolling & Navigation:** Easy navigation through different sections of the portfolio.

## 🚀 Technologies Used

-   **Framework:** [Next.js](https://nextjs.org/) (with App Router)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Styling:**
    -   [Tailwind CSS](https://tailwindcss.com/)
    -   [Shadcn/ui](https://ui.shadcn.com/) (Reusable UI components)
    -   CSS Variables for robust theming
-   **State Management:** React Context API (for theme, toasts)
-   **Animations:** [Framer Motion](https
://www.framer.com/motion/) (for some UI animations)
-   **Particle Effects:** [tsparticles](https://particles.js.org/) (for animated hero background)
-   **Form Handling:** [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) for validation
-   **Email Sending:** [Nodemailer](https://nodemailer.com/) (via a Next.js API route)
-   **Icons:** [Lucide React](https://lucide.dev/)
-   **AI Integration (Setup):** [Genkit (Firebase AI SDK)](https://firebase.google.com/docs/genkit) is configured for potential AI functionalities.
-   **Deployment:** Configured for [Firebase App Hosting](https://firebase.google.com/docs/app-hosting).

## 🛠️ Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/your-portfolio-repo.git
    cd your-portfolio-repo
    ```

2.  **Install dependencies:**
    Using npm:
    ```bash
    npm install
    ```
    Or using yarn:
    ```bash
    yarn install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of your project and add the necessary environment variables. For the contact form to send emails, you'll need to configure email credentials:
    ```env
    # For Nodemailer (e.g., using Gmail App Password)
    EMAIL_USER=your_email@gmail.com
    EMAIL_PASS=your_gmail_app_password
    EMAIL_TO=recipient_email@example.com # The email address where you want to receive messages
    ```
    Refer to `src/app/api/send-email/route.ts` for Nodemailer transport configuration.

## 🏃 Running the Development Server

To start the development server:

```bash
npm run dev
```
Or using yarn:
```bash
yarn dev
```
Open [http://localhost:9002](http://localhost:9002) (or the port specified in your `package.json`) in your browser to see the application.

The Genkit development server can be run separately if you are working on AI flows:
```bash
npm run genkit:dev
```

## 🏗️ Building for Production

To build the application for production:

```bash
npm run build
```
Or using yarn:
```bash
yarn build
```
This will create an optimized production build in the `.next` folder.

## ☁️ Deployment

This project is configured for deployment with Firebase App Hosting. The `apphosting.yaml` file contains basic configuration for the backend.

To deploy, you would typically use the Firebase CLI:
```bash
firebase deploy --only hosting:your-app-hosting-backend-id
```
Refer to the [Firebase App Hosting documentation](https://firebase.google.com/docs/app-hosting) for more details.

## 📂 Project Structure Overview

-   `src/app/`: Contains the main application routes and layout.
    -   `page.tsx`: The main entry point rendering all sections.
    -   `layout.tsx`: Root layout including header, footer, and theme provider.
    -   `globals.css`: Global styles and Tailwind CSS theme configuration.
    -   `api/`: API routes (e.g., for sending emails).
-   `src/components/`: Reusable UI components.
    -   `layout/`: Header and Footer components.
    -   `sections/`: Components for each major section of the portfolio (Hero, Projects, About, etc.).
    -   `ui/`: Shadcn/ui components and other general UI elements (e.g., Button, Card).
    -   `ThemeProvider.tsx`: Manages light/dark theme switching.
    -   `ThemeToggle.tsx`: UI for toggling the theme.
-   `src/data/`: Static data for the portfolio (projects, experience, skills, etc.).
-   `src/ai/`: Configuration and flows for Genkit AI.
    -   `genkit.ts`: Genkit initialization.
-   `public/`: Static assets like images and fonts.
-   `tailwind.config.ts`: Tailwind CSS configuration.
-   `next.config.ts`: Next.js configuration.

##🎨 Theming

The application supports both light and dark themes. The theme is managed by `next-themes` and can be toggled using the theme switcher in the header.
Theme colors are defined as CSS variables in `src/app/globals.css` and are utilized throughout the application and Shadcn/ui components.

##🤝 Contributing

Contributions, issues, and feature requests are welcome. Feel free to check issues page if you want to contribute.

---

This README provides a comprehensive guide to understanding, setting up, and running the personal portfolio website.
Enjoy exploring the code!
