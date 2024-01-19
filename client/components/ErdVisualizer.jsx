import { useDispatch, useSelector } from 'react-redux';
import React, { useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
const initialNodes = [
  { 
    id: '1', 
    position: { x: 0, y: 0 }, 
    data: { 
      label: '1',
      style: { background: 'lightblue', color: '#fff', padding: '10px' } 
    } 
  },
  { 
    id: '2', 
    position: { x: 0, y: 100 }, 
    data: { 
      label: '2',
      style: { background: 'lightgreen', color: '#fff', padding: '10px' } 
    } 
  },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

const ErdVisualizer = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
 
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );
 return (
    <div>
      <h1>BERD VIZISUALMALIZERATOR 3000</h1>
      <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
      </div>
    </div>
    )
}
    
export default ErdVisualizer;