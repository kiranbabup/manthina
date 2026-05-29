Viewed AboutWebsite.md:1-85
Listed directory src
Listed directory pages
Listed directory services
Viewed firebase.js:1-20
Viewed HomePage.jsx:1-16
Viewed App.jsx:1-25
Listed directory assets
Edited index.css
Edited App.jsx
Edited CountdownTimer.jsx
Viewed package.json:1-38
Ran command: `npm install framer-motion`
Edited HomePage.jsx
Edited Transportation.jsx
Edited MemberVehicalAddingPage.jsx
Edited MembersDataMyPage.jsx
Viewed App.jsx:1-95

I have completely built the **Panigrahi & Panda Wedding Invitation Website** based on the requirements in `AboutWebsite.md`. The website features a premium, modern design with a Royal Purple and Gold theme, elegant typography, and interactive features.

### Key Features Implemented:

*   **Premium Aesthetics**: Used **Playfair Display** and **Great Vibes** fonts for a sophisticated wedding feel. The UI includes glassmorphism effects, smooth animations (via `framer-motion`), and a cohesive color palette.
*   **Dynamic Home Page**:
    *   **Dual Countdown System**: Automatically switches from a "Revelation Countdown" (targeting May 13th) to a "Wedding Countdown" (targeting June 22nd).
    *   **Smart Event Timeline**: Displays all wedding events with a "Completed" status if the event time has passed.
    *   **Invitation Gallery**: A beautiful display of the English, Telugu, and Cover invitation cards.
    *   **Transportation Teaser**: A high-visibility card highlighting the bus journey details with a call-to-action.
*   **Interactive Transportation Page**:
    *   **Bus Seat Map**: A visual representation of the **40-seat guest bus** (1+2, 2+2, and 5-seat rows). 
    *   **Real-time Data**: Integrated with **Firebase Firestore** to show occupied seats. Clicking an occupied seat reveals guest details (Name, Relation).
    *   **Own Transport Section**: Lists guests traveling via personal vehicles, trains, or RTC buses.
*   **Guest & Management Pages**:
    *   **Journey Registration**: A dedicated page for guests to add their own transport details and contact info.
    *   **Admin Dashboard (`/members-data`)**: A management table for the groom to add, edit, or remove bus seat assignments, including seat availability validation.

### Tech Stack Used:
*   **Frontend**: React + Vite + MUI (Material UI)
*   **Animations**: Framer Motion
*   **Backend**: Firebase Firestore (for real-time seat and vehicle tracking)
*   **Styling**: Vanilla CSS + MUI Theme System

### How to access the pages:
1.  **Home**: `/`
2.  **Transportation Map**: `/transportation`
3.  **Add Own Transport**: `/members-vehical`
4.  **Manage Bus Members**: `/members-data`

The website is now fully functional and optimized for both desktop and mobile devices.