"use client";
import React, { useCallback } from "react";
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
} from "@xyflow/react";

interface Paper {
  id: string;
  title: string;
  topics: string[];
}

interface KnowledgeGraphProps {
  papers: Paper[];
}

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

export default function KnowledgeGraph({ papers }: KnowledgeGraphProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  React.useEffect(() => {
    if (papers.length === 0) return;

    // Assume the first paper is the current paper (central node)
    const currentPaper = papers[0];
    const relatedPapers = papers.slice(1);

    // Create central node for current paper
    const centralNode: Node = {
      id: currentPaper.id,
      type: 'default',
      position: { x: 400, y: 200 },
      data: {
        label: (
          <div className="text-center">
            <div className="font-bold text-purple-600">{currentPaper.title}</div>
            <div className="text-xs text-gray-600 mt-1">
              {currentPaper.topics.join(', ')}
            </div>
          </div>
        ),
      },
      style: {
        background: '#f3e8ff',
        border: '2px solid #9333ea',
        borderRadius: '12px',
        padding: '15px',
        width: 200,
        fontWeight: 'bold',
      },
    };

    // Create nodes for related papers
    const relatedNodes: Node[] = relatedPapers.map((paper, index) => {
      const angle = (index / relatedPapers.length) * 2 * Math.PI;
      const radius = 250;
      const x = 400 + radius * Math.cos(angle);
      const y = 200 + radius * Math.sin(angle);

      return {
        id: paper.id,
        type: 'default',
        position: { x, y },
        data: {
          label: (
            <div className="text-center">
              <div className="font-semibold">{paper.title}</div>
              <div className="text-xs text-gray-500 mt-1">
                {paper.topics.join(', ')}
              </div>
            </div>
          ),
        },
        style: {
          background: '#e3f2fd',
          border: '1px solid #2196f3',
          borderRadius: '8px',
          padding: '10px',
          width: 180,
        },
      };
    });

    const allNodes = [centralNode, ...relatedNodes];

    // Create edges from current paper to related papers (representing citations)
    const paperEdges: Edge[] = relatedPapers.map((paper) => ({
      id: `${currentPaper.id}-${paper.id}`,
      source: currentPaper.id,
      target: paper.id,
      type: 'smoothstep',
      style: { stroke: '#9333ea', strokeWidth: 2 },
      markerEnd: { type: 'arrowclosed' },
    }));

    setNodes(allNodes);
    setEdges(paperEdges);
  }, [papers, setNodes, setEdges]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className="w-full aspect-video bg-gradient-to-br from-black via-gray-900/30 to-black border border-white/10 rounded-lg overflow-hidden relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        attributionPosition="bottom-left"
        style={{ background: 'transparent' }}
      >
        <Controls className="text-white" />
        <Background color="rgba(255,255,255,0.05)" gap={50} />
      </ReactFlow>
      {/* Custom Axes Overlay */}
      <svg
        className="absolute inset-0 pointer-events-none"
        width="100%"
        height="100%"
        style={{ zIndex: 10 }}
      >
        {/* X-axis */}
        <line
          x1="0%"
          y1="50%"
          x2="100%"
          y2="50%"
          stroke="rgba(139, 92, 246, 0.3)"
          strokeWidth="1"
          strokeDasharray="5,5"
        />
        {/* Y-axis */}
        <line
          x1="50%"
          y1="0%"
          x2="50%"
          y2="100%"
          stroke="rgba(139, 92, 246, 0.3)"
          strokeWidth="1"
          strokeDasharray="5,5"
        />
        {/* Center point */}
        <circle
          cx="50%"
          cy="50%"
          r="3"
          fill="rgba(139, 92, 246, 0.6)"
        />
        {/* Axis labels */}
        <text
          x="95%"
          y="45%"
          fill="rgba(255,255,255,0.6)"
          fontSize="12"
          textAnchor="end"
        >
          Related Papers →
        </text>
        <text
          x="52%"
          y="5%"
          fill="rgba(255,255,255,0.6)"
          fontSize="12"
          textAnchor="start"
        >
          ↑ Citations
        </text>
      </svg>
    </div>
  );
}
