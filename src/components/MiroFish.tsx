'use client';
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export default function MiroFish() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const width = 600;
    const height = 400;
    const numNodes = 200;
    
    // Mock Agent Consensus Sim
    const nodes = Array.from({ length: numNodes }, () => ({
      radius: Math.random() * 3 + 1,
      category: Math.floor(Math.random() * 3)
    }));

    const svg = d3.select(svgRef.current)
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', `0 0 ${width} ${height}`);
      
    svg.selectAll('*').remove(); // clear on re-render

    const simulation = d3.forceSimulation(nodes as any)
      .force('charge', d3.forceManyBody().strength(5))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(d => (d as any).radius + 1));

    const nodeElements = svg.append('g')
      .selectAll('circle')
      .data(nodes)
      .enter().append('circle')
      .attr('r', d => d.radius)
      .attr('fill', d => ['#06b6d4', '#f59e0b', '#10b981'][d.category]);

    simulation.on('tick', () => {
      nodeElements
        .attr('cx', d => (d as any).x)
        .attr('cy', d => (d as any).y);
    });

    return () => {
      simulation.stop();
    };
  }, []);

  return (
    <div className="flex flex-col relative w-full h-full p-4 border border-[#333] glassmorphism rounded">
       <h3 className="text-xs uppercase text-amber-500 mb-2 font-bold z-10">MiroFish: Autonomous Agent Swarm Consensus</h3>
       <svg ref={svgRef} className="flex-1 opacity-70"></svg>
    </div>
  );
}
