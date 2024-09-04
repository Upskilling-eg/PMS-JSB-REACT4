import React from "react";
import "./UsersTasks.css";
import { range } from "../../../../hooks/usePaginate";
import axios from "axios";
import { USERSSURLS } from "../../../../constants/URLS";

type TaskType = {
  id: number;
  title: string;
  status: "ToDo" | "InProgress" | "Done";
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
          title={"ToDo"}
          tasks={tasks.filter(({ status }) => status == "ToDo")}
        />
        <Column
          title={"InProgress"}
          tasks={tasks.filter(({ status }) => status == "InProgress")}
        />
        <Column
          title={"Done"}
          tasks={tasks.filter(({ status }) => status == "Done")}
        />
      </div>
    </div>
  );
};

const Column = ({ title, tasks }: { title: string; tasks: TasksType }) => {
  return (
    <div className="column">
      <h3>{title}</h3>
      <div className="cards">
        {tasks.map(({ title, id }) => (
          <div className="card" key={id}>
            {title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersTasks;
