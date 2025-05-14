House Legends – Luxury Bartending Platform
House Legends is a modern, full-stack web platform designed to deliver a luxurious, interactive, and educational experience for bartending enthusiasts, professionals, and event organizers. The platform seamlessly integrates advanced booking, course certification, gallery, and contact systems within a beautifully branded, responsive user interface.

Key Features
1. Courses & Certification
Comprehensive bartending courses, including “Basics in Bartending” and “Pro Level Bartending,” based on IBA standards.
Interactive quizzes for each course; users must pass to request a certificate.
Automated PDF certificate generation and email delivery upon completion.
User dashboard for tracking course progress and downloading certificates.
2. Booking System
Modern, calendar-based booking interface for events and services.
Admin dashboard with calendar view, CSV export, and email confirmations.
Secure, JWT-protected admin routes and hashed user passwords.
3. Gallery & Admin Moderation
Dynamic gallery with support for captions, tags, and bulk uploads.
Admin moderation tools for approving and editing images.
4. Contact & Communication
Integrated contact form with real email delivery (Nodemailer/SMTP).
Spam protection via honeypot field and planned CAPTCHA integration.
All contact messages stored securely for admin review.
5. User Experience & Design
Luxury branding with a consistent color palette, modern iconography, and subtle animations.
Fully responsive design for seamless use on desktop and mobile.
Dark/light mode toggle with persistent theme.
Accessible navigation (ARIA labels, keyboard navigation), and toast notifications for user feedback.
6. Progressive Web App (PWA)
Installable on desktop and mobile devices.
Offline support via service worker and asset caching.
Custom manifest and branded icons for a native-app feel.
7. Analytics & SEO
Integrated privacy-friendly analytics (Plausible).
SEO meta tags, Open Graph, and structured data for search and social sharing.
Technology Stack
Frontend: HTML, CSS, JavaScript (with modular structure), PWA enhancements.
Backend: Node.js, Express, JWT authentication, PDFKit, Nodemailer.
Database: Flexible structure for users, bookings, courses, and gallery assets.
Deployment: Designed for cloud platforms (Render, Vercel, Netlify), with easy integration into Squarespace via iframe or developer mode.
Security & Best Practices
All secrets and credentials are managed via environment variables.
Admin and sensitive routes are protected by JWT.
Rate limiting and HTTP security headers (Helmet) are enforced.
Codebase is linted and type-checked (TypeScript support for server/client/shared code).
Use Cases
Learners: Enroll in courses, take quizzes, and earn certificates.
Event Organizers: Book bartending services and receive instant confirmations.
Admins: Moderate gallery, manage bookings, export data, and review contact inquiries.
General Users: Browse the gallery, learn about bartending, and contact House Legends for services.
Enjoy a world-class, luxury bartending platform!
House Legends is the ultimate digital platform for modern, luxury bartending—combining education, event management, and brand storytelling in one seamless, interactive experience.# legends-2.0m
