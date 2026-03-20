# KRATOS Terminal

A highly aesthetic, Bloomberg Terminal-style dashboard built for tracking prediction markets (Polymarket & Kalshi). It features advanced data tracking including a mocked God's Eye OSINT aggregator, live interactive Globe, and a simulation panel that mocks the 666ghj/MiroFish multi-agent Swarm Intelligence prediction model.

## Features

- **Dark Amber Terminal Aesthetic**: CRT scanline effects, text-shadow glowing typography, custom scrollbars, and dense but readable grid layouts.
- **Market Overview**: Live data fetcher from Polymarket's Gamma API, injected with mock Kalshi regulated events for cross-platform tracking. Filterable by search.
- **Global Macro Context**: Real-time traditional market mocks (NASDAQ, S&P 500) and Crypto Major pairs for correlation tracking.
- **God's Eye OSINT View**: 
  - *Sports Markets*: Historical win rates, injury reports, momentum tracking.
  - *Non-Sports Markets*: Global OSINT aggregation, Sentiment Analysis (Social/News/Dark Web), and Regulatory/Legal docket scraping simulation. Features a 3D rotating globe (`cobe`).
- **MiroFish Swarm Simulation**: Mocks the process of a 1000-agent parallel intelligence engine analyzing a specific market to provide an updated probability forecast.

## How to Run Locally

You will need Node.js (v18+) installed.

1. **Navigate to the terminal directory**:
   ```bash
   cd kratos-terminal
   ```

2. **Install the dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Access the application**:
   Open your browser and navigate to `http://localhost:5173`. 

*Note: The application is responsive but is best viewed on a desktop monitor in full screen to appreciate the terminal dashboard layout.*
