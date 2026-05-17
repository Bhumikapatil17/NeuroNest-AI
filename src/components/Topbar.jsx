import React from 'react';

const Topbar = ({ title }) => {
  return (
    <div className="topbar">
      <div className="topbar-title">{title}</div>
      <div className="search-bar">
        <i className="ti ti-search"></i>
        <span>Search anything...</span>
        <div className="kbd">Ctrl K</div>
      </div>
      <div className="topbar-spacer"></div>
      <div className="upgrade-btn">⭐ Upgrade</div>
      <div className="icon-btn"><i className="ti ti-bell"></i></div>
    </div>
  );
};

export default Topbar;
