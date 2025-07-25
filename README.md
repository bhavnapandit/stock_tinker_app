# Stock Ticker Application

A comprehensive stock ticker application built with Next.js, featuring real-time stock search, detailed stock information, interactive charts, and SEO optimization.

## Features

- **Stock Search**: Real-time search functionality with autocomplete
- **Stock Details**: Comprehensive stock information pages with dynamic routing
- **Interactive Charts**: Price visualization using Recharts
- **SEO Optimized**: Proper META tags and Open Graph implementation
- **Rolling Ticker**: Live market data ticker bar
- **Favorites**: Save and manage favorite stocks (localStorage)
- **Responsive Design**: Mobile-first responsive design
- **Loading States**: Smooth loading experiences

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: Javascript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone `<repository-url>`
   cd stock-ticker-app
   \`\`\`
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

\`\`\`
├── app/
│   ├── layout.tsx          # Root layout with ticker bar
│   ├── page.tsx            # Home page with search
│   ├── stock/[symbol]/   # Dynamic stock detail pages
│   └── globals.css         # Global styles
├── components/
│   ├── search-component.tsx    # Stock search with autocomplete
│   ├── stock-chart.tsx         # Interactive price charts
│   ├── favorite-button.tsx     # Favorite functionality
│   ├── ticker-bar.tsx          # Rolling ticker bar
\`\`\`

## API Integration

The application is designed to integrate with the following APIs:

### Search API

\`\`\`
GET /api/assignment/search?keyword=RELIANCE&length=10
Host: portal.tradebrains.in
\`\`\`

### Stock Ticker API

\`\`\`Not using the API below as its response is currently 404, so using mock data instead.
GET /api/assignment/index/NIFTY/movers/
Host: portal.tradebrains.in
\`\`\`

### Stock Prices API

\`\`\`
GET /api/assignment/stock/SILVERLINE/prices?days=1&type=INTRADAY&limit=1
Host: portal.tradebrains.in
\`\`\`

## Features Implementation

### 1. Stock Search

### 2. Stock Details Page

### 3. SEO Implementation

### 4. Charts


\`\`\`
