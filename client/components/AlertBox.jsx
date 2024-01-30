// import react, redux, and react-redux, dispatch 
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Alert, AlertTitle, TextField, Dialog, Typography } from '@mui/material';
import { deleteAlertActionCreator, updateAlertActionCreator } from '../actions/actions.js';
import dayjs from 'dayjs';



const AlertBox = (alertObj) => {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.username);

    const { alert_id, severity, table, column, row, monitorType, anomalyType, anomalyValue, anomalyTime, detected_at, resolved_at, resolved, resolved_by, notes, display } = alertObj;

    const updateAlert = (alertObj) => {
        return dispatch(updateAlertActionCreator(alertObj));
    };

    const deleteAlert = (alert_id) => {
        return dispatch(deleteAlertActionCreator(alert_id));
    }

    const addNotes = () => {

        const newNotesArr = notes.slice();
        // newNotesArr.push(newNote.concat(` -by ${user} at ` + dayjs().format('ddd YYYY-MM-DD hh:mm:ss a')));
        // just for demo purposes, hardcoding user to Ebo - also line 99
        newNotesArr.push(newNote.concat(` -by ${user} at ` + dayjs().format('ddd YYYY-MM-DD hh:mm:ss a')));


        alertObj = {
            ...alertObj,
            notes: newNotesArr,
        }
        handleClickOpen();
        return updateAlert(alertObj);
    }

    const markResolved = () => {
        alertObj = {
            ...alertObj,
            resolved: true,
            resolved_at: dayjs().format('ddd YYYY-MM-DD hh:mm:ss a'),
            resolved_by: user
        }
        return updateAlert(alertObj);
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
        alertObj = {
            ...alertObj,
            display: false,
        }
        return updateAlert(alertObj);
    }

    // need to fix this! -A 
    const unspool = rows => {
      let showRows = '';
      for(let row in rows){
        showRows += `${row + 1}: `;
        console.log('row in unspool: ', row)
        for(let key in row){
              showRows += `${key}: ${row[key]}, `
            }
        }
        showRows = showRows.trim().slice(0, -1);
        console.log('showRows in unspool: ', showRows);
        return showRows;
      }
    
    const unspooledRows = row ? unspool(row) : null;

    // will deal with this later -- not MVP
    // const handleDeleteButton = () => {
    //     return (
    //         <Dialog>Are you sure you want to delete this? Deletion is forever.</Dialog>
    //     )
    // }

    return (
        display ?
        (<Alert severity={severity} variant="outlined" onClose={handleClose} sx={{bgcolor: 'background.paper', zIndex: 9999}}>
            <AlertTitle>{`${monitorType} anomaly detected at ${dayjs(detected_at).format('ddd MM-DD-YYYY hh:mm:ss a')} in ${table}`}</AlertTitle>
            {column ? `Column: ${column}, ` : null}
            {anomalyType ? `Anomaly type: ${anomalyType}, ` : null}
            {anomalyValue ? `Anomaly value: ${anomalyValue}, ` : null}
            {anomalyTime ? `Anomaly time: ${dayjs(anomalyTime).format('ddd MM-DD-YYYY hh:mm:ss a')} ` : null}
            {row ? `Row(s): ${unspooledRows}` : null}
            <br/>
            {notes.length ? `Notes: ${notes.join(', ')}` : null}
            <Button onClick={handleClickOpen}>Add Notes</Button>
            {openNotes ? (<div>
                <TextField  fullWidth onChange={handleNewNoteInput}/>
                <Button onClick={addNotes}>Submit new notes</Button>
                </div>) : null}
                <br/>
            alert id: {alert_id}
            <Button onClick={markResolved}>Mark resolved</Button>
            <br/>
            {/* {resolved ? `Resolved at ${resolved_at} by ${resolved_by}` : null} */}
            {resolved ? `Resolved at ${resolved_at} by Ebo` : null}
            {/* <Button onClick={handleDeleteButton}>Delete alert</Button> */}
        </Alert>) : null 
    )
}

export default AlertBox;
