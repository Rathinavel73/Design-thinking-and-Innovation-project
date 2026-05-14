# Hostel Food Feedback System architecture

This document explains the architecture and the overall flow of the QR-based Hostel Food Feedback system.

## 1. QR Code Flow Explained

1. **Physical Generation**: The admin generates a QR code pointing directly to the web app's `index.html` (e.g., `https://hostel.rajalakshmi.edu/`).
2. **Scanning Phase**: When students walk into the dining area and scan the QR, their browser opens `index.html`.
3. **Smart Routing (`js/main.js`)**: 
   - The script immediately checks `localStorage` for a valid JWT authentication token (`isLoggedIn()`).
   - **If Token Exists (Returning User):** They are automatically routed to `feedback.html` bypassing the login screen seamlessly.
   - **If No Token (First time/Logged out):** They are routed to `login.html`. From there they can click "Register" if it's their first time.
4. **Time Detection**: Once logged in and on `feedback.html`, JavaScript parses the current local time. Depending on the time brackets specified (e.g. 6:30 AM to 11AM), it resolves the `Meal Type` (Breakfast, Lunch, Snacks, Dinner) and dynamically injects the appropriate menu and banner imagery into the DOM.

## 2. Technical Decisions

*   **Glassmorphism aesthetic:** In `styles.css`, cards utilize `backdrop-filter: blur(10px)` layered over rich UI images. This solves the "plain website" problem and introduces an ultra-premium feel compared to standard flat designs.
*   **Domain restriction:** Check is done right in JavaScript on the form submit (`isValidEmailDomain`) before making expensive HTTP API requests. In the real system, this will also be backed by a Spring Boot validation layer to prevent spoofing.
*   **Decoupled Frontend/Backend:** By separating Frontend (`.html`, `.js`) and Backend (Spring Boot REST APIs), the frontend can be hosted statically (e.g., via AWS S3 or GitHub Pages) ensuring extremely fast loading times for students waiting in queues.

## 3. Suggestions for Realism & Expansion

To make this college project truly stand out during evaluation:

1. **Real-time Stats with WebSockets:** In the admin page, use Spring WebSockets to make the total number of feedbacks update in real-time as students submit them.
2. **PWA (Progressive Web App):** Add a `manifest.json` and a simple Service Worker. This allows students to "Add to Home Screen" making it look exactly like a native Android/iOS app without downloading from app stores.
3. **Sentiment Analysis:** Add an AI library (like Stanford CoreNLP or a fast Python microservice) that automatically scores textual comments as "Positive", "Neutral", "Negative" so admins don't have to read hundreds of feedbacks manually.
4. **Automated Weekly Menu Update:** Store the menu rotation as a config in DB. Create a Spring `@Scheduled` cron job that resets the active voting poll options automatically every Sunday night.
