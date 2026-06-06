# Product Requirements Document (PRD) - F1fitness

## 1. Product Overview
**F1fitness** is an elite, luxury fitness brand targeting high-performance individuals, professional athletes, and business executives. The website serves as a premium landing page to showcase the facility's world-class amenities, exclusive community, and state-of-the-art equipment, ultimately driving membership applications.

## 2. Target Audience
- Professional Athletes.
- High-net-worth individuals and business executives.
- Fitness enthusiasts looking for an exclusive, luxury environment.
- Individuals seeking advanced recovery and personalized elite coaching.

## 3. Key Features & Functional Requirements

### 3.1. Navigation & Header
- **Sticky Navbar**: Moves from transparent to a solid background (`#000` or semi-transparent) when the user scrolls past 50px.
- **Links**: Navigational links to `Tour`, `Facility`, `Amenities`, `Members`, and a primary CTA `Join Now`.
- **Mobile Support**: Hamburger menu for tablet and mobile views.

### 3.2. Hero Section (Apex of Performance)
- **Visual**: A high-resolution canvas-based animation sequence (`hero-canvas`) playing an infinite loop of luxury gym imagery.
- **Overlay**: Dark overlay for text readability.
- **Content**: H1 Title "F1 FITNESS", subtitle, and a "Claim Your Invite" button anchoring to the CTA section.
- **Socials Bar**: A vertical floating list of social media icons (Instagram, Facebook, Twitter, YouTube) on the left side of the hero section that slide slightly on hover (hidden on mobile viewports to prevent layout clutter).
- **Scroll Indicator**: Visual hint for users to scroll.

### 3.3. Experience Pulse (Stats Bar)
- **Counters**: Animated number counters that trigger when the section comes into view:
    - 15+ Years of Excellence.
    - 5000+ Members Transformed.
    - 80+ Weekly Classes.
- **Animations**: Subtle fade-in-up effects for each stat card.

### 3.4. "Beyond the Limit" Section
- **Context**: A storytelling section showcasing raw training intensity.
- **Media**: A background image with a prominent 9:16 vertical video player (`tour.mp4`) showcasing club highlights.
- **Interactivity**: The video should autoplay in a loop, muted and playsinline.

### 3.5. Facility Gallery
- **Layout**: A curated grid of facility areas (Power lifting, Cardio, Games, Strength, Zumba, Calisthenics).
- **Interaction**: On hover, each image should slightly zoom and lift to focus on the premium facility visuals.
- **Lazy Loading**: Images must load efficiently to maintain site performance.

### 3.6. Elite Amenities
- **Content**: Highlights specific services like World-Class Trainers, Advanced Recovery (Cold plunges, saunas), and Premium Locker Rooms.
- **Animations**: Slide-in-left and Slide-in-right effects for visual engagement.

### 3.7. Membership Pricing Section
- **Tier Structure**: Three customized membership levels:
    - **Men's Membership**: Customized for male athletes (₹2,999/mo) with unlimited access to strength & cardio decks, premium lockers, and trainer assessments.
    - **Women's Membership**: Customized for female athletes (₹2,999/mo) with unlimited access to strength & cardio, premium vanity lockers, and free Zumba & Yoga classes.
    - **Couple's Membership** (Best Value): Dual membership (₹4,999/mo) with full access for 2 people, recovery lab access (saunas/cold plunges), 2 trainer sessions/month, and VIP couples lounge access.
- **Aesthetics**: Glassmorphism cards with hover lifts, a glowing outline and special badge for the recommended Featured tier, and a full-width call-to-action button linking directly to the application form. Clicking "Select Plan" automatically scrolls the user to the application form and pre-fills the message field with interest in that specific plan.

### 3.8. "Champion Mindset" Testimonials
- **Infinite Scroller**: Two rows of testimonial cards moving horizontally in opposite directions.
- **Control**: Powered by GSAP ScrollTrigger, where the scroller movement is tied to the page scroll (scrubbed animation).
- **Aesthetic**: Premium cards with quote marks and professional author attribution.

### 3.9. Application CTA Section
- **Objective**: Lead generation.
- **Fields**: Full Name (Required, red asterisk), Email Address (Required, red asterisk), Phone Number (Required, red asterisk), and Message (Optional).
- **Feedback**: Client-side validation. Integrated with Web3Forms via the AJAX/fetch API to forward submissions directly to the owner's email, displaying interactive submission states (Submitting, Success, and Error alerts).

### 3.10. Footer
- **Structure**: Brand logo, site exploration links, legal links (Privacy, Terms), social media links (Instagram, Facebook, Twitter, YouTube), and copyright information.

### 3.11. Sticky WhatsApp Button
- **Placement**: Fixed at the bottom right corner of the viewport across all sections.
- **Aesthetic**: Circular icon styled with WhatsApp green (`#25d366`), featuring hover scaling and a soft green shadow.
- **Responsiveness**: Automatically scales down on mobile viewports.

## 4. Technical Specifications
- **Frameworks**: No heavy JS frameworks (React/Vue). Vanilla JS for performance.
- **Animations**: 
    - **GSAP**: Used for complex scroll-driven animations (Testimonial ribbon, Canvas frame shifts).
    - **Intersection Observer**: Used for standard entry animations (fades/slides).
- **Styling**: Vanilla CSS with modern Flexbox/Grid layouts. Luxury color palette (Black, White, Accent Silver/Gold).
- **Performance**: High emphasis on image optimization and smooth 60fps animations.

## 5. Test Scenarios (Success Criteria)
1. **Nav Interaction**: Clicking "Facility" scrolls the user precisely to the Facility section.
2. **Hero Animation**: The canvas sequence begins playing immediately on load.
3. **Stat Triggers**: The "Years of Excellence" counter animates from 0 to 15 only when scrolled into view.
4. **Scroller Behavior**: The testimonial ribbon moves left/right when the user scrolls up/down.
5. **Form Validation**: Submitting an empty email field triggers a browser validation message.
6. **Form Success**: Submitting valid data triggers the "Welcome to the elite" alert.
