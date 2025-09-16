import React, { useState } from "react";
import "./index.css";

// Data can be passed as props for scalability
const tabContents = [
  { id: 1, title: "Title 1", content: <p>Content of Accordion 1</p> },
  { id: 2, title: "Title 2", content: <p>Content of Accordion 2</p> },
  { id: 3, title: "Title 3", content: <p>Content of Accordion 3</p> },
  {
    id: 4,
    title: "Title 4",
    content: (
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. At eius unde
        reprehenderit quod harum, ratione, voluptatem nihil accusamus nobis odio
        eum. Laboriosam adipisci deleniti iste? Quibusdam vitae ut sunt vel.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. At eius unde
        reprehenderit quod harum, ratione, voluptatem nihil accusamus nobis odio
        eum. Laboriosam adipisci deleniti iste? Quibusdam vitae ut sunt vel.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. At eius unde
        reprehenderit quod harum, ratione, voluptatem nihil accusamus nobis odio
        eum. Laboriosam adipisci deleniti iste? Quibusdam vitae ut sunt vel.
      </p>
    ),
  },
];

// AccordionContent with ARIA support
const AccordionContent = ({ id, isOpen, children }) => (
  <div
    id={`accordion-panel-${id}`}
    className={`accordion-content${isOpen ? " open" : ""}`}
    role="region"
    aria-labelledby={`accordion-header-${id}`}
    hidden={!isOpen}
  >
    {children}
  </div>
);

// AccordionHeader with ARIA and keyboard support
const AccordionHeader = ({ id, title, isOpen, onClick, onKeyDown }) => (
  <button
    id={`accordion-header-${id}`}
    className={`accordion-header${isOpen ? " open-header" : ""}`}
    aria-expanded={isOpen}
    aria-controls={`accordion-panel-${id}`}
    onClick={onClick}
    onKeyDown={onKeyDown}
    type="button"
  >
    <span>{title}</span>
    <div className={isOpen ? "arrow-up" : "arrow-down"}>{"^"}</div>
  </button>
);

const Accordion = ({ items, allowMultipleOpen = false }) => {
  const [openIds, setOpenIds] = useState([]);

  const handleSelect = (id) => {
    setOpenIds((prev) =>
      allowMultipleOpen
        ? prev.includes(id)
          ? prev.filter((val) => val !== id)
          : [...prev, id]
        : prev[0] === id
        ? []
        : [id]
    );
  };

  // Keyboard navigation for accessibility
  const handleKeyDown = (e, id, idx) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleSelect(id);
    }
    // Optional: Add arrow navigation if desired
  };

  return (
    <div className="accordion-container" role="presentation">
      {items.map((item, idx) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div key={item.id} className="accordion-item">
            <AccordionHeader
              id={item.id}
              title={item.title}
              isOpen={isOpen}
              onClick={() => handleSelect(item.id)}
              onKeyDown={(e) => handleKeyDown(e, item.id, idx)}
            />
            <AccordionContent id={item.id} isOpen={isOpen}>
              {item.content}
            </AccordionContent>
          </div>
        );
      })}
    </div>
  );
};

const AccordionDemo = () => (
  <div>
    <Accordion items={tabContents} allowMultipleOpen={false} />
  </div>
);

export default AccordionDemo;
