import React from "react";
import "./UsersTasks.css";
import { motion } from "framer-motion";
import { TasksType, useUsersTasks } from "./hooks/useUserTasks";
import { useChangeStatus } from "./hooks/useChangeStatus";

type changeStatusFn = {
  newStatus: string;
  taskId: string;
};

const UsersTasks = () => {
  const changeStatus = useChangeStatus();
  const { tasks, isLoading } = useUsersTasks();

  if (isLoading) return <div>isLoading</div>;
  return (
    <div className="wrapper">
      <div>
        <h2>Tasks Board</h2>
      </div>
      <div className="tasks-board">
        <Column
          changeStatus={changeStatus}
          title={"ToDo"}
          tasks={tasks?.filter(({ status }) => status == "ToDo")}
        />
        <Column
          changeStatus={changeStatus}
          title={"InProgress"}
          tasks={tasks?.filter(({ status }) => status == "InProgress")}
        />
        <Column
          changeStatus={changeStatus}
          title={"Done"}
          tasks={tasks?.filter(({ status }) => status == "Done")}
        />
      </div>
    </div>
  );
};

const Column = ({
  title,
  tasks,
  changeStatus,
}: {
  title: string;
  tasks: TasksType;
  changeStatus: (variables: changeStatusFn) => void;
}) => {
  return (
    <div className="column">
      <h3>{title}</h3>
      <motion.div
        layout={true}
        layoutId={title}
        className="cards"
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={(e) => {
          const taskId = e.dataTransfer.getData("taskId");
          console.log(taskId);
          changeStatus({ newStatus: title, taskId });
        }}
      >
        {tasks.map(({ title, id }) => (
          <motion.div
            layoutId={String(id)}
            layout={true}
            className="card"
            key={id}
            draggable={true}
            onDragStart={(e) => {
              e.dataTransfer.setData("taskId", String(id));
            }}
          >
            {title}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default UsersTasks;
