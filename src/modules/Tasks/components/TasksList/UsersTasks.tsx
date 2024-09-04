import React from "react";
import "./UsersTasks.css";
import { range } from "../../../../hooks/usePaginate";

const UsersTasks = () => {
  return (
    <div className="wrapper">
      <div>
        <h2>Tasks Board</h2>
      </div>
      <div className="tasks-board">
        <div className="column">
          <h3>To Do</h3>
          <div className="cards">
            {range({ start: 1, end: 5 }).map((index) => (
              <div className="card">card description</div>
            ))}
          </div>
        </div>
        <div className="column">
          <h3>In Progress</h3>
          <div className="cards">
            {range({ start: 1, end: 5 }).map((index) => (
              <div className="card">card description</div>
            ))}
          </div>
        </div>
        <div className="column">
          <h3>Done</h3>
          <div className="cards">
            {range({ start: 1, end: 5 }).map((index) => (
              <div className="card">card description</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersTasks;
