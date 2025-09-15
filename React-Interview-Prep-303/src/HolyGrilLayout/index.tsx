import React from "react";
import "./index.css";

const index = () => {
  return (
    <div className="container">
      <header>
        <h1>Header</h1>
        <button>{"< Go Back"}</button>
      </header>
      <div className="main-container">
        <aside>Left aside</aside>
        <main>
          <h2 className="main-heading">Main Content</h2>
        </main>
        <aside>Right aside</aside>
      </div>
      <footer>
        <h4>Footer</h4>
      </footer>
    </div>
  );
};

export default index;
