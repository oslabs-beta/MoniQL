import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeTestActionCreator } from '../actions/actions.js';

const TestComponent = () => {
const dispatch = useDispatch();
const [testText, setTestText] = useState('')
const storeText = useSelector(state => state.alerts.alertsTest)

  return (
    <div>
      <h3>{storeText}</h3>
      <input onChange={(e) => setTestText(e.target.value)}></input>
      <button onClick={() => dispatch(changeTestActionCreator(testText))}>click me</button>

    </div>
  )
}

export default TestComponent;