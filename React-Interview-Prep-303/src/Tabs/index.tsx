import React, { useEffect, useRef, useState } from "react";
import "./index.css";

// Tab data can be passed as props for scalability
const TabDetails = [
  {
    id: 1,
    name: "Tab 1",
    details: "Detail contents of Tab 1",
  },
  {
    id: 2,
    name: "Tab 2",
    details: "Detail contents of Tab 2",
  },
  {
    id: 3,
    name: "Tab 3",
    details: "Detail contents of Tab 3",
  },
];

// TabContent is now more flexible and can render children
const TabContent = ({ children }) => (
  <div className="tab-content" role="tabpanel">
    {children}
  </div>
);

// TabHeader supports accessibility and keyboard navigation
const TabHeader = React.forwardRef(
  ({ id, title, isActive, onClick, onKeyDown }, ref) => (
    <button
      ref={ref}
      role="tab"
      aria-selected={isActive}
      aria-controls={`tabpanel-${id}`}
      id={`tab-${id}`}
      tabIndex={isActive ? 0 : -1}
      className={`tab-header${isActive ? " active" : ""}`}
      onClick={onClick}
      onKeyDown={onKeyDown}
      type="button"
    >
      {title}
    </button>
  )
);

const Tab = ({ tabs }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef([]);

  // Keyboard navigation support
  const handleKeyDown = (e, idx) => {
    if (e.key === "ArrowRight") {
      const next = (idx + 1) % tabs.length;
      setActiveIndex(next);
      tabRefs.current[next].focus();
    } else if (e.key === "ArrowLeft") {
      const prev = (idx - 1 + tabs.length) % tabs.length;
      setActiveIndex(prev);
      tabRefs.current[prev].focus();
    }
  };

  return (
    <div className="tab-container">
      <div className="tab-header-container" role="tablist" aria-label="Tabs">
        {tabs.map((tab, idx) => (
          <TabHeader
            key={tab.id}
            id={tab.id}
            title={tab.name}
            isActive={activeIndex === idx}
            ref={(el) => (tabRefs.current[idx] = el)}
            onClick={() => setActiveIndex(idx)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
          />
        ))}
      </div>
      <TabContent>{tabs[activeIndex]?.details}</TabContent>
    </div>
  );
};

const Tabs = ({ tabs = TabDetails }) => (
  <div>
    <Tab tabs={tabs} />
  </div>
);

export default Tabs;
