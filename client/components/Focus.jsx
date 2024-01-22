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
const initialNodes = [{id: '1', position: { x: 100, y: 0}, data: {label: 'hellooo'}}];
const initialEdges = [];
const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
const data = useSelector((state) => state.diagram.data);
const [currNode, setCurrNode] = useState('people')



  useEffect(() => {
  console.log("THIS IS FOCUS DATA", data)
  const newNodes = [];
  const newEdges = [];
  const depth = 3;

  const addTable = (currTable, depth = 0) => {
    if (depth <= 0) {
      return;
    }
    data.forEach((table, i) => {
      if (table.table_name === currTable) {
        console.log(`found ${currTable} at index ${i}`)
        newNodes.push({id: `${table.table_name}`, position: { x: 200 * depth, y: 100 * i}, data: {label: `${table.table_name}`}});
        //iterate thru foreign keys property of table
        if (table.foreign_keys){
          console.log('helloooooo')
          table.foreign_keys.forEach(key => addTable(key.foreign_table, depth -= 1))
        }
        //recursively call addTable on each foreign key








        
        
      }
      else {
        console.log(i, 'hehehehe')
        return
      }
    })
  }
  addTable(currNode, depth)
  console.log(newNodes)
  setNodes(newNodes);
  console.log('THIS IS NODES NOW', nodes)
  setEdges(newEdges);
}, [data, currNode]); // runs whenever `data` or `currNode` changes


  
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <h1>BERD VIZISUALMALIZERATOR 3000</h1>
      <Select
      labelId="depth-select-label"
          label="currNode"
          id="depth-select"
          value={currNode}
          onChange={(e) => setCurrNode(e.target.value)}
          sx={{
            backgroundColor: "white",
            borderRadius: "5px",
          }}>
            <MenuItem value="people">people</MenuItem>
            <MenuItem value="planets">planets</MenuItem>

          </Select> 


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

