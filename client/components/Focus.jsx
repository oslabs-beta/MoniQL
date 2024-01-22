
import React, { useCallback, useEffect, useState } from 'react';


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
import {Select, MenuItem} from "@mui/material"; 
const Focus = () => {
const initialNodes = [];
const initialEdges = [];
const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
const data = useSelector((state) => state.diagram.data);
const focusTable = useSelector((state) => state.diagram.focusTable);
const focusDepth = useSelector((state) => state.diagram.depth);



  useEffect(() => {
  console.log("THIS IS FOCUS DATA", data)
  console.log(`THIS IS DEPTH ${focusDepth}`)
  const newNodes = [];
  const newEdges = [];

  const addTable = (currTable, pizza = 0, xVal = 0, yVal = 0) => {
    console.log(`NEW CALL OF addTable. table now = '${currTable}' xVal now = ${xVal}`)
    if (xVal > pizza) {
      return;
    }
    data.forEach((table, i) => {
      if (table.table_name === currTable) {
        console.log(`found ${currTable} at index ${i}. coordinates will be x:${100 * xVal }, y:${100*yVal}`)
        newNodes.push({
          id: `${table.table_name}`,  
          position: { x: 200 * xVal, y: 100 + 100 * yVal}, 
          data: {label: `${table.table_name}`}});
        //iterate thru foreign keys property of table
        if (table.foreign_keys) {
          xVal += 1;
          console.log('helloooooo')
          table.foreign_keys.forEach((key, j) => {
            newEdges.push({
              id: `e${currTable}-${key.foreign_table}`,
              source: `${currTable}`,
              target: `${key.foreign_table}`,
            })
            addTable(key.foreign_table, pizza, xVal, yVal = j);
          });
        }
      }
    })
  }
  addTable(focusTable, focusDepth)
  console.log(newNodes)
  setNodes(newNodes);
  console.log('THIS IS NODES NOW', nodes)
  setEdges(newEdges);
}, [data, focusTable, focusDepth]); // runs whenever `data` or `currNode` changes


  
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
      <Background />
    </ReactFlow>
    </div>
  );
};

export default Focus;
