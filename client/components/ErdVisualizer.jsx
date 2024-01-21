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

 //must import reactflow css for visualizer to work
import 'reactflow/dist/style.css';
// import './components/stylesheets/visualizer.css';

// const initialNodes = [
//   { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
//   { id: '2', position: { x: 50, y: 100 }, data: { label: '2' } },
//   { id: '3', position: { x: 0, y: 200 }, data: { label: '3' } },
// ];

//this is where we will map over the data and create nodes
const initialEdges = [
  // { id: 'e1-2', source: '1 ', target: '2', label: 'line' },
  // { id: 'e1-3', source: '1', target: '3' },
];



const ErdVisualizer = () => {
  const initialNodes = [];
  const initialEdges = [];
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const data = useSelector((state) => state.diagram.data);

  //this is where we will map over the data and create nodes
  //edges will ALSObe created here
  useEffect(() => {
    console.log("THIS IS BERD DATA", data)
    const newNodes = [];
    const newEdges = [];

    data.forEach((table, i) => {
      const label = (
        <div>
          <h1>{table.table_name}</h1>
          <ul>
            {table.columns.map((column, index) => (
              <li key={index}>{column}</li>
            ))}
          </ul>
        </div>
      );
      newNodes.push({
        id: `${table.table_name}`,
        position: { x: 150 * i, y: 0 },
        data: { label },
      });

      if (table.foreign_keys) {
        table.foreign_keys.forEach((fk) =>
          newEdges.push({
            id: `e${table.table_name}-${fk.foreign_table}`,
            source: `${table.table_name}`,
            target: `${fk.foreign_table}`,
          })
        );
      }
    });

    setNodes(newNodes);
    setEdges(newEdges);
  }, [data, setNodes, setEdges]);
  // const onConnect = useCallback(
  //   (params) => setEdges((eds) => addEdge(params, eds)),
  //   [setEdges]
  // );
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <h1>BERD VIZISUALMALIZERATOR 3000</h1>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        // onConnect={onConnect}
        
      >
      <MiniMap />
      <Controls />
      <Background />
    </ReactFlow>
    </div>
  );
};

export default ErdVisualizer;
