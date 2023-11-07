import React from "react";
import JsonExplorer from "./components/JsonExplorer/JsonExplorer";

// Example JSON data
const jsonData = {
  date: "2021-10-27T07:49:14.896Z",
  hasError: false,
  fields: [
    {
      id: "4c212130",
      prop: "iban",
      value: "DE81200505501265402568",
      hasError: false,
    },
  ],
};

function App() {
  return (
    <div className="app">
      <h1>JSON Explorer</h1>
      <JsonExplorer jsonData={jsonData} />
    </div>
  );
}

export default App;
