import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
  } from "recharts";
  
  // Sample data
  const data = [
    { x: 100, y: 200, z: 200 },
    { x: 120, y: 100, z: 260 },
    { x: 170, y: 300, z: 400 },
    { x: 140, y: 250, z: 280 },
    { x: 150, y: 400, z: 500 },
    { x: 110, y: 280, z: 200 },
  ];
  
  const SimpleScatterChart = () => {
    return (
      <ResponsiveContainer width="99%" height="100%">
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid />
          <XAxis type="number" dataKey="x" name="Stature" unit="cm" />
          <YAxis type="number" dataKey="y" name="Weight" unit="kg" />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter
            name="Sample Data"
            data={data}
            fill="#4A90E2"
          />
        </ScatterChart>
      </ResponsiveContainer>
    );
  };
  
  export default SimpleScatterChart;