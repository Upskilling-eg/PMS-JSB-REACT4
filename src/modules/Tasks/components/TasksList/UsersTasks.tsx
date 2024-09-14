import React from "react";
import "./UsersTasks.css";
import { range } from "../../../../hooks/usePaginate";
import axios from "axios";
import { TASKSURLS, USERSSURLS } from "../../../../constants/URLS";
import { motion } from "framer-motion";
type TaskType = {
  id: string;
  title: string;
  status: string;
};
type TasksType = TaskType[];
const UsersTasks = () => {
  const [tasks, setTasks] = React.useState<TasksType>([]);
  const getUsersTasks = async () => {
    try {
      const response = await axios.get<{ data: TasksType }>(
        USERSSURLS.getAllMyAssignedTasks,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          params: { pageSize: 100, pageNumer: 1 },
        }
      );

      setTasks(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const changeStatus = async (newStatus: string, taskId: string) => {
    try {
      const newTasks = tasks.map((task) => {
        if (task.id == taskId) {
          task.status = newStatus;
          return task;
        }
        return task;
      });
      setTasks(newTasks);
      const response = await axios.put(
        USERSSURLS.changeStatus(taskId),
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      getUsersTasks();
    }
  };

  React.useEffect(() => {
    getUsersTasks();
  }, []);

  return (
    <div className="wrapper">
      <div>
        <h2>Tasks Board</h2>
      </div>
      <div className="tasks-board">
        <Column
          changeStatus={changeStatus}
          title={"ToDo"}
          tasks={tasks.filter(({ status }) => status == "ToDo")}
        />
        <Column
          changeStatus={changeStatus}
          title={"InProgress"}
          tasks={tasks.filter(({ status }) => status == "InProgress")}
        />
        <Column
          changeStatus={changeStatus}
          title={"Done"}
          tasks={tasks.filter(({ status }) => status == "Done")}
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
  changeStatus: (newStatus: string, id: string) => void;
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
          changeStatus(title, taskId);
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
