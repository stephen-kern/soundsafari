import React from "react";

const Tabs = ({ onTabClick, activeTab }) => {
  const tabTypes = ["Recent", "Related"];

  const handleTabClick = (tabType) => {
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
