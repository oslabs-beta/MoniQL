import React, { useState } from "react";

function MonitorEditor({ monitor, onDone }) {
  const [params, setParams] = useState(monitor.parameters);

  const handleChanges = (e) => {
    setParams({
      ...params,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    onDone({
      ...monitor,
      parameters: params,
    });
  };

  return (
    <div>
      {Object.entries(params).map(([key, value]) => (
        <div key={key}>
          <label>{key}</label>
          <input name={key} value={value} onChange={handleChanges} />
        </div>
      ))}
      <button onClick={handleSubmit}>Save Changes</button>
    </div>
  );
}

export default MonitorEditor;
