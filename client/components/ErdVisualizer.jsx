import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';

import 'reactflow/dist/style.css';
// import './components/stylesheets/visualizer.css';

// const initialNodes = [
//   { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
//   { id: '2', position: { x: 50, y: 100 }, data: { label: '2' } },
//   { id: '3', position: { x: 0, y: 200 }, data: { label: '3' } },
// ];
const initialEdges = [
  // { id: 'e1-2', source: '1 ', target: '2', label: 'line' },
  // { id: 'e1-3', source: '1', target: '3' },
];



const ErdVisualizer = () => {
  const initialNodes = [];
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const data = useSelector((state) => state.diagram.data);
  useEffect(() => {
    console.log("THIS IS BERD DATA", data)
  }, [data])
  
  data.map((table, i) => { 
    
    const label = (
      <div>
        <h1>{table.table_name}</h1>
        <ul>{table.columns.map(column => <li>{column}</li>)}</ul>
      </div>
    )
    initialNodes.push({id: `${i}`, position: {x: (150*i), y: 0}, data: {label}})
})
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  // const onConnect = useCallback(
  //   (params) => setEdges((eds) => addEdge(params, eds)),
  //   [setEdges]
  // );
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <h1>BERD VIZISUALMALIZERATOR 3000</h1>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        // onConnect={onConnect}
      />
    </div>
  );
};

export default ErdVisualizer;
