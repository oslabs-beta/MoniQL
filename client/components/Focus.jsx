
import React, { useMemo, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  Handle,
  Position,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
 //must import reactflow css for visualizer to work
import 'reactflow/dist/style.css';
import {Card, CardContent, Typography, List, }  from "@mui/material"; 


const Focus = () => {
const initialNodes = [];
const initialEdges = [];
const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
const data = useSelector((state) => state.diagram.data);
const focusTable = useSelector((state) => state.diagram.focusTable);
const focusDepth = useSelector((state) => state.diagram.depth);

const CustomNode = ({ data }) => {
  return (
    <div style={{ border: '1px solid #777', padding: 10, borderRadius: 5, margin: 30}}>
      <Handle type="target" position={Position.Top} style={{ borderRadius: 5 }} />
      <h3>{data.label}</h3>
      <ul>
        {data.columns.map((column, index) => (
          <li key={index}>{column}</li>
        ))}
      </ul>
      <Handle type="source" position={Position.Bottom} style={{ borderRadius: 5 }} />
    </div>
  );
}

const nodeTypes = useMemo(() => ({ custom: CustomNode }), []);

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
        const columnArray = table.columns.map(column => column.name); //grab the column names from each table's column array
        console.log('COLUMNS!',columnArray)
        console.log(`found ${currTable} at index ${i}. coordinates will be x:${100 * xVal }, y:${100*yVal}`)
        newNodes.push({
          id: `${table.table_name}`,
          type: 'custom',  
          position: { x: 200 * xVal, y: 100 + 100 * yVal}, 
          data: {label: `${table.table_name}`, columns: columnArray}});
        //iterate thru foreign keys property of table
        if (table.foreign_keys) {
          xVal += 1;
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
  // console.log(newNodes)
  console.log('Nodes:', newNodes)
  console.log('Edges:', newEdges)
  setNodes(newNodes);

  setEdges(newEdges);
}, [data, focusTable, focusDepth]); // runs whenever `data` or `currNode` changes


  
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        // onConnect={onConnect}
        
      >
      {/* <Background color="#2A2A43"/> */}
    </ReactFlow>
    </div>
  );
};

export default Focus;
