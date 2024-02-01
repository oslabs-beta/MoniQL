import React, { useCallback, useMemo, useEffect, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  Handle,
  Position,
  useNodesState,
  useEdgesState,
  addEdge,
  isEdge,
  Panel,
} from "reactflow";
//must import reactflow css for visualizer to work
import "reactflow/dist/style.css";
import { Card, CardContent, Typography, List } from "@mui/material";
// import style from "./stylesheets/visualizer";
import styled, { ThemeProvider } from "styled-components"; 
import { ReactFlowProvider } from "react-flow-renderer";
//This
  ////////////////////////////**********HAY STACK**********//////////////////////////////
  ///////////////////////  /////**********HAY STACK**********//////////////////////////////


  const lightTheme = {
    bg: "#fff",
    primary: "#ff0072",

    nodeBg: "#f2f2f5",
    nodeColor: "#222",
    nodeBorder: "#222",

    minimapMaskBg: "#f2f2f5",

    controlsBg: "#fefefe",
    controlsBgHover: "#eee",
    controlsColor: "#222",
    controlsBorder: "#ddd",
  };
  const darkTheme = {
    bg: "#000",
    primary: "#ff0072",

    nodeBg: "#343435",
    nodeColor: "#f9f9f9",
    nodeBorder: "#888",

    minimapMaskBg: "#343435",

    controlsBg: "#555",
    controlsBgHover: "#676768",
    controlsColor: "#dddddd",
    controlsBorder: "#676768",
  };

  // const CustomNode = styled.div`
  //   padding: 10px 20px;
  //   border-radius: 5px;
  //   width: 8px;
  //   height: 10px;
  //   background: ${(props) => props.theme.nodeBg};
  //   color: ${(props) => props.theme.nodeColor};
  //   border: 1px solid
  //     ${(props) =>
  //       props.selected ? props.theme.primary : props.theme.nodeBorder};

  //   .react-flow__handle {
  //     background: ${(props) => props.theme.primary};
  //     width: 8px;
  //     height: 10px;
  //     border-radius: 3px;
  //   }
  // `;

  ////////////////////////////**********HAY STACK**********//////////////////////////////

  ////////////////////////////**********HAY STACK**********//////////////////////////////

const Focus = ({children, elements}) => {

  const initialNodes = [];
  const initialEdges = [];
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const data = useSelector((state) => state.diagram.data);
  const focusTable = useSelector((state) => state.diagram.focusTable);
  const focusDepth = useSelector((state) => state.diagram.depth);

  ///////////////////////NODE STYLE/////////////////////////
  ////////////////////////////**********HAY STACK**********//////////////////////////////


  const nodeStyle = {
    width: "150px", // Fixed width
    height: "200px", // Fixed height
    // border: "1px solid #777",
    // padding: 20,

  };
  // const listStyle = {
  //   textAlign: 'left',

  // }

  const CustomNode = ({ data }) => {
    return (
      <div >
        <Handle
          type="target"
          position={Position.Left}
          animated={true}
          style={{ borderRadius: 10 }}
        />
        <h3>{data.label}</h3>
        <ul>
          {data.columns.map((column, index) => (
            <li key={index}>{column}</li>
          ))}
        </ul>
        <Handle
          type="source"
          position={Position.Right}
          animated={true}
          style={{ borderRadius: 10 }}
        />
      </div>
    );
  };

  ///////////////////////NODE STYLE/////////////////////////
  ////////////////////////////**********HAY STACK**********//////////////////////////////


  const nodeTypes = useMemo(() => ({ custom: CustomNode }), []);

  useEffect(() => {
    console.log("THIS IS FOCUS DATA", data);
    console.log(`THIS IS DEPTH ${focusDepth}`);
    const newNodes = [];
    const newEdges = [];

    ////////////////////////////**********HAY WEIGHT/IMPORTANCE ALGO**********//////////////////////////////
    /////*** this should go somewhere else so that we can also use in our dash WE B DRY ;) ***/////
    //calc weight/importance of each table (by # of FKs (<< hehe))
    const tableWeight = () => {
      const importance = new Map();
      data.forEach((table) => {
        //table name = key / num of FKs (<< hehe) = value
        importance.set(table.table_name, (table.foreign_keys || []).length);
      });
      return tableWeight;
    }

    //sort tables by weight/importance
    const sortTables = (tableWeight) => {
      //sorts arr by num of FKs (<< hehe) (descending)
      return [...data].sort((a, b) => tableWeight.get(b.table_name) - tableWeight.get(a.table_name));
    }

    //our variables for rendering below (add on between add table and foreach replace data with sortedData)
    // const weightMap = tableWeight();
    // const sortedData = sortTables(weightMap);
    ////////////////////////////**********HAY WEIGHT/IMPORTANCE ALGO**********//////////////////////////////

    const addTable = (currTable, pizza = 0, xVal = 0, yVal = 0) => {
      console.log(
        `NEW CALL OF addTable. table now = '${currTable}' xVal now = ${xVal}`
      );
      if (xVal > pizza) {
        return;
      }
      //our variables for rendering below (add on between add table and foreach replace data with sortedData)
      const weightMap = tableWeight();
      const sortedData = sortTables(weightMap);

      sortedData.forEach((table, i) => {
        if (table.table_name === currTable) {
          const columnArray = table.columns.map((column) => column.name); //grab the column names from each table's column array
          console.log("COLUMNS!", columnArray);
          console.log(
            `found ${currTable} at index ${i}. coordinates will be x:${
              100 * xVal
            }, y:${100 * yVal}`
          );
          newNodes.push({
            id: `${table.table_name}`,
            type: "custom",
            position: { x: 100 + 300 * xVal, y: 100 + 250 * yVal },
            data: { label: `${table.table_name}`, columns: columnArray },
          });
          //iterate thru foreign keys property of table
          if (table.foreign_keys) {
            xVal += 1;
            table.foreign_keys.forEach((key, j) => {
              newEdges.push({
                id: `e${currTable}-${key.foreign_table}`,
                source: `${currTable}`,
                target: `${key.foreign_table}`,
              });
              addTable(key.foreign_table, pizza, xVal, (yVal = j));
            });
          }
        }
      });
    };
    addTable(focusTable, focusDepth);
    // addTable("people_in_films", focusDepth);
    // console.log(newNodes)
    console.log("Nodes:", newNodes);
    console.log("Edges:", newEdges);
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
        <Background color="#2A2A43"/>
      </ReactFlow>
    </div>
  );
};

export default Focus;

/* 

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

//This 
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
    <div style={{ border: '1px solid #777', padding: 10, borderRadius: 5}}>
      <Handle type="target" position={Position.Left} style={{ borderRadius: 5 }} />
      <h3>{data.label}</h3>
      <ul>
        {data.columns.map((column, index) => (
          <li key={index}>{column}</li>
        ))}
      </ul>
      <Handle type="source" position={Position.Right} style={{ borderRadius: 5 }} />
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
  // addTable(focusTable, focusDepth)
  addTable('character_quests', focusDepth)
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
     
      </ReactFlow>
      </div>
      );
    };
    
    export default Focus;
    
*/
