# Zomato Lite

A refined, responsive restaurant discovery and review web application inspired by Zomato, built with Next.js 15, React 19, Tailwind CSS, and Neon PostgreSQL.

## Features

- **Restaurant Discovery**: Browse curated restaurants with cuisine categories, locations, imagery, and dynamic ratings.
- **Detailed Restaurant Views**: In-depth restaurant profiles featuring address details, pricing, cuisine tags, and customer reviews.
- **Interactive Review System**:
  - Dynamic star rating selector (1–5 stars)
  - Interactive review submission with real-time validation and feedback
  - Real-time rating aggregation (dynamic average rating and total review counts)
  - Chronological review feeds displaying the latest customer feedback
- **Database Persistence**: Persistent review storage and calculation backed by Neon PostgreSQL.
- **Modern Design & Accessibility**: Responsive desktop and mobile layout with clean typography, high contrast, and accessible UI controls.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Database**: Neon Serverless PostgreSQL (`@neondatabase/serverless`)
- **Language**: TypeScript

## Architecture

```text
Frontend (React 19 / Next.js Client Components)
  ↓
Next.js App Router (Server-side rendering & route handlers)
  ↓
API Routes (/api/reviews, /api/restaurants/[id])
  ↓
Neon PostgreSQL (Serverless relational database)
```

- **Review Submission**: Reviews are submitted via `POST /api/reviews` and stored directly in the PostgreSQL database.
- **Restaurant & Review Retrieval**: Restaurant details and current review metrics are retrieved through `GET /api/restaurants/[id]`.
- **Dynamic Aggregation**: `averageRating` and `totalReviews` are calculated dynamically from database records on each request, ensuring metrics are always synchronized.
- **Durable Persistence**: All reviews persist reliably in Neon PostgreSQL. The frontend does not use `localStorage` for review persistence.

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
├── components/                        # Modular UI components
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

## API Endpoints

### POST /api/reviews
**Purpose**: Submit a restaurant review.

Validates:
- `restaurantId`: Positive integer referring to an existing restaurant in the database
- `rating`: Integer between 1 and 5
- `comment`: Non-empty string after trimming whitespace
- Restaurant existence: Confirms the target restaurant exists prior to inserting

**Response**: Returns HTTP `201 Created` with `{ "success": true, "reviewId": <id> }` on successful creation.

### GET /api/restaurants/[id]
**Purpose**: Retrieve restaurant details and current review information.

Returns:
- Restaurant information (`name`, `cuisine`, `area`)
- `averageRating`: Dynamically calculated average rating rounded to 1 decimal place (or `null` if no reviews exist)
- `totalReviews`: Total count of reviews in the database
- `latestReview`: Most recent review object (or `null` if no reviews exist)
- `reviews`: Complete array of reviews ordered chronologically with newest first

All metrics (`averageRating`, `totalReviews`, `latestReview`) are computed dynamically from database records.

## Scripts

The following scripts are defined in `package.json`:

- `npm run dev`: Starts the Next.js development server on `0.0.0.0:3000`.
- `npm run build`: Compiles and builds the application for production using `next build`.
- `npm run start`: Starts the Next.js production server on `0.0.0.0:3000`.
- `npm run lint`: Runs TypeScript type checking (`tsc --noEmit`) to validate type safety across the project without generating build outputs (does not run ESLint).
- `npm run db:setup`: Executes `scripts/setup-db.ts` to provision database tables (`restaurants`, `reviews`) and seed initial restaurant and review data.

## License

MIT License
