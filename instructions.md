✨ Project Overview
Build a professional, modern, and responsive website called EZMark. This site provides assignment writing services for students. The site should be simple, visually appealing, and optimized for mobile, tablet, and desktop users. There is no login functionality needed.

---

📅 Pages / Sections
1. Home Page
   - Display project name "EZMark" prominently.
   - Brief welcome text: "Professional Assignment Help For Students. Simple, Fast, Reliable."
   - Include a call-to-action button: "Leave Your Details"

2. About Section
   - Title: "About EZMark"
   - Description: Short paragraph explaining who you are and what services you offer (e.g., academic writing, editing, proofreading).

3. Services Section
   - List services:
     - Assignment Writing
     - Essay Assistance
     - Research Help
     - Editing & Proofreading
   - Each service should have a small icon and short description.

4. Contact / Leave Your Details Section
   - A contact form with the following fields:
     - Full Name (required)
     - Email Address (required)
     - Phone Number (optional)
     - Message (textarea)
   - A submit button labeled "Request a Callback"
   - Form should include basic validation.

---

🌈 Design Guidelines
- Use a modern and clean UI design with professional fonts (e.g., Inter, Roboto, or Open Sans).
- Use a color palette that reflects trust and academic professionalism (e.g., blue tones, white, dark gray).
- Use CSS Modules or styled-components for scoped styling.
- Add subtle animations/transitions for buttons and hover effects.
- Mobile-first responsive layout using flexbox or CSS grid.

---

🚀 Tech Stack & Tools
- React with TypeScript
- Vite for project setup
- React Hook Form for form handling and validation
- EmailJS (optional) for sending form submissions to your email
- SASS or Tailwind CSS (optional) for rapid styling

---

📆 Setup Instructions
1. Create the project:
   npm create vite@latest ezmark -- --template react-ts
   cd ezmark
   npm install

2. Install additional libraries:
   npm install react-hook-form
   # Optionally:
   # npm install emailjs-com

3. Project folder structure:
   src/
   ├── components/
   │   ├── Header.tsx
   │   ├── About.tsx
   │   ├── Services.tsx
   │   └── ContactForm.tsx
   ├── App.tsx
   ├── main.tsx
   └── styles/
       └── global.css or Tailwind setup

4. Responsive styling:
   - Use media queries to handle breakpoints: @media (max-width: 768px) etc.
   - Flexbox or Grid for layout

5. Best Practices:
   - Split UI into reusable components
   - Use TypeScript interfaces for props
   - Keep styles scoped
   - Keep code readable and modular

---

🔚 Deployment (optional)
Deploy the final site to Vercel or Netlify for a public-facing version.