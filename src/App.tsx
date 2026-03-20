import { useState } from 'react'
import { TerminalLayout, Panel } from './components/TerminalLayout'
import { MarketOverview } from './components/MarketOverview'
import { DetailedMarket } from './components/DetailedMarket'
import { DeepDivePanel } from './components/DeepDivePanel'
import { MiroFishSimulation } from './components/MiroFishSimulation'
import { GlobalMacroPanel } from './components/GlobalMacroPanel'
import { ImpactNews } from './components/ImpactNews'
import { ArbitrageScanner } from './components/ArbitrageScanner'
import { AlphaTradeAnalyzer } from './components/AlphaTradeAnalyzer'
import type { PolymarketEvent } from './api/polymarket'

function App() {
  const [selectedEvent, setSelectedEvent] = useState<PolymarketEvent | null>(null);

  return (
    <TerminalLayout>
      <div className="grid grid-cols-12 grid-rows-12 gap-1.5 h-full w-full">
        {/* Left Column (3 Spans): Macros & Alpha Trade */}
        <div className="col-span-3 row-span-12 flex flex-col gap-1.5">
          <Panel title="God's Eye OSINT View" className="flex-[1.5]">
            <DeepDivePanel event={selectedEvent} />
          </Panel>
          <Panel title="Alpha Trade Engine" className="flex-[1.2] border-green-900/50 shadow-[0_0_15px_rgba(34,197,94,0.05)_inset]">
            <AlphaTradeAnalyzer />
          </Panel>
          <Panel title="Global Macro Context" className="flex-[1]">
            <GlobalMacroPanel />
          </Panel>
        </div>

        {/* Center Column (5 Spans): Main Market Overview & News */}
        <div className="col-span-5 row-span-12 flex flex-col gap-1.5">
          <Panel title="Market Overview" className="flex-[2.5]">
            <MarketOverview onSelect={setSelectedEvent} />
          </Panel>
          <Panel title="Global Impact News Feed" className="flex-[1]">
            <ImpactNews />
          </Panel>
        </div>

        {/* Right Column (4 Spans): Details, Arbitrage, MiroFish */}
        <div className="col-span-4 row-span-12 flex flex-col gap-1.5">
          <Panel title="Selected Market Details" className="flex-[1.5]">
            <DetailedMarket event={selectedEvent} />
          </Panel>
          
          <Panel title="HFT Arbitrage Scanner" className="flex-[1]">
            <ArbitrageScanner />
          </Panel>

          <Panel title="MiroFish Swarm Prediction Engine" className="flex-[1.2]">
            <MiroFishSimulation event={selectedEvent} />
          </Panel>
        </div>
      </div>
    </TerminalLayout>
  )
}

export default App
