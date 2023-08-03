import React, { useState } from "react";
import "../Tabs/tabs.scss";

const Tabs = ({ onTabClick }) => {
  const tabTypes = ["Recent", "Related"];
  const [activeTab, setActiveTab] = useState(tabTypes[0]);

  const handleTabClick = (tabType) => {
    setActiveTab(tabType);
    onTabClick(tabType);
  };

  return (
    <>
      <div className="tabs-container">
        {tabTypes.map((tabType) => (
          <button
            className={`tabs ${activeTab === tabType ? "active-tab" : ""}`}
            key={tabType}
            onClick={() => handleTabClick(tabType)}
          >
            {tabType}
          </button>
        ))}
      </div>
    </>
  );
};

export default Tabs;
