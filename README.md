# Zomato Lite

A refined, responsive restaurant discovery and review web application inspired by Zomato, built with Next.js 15, React 19, Tailwind CSS, and Neon PostgreSQL.

---

## Features

- **Restaurant Discovery**: Browse curated restaurants with cuisine categories, locations, imagery, and dynamic ratings.
- **Detailed Restaurant Views**: In-depth restaurant profiles featuring address details, pricing, cuisine tags, and customer reviews.
- **Interactive Review System**:
  - Dynamic star rating selector (1–5 stars)
  - Interactive review submission with real-time feedback
  - Real-time rating aggregation (dynamic average rating and total review counts)
  - Chronological review feeds showing the latest customer feedback
- **Database Persistence**: Backed by a serverless PostgreSQL database (Neon) for review storage and calculations.
- **Modern Design & Accessibility**: Responsive desktop and mobile layout with clean typography, high contrast, and accessible UI elements.

---

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.github.io/lucide/)
- **Database**: [Neon Serverless PostgreSQL](https://neon.tech/) (`@neondatabase/serverless`)
- **Language**: TypeScript

---

## Project Structure

```text
├── app/
│   ├── api/
│   │   ├── restaurants/[id]/route.ts  # Dynamic restaurant detail & review aggregation API
│   │   └── reviews/route.ts           # Review submission API endpoint
│   ├── restaurant/[id]/               # Restaurant detail page
│   ├── review/[restaurantId]/         # Review submission page
│   ├── layout.tsx                     # Root layout & global providers
│   ├── page.tsx                       # Homepage & restaurant discovery grid
│   └── globals.css                    # Tailwind CSS imports
├── components/                        # Modular, reusable UI components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── RestaurantCard.tsx
│   ├── RestaurantGrid.tsx
│   ├── ReviewCard.tsx
│   ├── ReviewForm.tsx
│   ├── StarRating.tsx
│   └── ...
├── lib/
│   ├── data.ts                        # Static seed data & restaurant metadata
│   ├── db.ts                          # Neon database client initialization
│   └── types.ts                       # TypeScript interfaces and types
├── public/
│   └── images/                        # High-resolution restaurant imagery
└── scripts/
    └── setup-db.ts                    # Database initialization & seeding script
```

---

## Getting Started

### Prerequisites

- Node.js 18+ (or Bun)
- PostgreSQL database URL (e.g., Neon serverless PostgreSQL connection string)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/<username>/zomato-lite.git
   cd zomato-lite
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   Add your database connection string in `.env.local`:
   ```env
   DATABASE_URL=postgresql://user:password@host/database?sslmode=require
   ```

4. Initialize database schema & seed initial reviews (optional):
   ```bash
   npm run db:setup
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Scripts

- `npm run dev` - Start the development server on port 3000
- `npm run build` - Build the project for production
- `npm run start` - Start the production server
- `npm run lint` - Run TypeScript type checks (`tsc --noEmit`)
- `npm run db:setup` - Run the database migration and seed script

---

## License

MIT License
