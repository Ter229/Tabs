import React, { useState } from "react";
import "./Tabs.css";

const TabsContent = ({ title, content, isActive, onClick, onClose }) => {
  return (
    <div>
      <div className="wrapper__tabs">
        <h3 className={`tabs ${isActive ? "active" : ""}`} onClick={onClick}>
          <span className="tab-title">{title}</span>
          <span
            className="close"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            ×
          </span>
        </h3>
      </div>
    </div>
  );
};

export default TabsContent;
