// import react, redux, and react-redux, dispatch 
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Alert, AlertTitle, TextField, Dialog } from '@mui/material';
import { deleteAlertActionCreator, updateAlertActionCreator } from '../actions/actions.js';
import dayjs from 'dayjs';



const AlertBox = (alertObj) => {

    const dispatch = useDispatch();

    const { alert_id, severity, table, column, monitorType, anomalyType, anomalyValue, anomalyTime, detected_at, resolved_at, resolved, resolved_by, notes, display } = alertObj;

    const updateAlert = (alertObj) => {
        return dispatch(updateAlertActionCreator(alertObj));
    };

    const deleteAlert = (alert_id) => {
        return dispatch(deleteAlertActionCreator(alert_id));
    }

    const addNotes = () => {
        alertObj = {
            ...alertObj,
            notes: newNotes,
        }
        handleClickOpen();
        return updateAlert(alertObj);
    }

    const markResolved = () => {
        alertObj = {
            ...alertObj,
            resolved: true,
            resolved_at: dayjs().format('ddd YYYY-MM-DD hh:mm:ss a'),
            resolved_by: 'user', // need to get this from the store
        }
        return updateAlert(alertObj);
    }

    const [openNotes, setOpenNotes] = useState(false);
    const [newNotes, setNewNotes] = useState('');

    const handleClickOpen = () => {
        setOpenNotes(!openNotes);
    }

    const handleNewNotesInput = (e) => {
        setNewNotes(e.target.value);
        console.log('alertobj in alertbox', alertObj)
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

    // will deal with this later -- not MVP
    // const handleDeleteButton = () => {
    //     return (
    //         <Dialog>Are you sure you want to delete this? Deletion is forever.</Dialog>
    //     )
    // }

    return (
        display ?
        (<Alert key={alert_id} severity={severity} variant="outlined" onClose={handleClose} sx={{bgcolor: 'background.paper', zIndex: 9999}}>
            <AlertTitle>{`${monitorType} anomaly detected at ${detected_at} in ${table}`}</AlertTitle>
            {column ? `Column: ${column}, ` : null}
            {anomalyType ? `Anomaly type: ${anomalyType}, ` : null}
            {anomalyValue ? `Anomaly value: ${anomalyValue}, ` : null}
            {anomalyTime ? `Anomaly time: ${anomalyTime} ` : null}
            <br/>
            {notes ? `Notes: ${notes}` : 
            (<Button onClick={handleClickOpen}>Add Notes</Button>)}
            {openNotes ? (<div>
                <TextField  fullWidth defaultValue={notes} onChange={handleNewNotesInput}/>
                <Button onClick={addNotes}>Submit new notes</Button>
                </div>) : null}
                <br/>
            alert id: {alert_id}
            <Button onClick={markResolved}>Mark resolved</Button>
            <br/>
            {resolved ? `Resolved at ${resolved_at} by ${resolved_by}` : null}
            {/* <Button onClick={handleDeleteButton}>Delete alert</Button> */}
        </Alert>) : null 

    )
}

export default AlertBox;

/**
 * alert object shape:
 * {
 *    alert_id: number,
 *    severity: string,
 *    table: string,
 *    column?: string,
 *    monitorType: string,
 *    anomalyType: string,
 *    anomalyValue?: number,
 *    anomalyTime?: timestamptz,
 *    detected_at: timestamptz,
 *    resolved_at?: timestamptz,
 *    resolved?: boolean,
 *    resolved_by?: string,
 *    notes?: string,
 *    display: boolean
 * }
 * 
 */