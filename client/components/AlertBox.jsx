// import react, redux, and react-redux, dispatch 
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Alert, AlertTitle, TextField, Badge, Box, Stack, useTheme, Divider, Typography, Accordion, IconButton } from '@mui/material';
import { deleteAlertActionCreator, updateAlertActionCreator } from '../actions/actions.js';
import StorageIcon from '@mui/icons-material/Storage';
import dayjs from 'dayjs';


// regex check for timestamptz
const timestamptzRegex = /(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z)/;
const checkTimestamptz = maybeTSTZ => {
  return timestamptzRegex.test(maybeTSTZ);
}

const AlertBox = (alertObj) => {

  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.username);
  const user_id = useSelector((state) => state.user.user_id);

  const alertObjCopy = {...alertObj};
  const { alert_id, severity, table, column, rows, monitorType, anomalyType, anomalyValue, anomalyTime, detected_at, resolved_at, resolved, resolved_by, notes, display } = alertObjCopy;

  const queryAlerts = async (method, alertObj) => {
    try {
      const requestOptions = {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user_id,
          alertObj: alertObj
        })
      };
      const response = await fetch('/alerts', requestOptions);
      //   const data = await response.json();
      //   console.log('data.alerts returned in queryAlerts func in alertBox', data);
        
      if (!response.ok) {
        throw new Error('Error from server in queryAlerts');
      } else {
        method === 'PUT' ? dispatch(updateAlertActionCreator(alertObj)) : 
          dispatch(deleteAlertActionCreator(alertObj.alert_id));
      }

    } catch (error) {
      throw new Error(error);
    }
  };
    
  const updateAlert = (alertObj) => {
    queryAlerts('PUT', alertObj);
    dispatch(updateAlertActionCreator(alertObj));
  };

  const addNotes = () => {

    if(newNote === '') return;

    const newNotesArr = notes.slice();
    newNotesArr.push(newNote.concat(` -by ${username} at ` + dayjs().format('ddd YYYY-MM-DD hh:mm:ss a')));


    const updatedAlertObj = {
      ...alertObj,
      notes: newNotesArr,
    }
    handleClickOpen();
    return updateAlert(updatedAlertObj);
  }

  const markResolved = () => {
    if (resolved) {
      return;
    } else {
      const updatedAlertObj = {
        ...alertObj,
        resolved: true,
        resolved_at: dayjs().format('ddd YYYY-MM-DD hh:mm:ss a'),
        resolved_by: username
      }
      return updateAlert(updatedAlertObj);
    }
  }

  const [openNotes, setOpenNotes] = useState(false);
  const [newNote, setNewNote] = useState('');

  const handleClickOpen = () => {
    setOpenNotes(!openNotes);
  }

  const handleNewNoteInput = (e) => {
    setNewNote(e.target.value);
  }

  // will conditionally render alerts by display value (in container component)
  // should include option to display resolved alerts, too
  const handleClose = () => {
    if(!resolved) return;
    const updatedAlertObj = {
      ...alertObj,
      display: false,
    }
    return updateAlert(updatedAlertObj);
  }

  const rowsCount = rows ? rows.length : null;

  // need to fix this! -A 
  const unspool = rows => {
    const showRows = [];
    for(const row in rows){
      let rowString = '• ';
      for(const key in rows[row]){
        if(checkTimestamptz(rows[row][key])){
          const timestampLegible = dayjs(rows[row][key]).format('ddd YYYY-MM-DD hh:mm:ss a');
          rowString += `${key}: ${timestampLegible}, `;
        } else {
          rowString += `${key}: ${rows[row][key]}, `;
        }
      }
      rowString = rowString.trim().slice(0, -1);
      showRows.push(rowString);
    }
    return showRows;
  }
    
  const unspooledRows = rows ? unspool(rows) : null;

  const [rowsAccordionAnchorEl, setrowsAccordionAnchorEl] = useState(null);
  const handleRowsAccordionToggle = e => {
    if(rowsAccordionAnchorEl !== e.currentTarget){
      setrowsAccordionAnchorEl(e.currentTarget);
    } else {
      setrowsAccordionAnchorEl(null);
    }
  }

  const renderRowsAccordion = (
    <div style={{display: 'inline-block'}}>
      <Accordion anchorEl={rowsAccordionAnchorEl} open={Boolean(rowsAccordionAnchorEl)} onClose={handleRowsAccordionToggle}>
        <Box  sx={{width: '100%'}}>
          <IconButton
            size="large"
            aria-label={`show ${rowsCount} anomalous rows`}
            color="inherit"
            onClick={handleRowsAccordionToggle}
          >
            <Badge badgeContent={rowsCount} color="error">
              <StorageIcon />
            </Badge>
            <Typography sx={{ml: 2 }}> click to see anomalous rows </Typography>
          </IconButton>
          <br/>
          {rowsAccordionAnchorEl ? 
            <Stack maxHeight='250px'>
              {rows ? unspooledRows.map((row, i) => <Typography key={i}>{row}</Typography>) : null}
            </Stack>
            : null}
        </Box>
      </Accordion>
    </div>
  );

  // will deal with this later -- not MVP
  // const handleDeleteButton = () => {
  //     return (
  //         <Dialog>Are you sure you want to delete this? Deletion is forever.</Dialog>
  //     )
  // }

  return display ? (
    
    <Alert className='card-container'
      severity="warning"
      // variant="outlined"
      onClose={handleClose}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "#121212",
boxShadow: 3,
            // border: "3px",
        zIndex: 9999,
        width: "100%",
        maxWidth: "900px",
        m: 1
      }}
    >
        <AlertTitle sx={{ fontSize: 16, color: "white" }}>
          <Typography color="secondary" sx={{ fontSize: 19 }} display="inline">
            {monitorType}
          </Typography>{" "}
          anomaly detected in{" "}
          <Typography color="secondary" sx={{ fontSize: 19 }} display="inline">
            {`${table}`}{" "}
          </Typography>
          on{" "}
          <Typography color="secondary" sx={{ fontSize: 19 }} display="inline">
            {dayjs(detected_at).format("ddd MM-DD-YYYY")}{" "}
          </Typography>
          at{" "}
          <Typography color="secondary" sx={{ fontSize: 19 }} display="inline">
            {dayjs(detected_at).format("hh:mm:ss a")}{" "}
          </Typography>
        </AlertTitle>
        <Divider sx={{ width: "100%", mb: 1 }} />
        <Typography color="white" sx={{ fontSize: 14 }} display="inline">
          {column ? `Column: ${column}, ` : null}
          {anomalyType ? `Anomaly type: ${anomalyType}, ` : null}
          {anomalyValue ? `Anomaly value: ${anomalyValue}, ` : null}
          {anomalyTime
            ? `Anomaly time: ${dayjs(anomalyTime).format(
                "ddd MM-DD-YYYY hh:mm:ss a"
              )} `
            : null}
        </Typography>
        <Box sx={{ marginTop: 1 }}>{renderRowsAccordion}</Box>
        <Typography color="white" sx={{ fontSize: 14 }} display="inline">
          {notes.length ? `Notes: ${notes.join(", ")}` : null}
        </Typography>
        <Button onClick={handleClickOpen}>Add Notes</Button>
        {openNotes ? (
          <div>
            <TextField
              onChange={handleNewNoteInput}
              sx={{ maxWidth: "500px" }}
            />
            <Button onClick={addNotes}>Submit new notes</Button>
          </div>
        ) : null}
        <br />
        <Typography color="white" sx={{ fontSize: 14 }} display="inline">
          alert id: {alert_id}
        </Typography>
        <Button onClick={markResolved}>Mark resolved</Button>
        <br />
        <Typography color="white" sx={{ fontSize: 14 }} display="inline">
          {/* {resolved ? `Resolved at ${resolved_at} by ${resolved_by}` : null} */}
          {resolved ? `Resolved at ${resolved_at} by ${username}` : null}
          {/* <Button onClick={handleDeleteButton}>Delete alert</Button> */}
        </Typography>
    </Alert>
  ) : null;
}

export default AlertBox;
