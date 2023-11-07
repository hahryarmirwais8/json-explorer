import React, { useState } from "react";
import "./JsonExplorer.css";

interface JsonObject {
  [key: string]: JsonValue;
}

type JsonValue = string | number | boolean | null | JsonObject | JsonValue[];

interface JsonExplorerProps {
  jsonData: JsonValue;
}

export interface PopupData {
  key: string;
  value: JsonValue;
}

const JsonExplorer: React.FC<JsonExplorerProps> = ({ jsonData }) => {
  const [popupData, setPopupData] = useState<PopupData | null>(null);

  // Function to render JSON data with indentation and interactions
  const renderJson = (data: JsonValue, path = "res") => {
    if (typeof data === "object" && data !== null) {
      return (
        <ul className="json-ul">
          {Object.keys(data).map((key) => (
            <li key={key}>
              <span
                className="json-key"
                onClick={() =>
                  handleKeyClick(`${path}.${key}`, (data as JsonObject)[key])
                }
              >
                {key}:
              </span>
              {renderJson((data as JsonObject)[key], `${path}.${key}`)}
            </li>
          ))}
        </ul>
      );
    } else {
      return (
        <span className={`json-value json-${typeof data}`}>
          {path} - {formatValue(data)}
        </span>
      );
    }
  };

  // Function to handle key click and show a popup
  const handleKeyClick = (key: string, value: JsonValue) => {
    setPopupData({ key, value });
  };

  // Function to format the value for display
  const formatValue = (value: JsonValue) => {
    if (typeof value === "string") {
      return `"${value}"`;
    }
    return JSON.stringify(value, null, 2); // Format with indentation
  };

  return (
    <div className="json-explorer">
      {renderJson(jsonData)}
      {popupData && (
        <div className="popup">
          <span className="popup-close" onClick={() => setPopupData(null)}>
            &times;
          </span>
          <div className="popup-content">
            <div className="popup-key">Key: {popupData.key}</div>
            <div className={`popup-value popup-${typeof popupData.value}`}>
              <pre>{formatValue(popupData.value)}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JsonExplorer;
