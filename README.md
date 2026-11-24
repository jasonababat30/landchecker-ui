# Landchecker Property Search Frontend

A property search and watchlist application built with Next.js, React, and TypeScript for the Landchecker Senior Fullstack Coding Challenge.

## Features

- Browse and search available properties.
- Filter by price range, bedrooms, and property type.
- Navigate paginated property results.
- Register and log in to your account.
- Add and remove properties from your personal watchlist.
- Receive real-time property updates using Action Cable.
- Handle loading and error states.

## Tech Stack

- Next.js
- React and TypeScript
- Axios
- Jest and React Testing Library
- Rails Action Cable client

## Prerequisites

- Node.js and npm
- The Landchecker Rails API running locally

## Setup

Install dependencies:

```bash
npm install
```

Create `.env.local` in the project root:

```env
RAILS_API_URL=http://localhost:4000
NEXT_PUBLIC_CABLE_URL=ws://localhost:4000/cable
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Ensure the Rails API is running on port `4000`. The frontend uses the Next.js API rewrite to proxy API requests to Rails.

## Running Tests

```bash
npm test
```

## Related Backend

The Rails API is maintained in the separate `landchecker-api` repository.
