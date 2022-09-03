import React from "react";
import ".././App.css";
import { TablePersons } from "../components/tablePersons";

import "antd/dist/antd.css"; // or 'antd/dist/antd.less'

function App() {
  return (
    <div className="App">
      <TablePersons />
    </div>
  );
}

export default App;
