// import react, redux, and react-redux, dispatch 
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Alert, AlertTitle, TextField, Badge, Box, Stack, useTheme, Typography, Accordion, IconButton } from '@mui/material';
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
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  user_id: user_id,
                  alertObj: alertObj
                })
              };
              const response = await fetch('/alerts', requestOptions);
            //   const data = await response.json();
            //   console.log('data.alerts returned in queryAlerts func in alertBox', data);
        
              if (!response.ok) {
                throw new Error("Error from server in queryAlerts");
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
    };

    const deleteAlert = (alert_id) => {
        queryAlerts('DELETE', {alert_id});
    }

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
        const updatedAlertObj = {
            ...alertObj,
            display: false,
        }
        return updateAlert(updatedAlertObj);
    }

    let rowsCount = rows ? rows.length : null;

    // need to fix this! -A 
    const unspool = rows => {
      let showRows = [];
      for(let row in rows){
        let rowString = '• ';
        for(let key in rows[row]){
            if(checkTimestamptz(rows[row][key])){
                rows[row][key] = dayjs(rows[row][key]).format('ddd YYYY-MM-DD hh:mm:ss a');
            }
            rowString += `${key}: ${rows[row][key]}, `;
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
            <Box sx={{width: "100%"}}>
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
                <Stack maxHeight='250px' overflow='auto'>
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

    return (
        display ?
        (<Alert severity={severity} variant="outlined" onClose={handleClose} sx={{bgcolor: 'background.paper', zIndex: 9999, width: '97%', marginRight: 'auto', marginLeft: 'auto', maxWidth: '800px'}}>
            <AlertTitle sx={{fontSize: 18}}>{`${monitorType} anomaly detected at ${dayjs(detected_at).format('ddd MM-DD-YYYY hh:mm:ss a')} in: `} <Typography color="primary" sx={{fontSize: 16}}>{`${table}`}</Typography> </AlertTitle>
            {column ? `Column: ${column}, ` : null}
            {anomalyType ? `Anomaly type: ${anomalyType}, ` : null}
            {anomalyValue ? `Anomaly value: ${anomalyValue}, ` : null}
            {anomalyTime ? `Anomaly time: ${dayjs(anomalyTime).format('ddd MM-DD-YYYY hh:mm:ss a')} ` : null}
            <br/>
            {renderRowsAccordion}
            <br/>
            {notes.length ? `Notes: ${notes.join(', ')}` : null}
            <Button onClick={handleClickOpen}>Add Notes</Button>
            {openNotes ? (<div>
                <TextField onChange={handleNewNoteInput} sx={{maxWidth: '500px'}}/>
                <Button onClick={addNotes}>Submit new notes</Button>
                </div>) : null}
                <br/>
            alert id: {alert_id}
            <Button onClick={markResolved}>Mark resolved</Button>
            <br/>
            {/* {resolved ? `Resolved at ${resolved_at} by ${resolved_by}` : null} */}
            {resolved ? `Resolved at ${resolved_at} by ${username}` : null}
            {/* <Button onClick={handleDeleteButton}>Delete alert</Button> */}
        </Alert>) : null 
    )
}

export default AlertBox;
