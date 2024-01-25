const CustomNode = ({ data }) => {
  return (
    <div style={{ border: '1px solid #777', padding: 10, borderRadius: 5, mr: '20%'}}>
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