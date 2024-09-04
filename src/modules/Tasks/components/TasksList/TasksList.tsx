import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { requestHeader, TASKSURLS } from "../../../../constants/URLS";
import { AuthContext } from "../../../../context/authcontext";
import UsersTasks from "./UsersTasks";

export default function TasksList() {
  const { loginData } = useContext(AuthContext);
  const [tasksList, setTasksList] = useState([]);
  let navigate = useNavigate();
  let getAllTasks = async () => {
    try {
      let response = await axios.get(TASKSURLS.getAll, {
        headers: requestHeader,
      });
      setTasksList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTasks();
  }, []);
  return (
    <>
      {loginData?.userGroup == "Manager" ? (
        <div>
          <div className="title d-flex px-4 py-2 justify-content-between align-items-center">
            <h5>Tasks</h5>
            <button
              onClick={() => navigate("/dashboard/task-data")}
              className="btn btn-warning px-3 py-2 rounded-5"
            >
              Add new task
            </button>
          </div>
          <div className="p-3">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Status</th>
                  <th scope="col">User</th>
                  <th scope="col">Project</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {tasksList.length > 0 ? (
                  tasksList.map((task: any) => (
                    <tr>
                      <th>{task.title}</th>
                      <td>{task.status}</td>
                      <td>{task.employee.userName}</td>
                      <td>{task.project.title}</td>
                      <td>
                        <i className="fa fa-eye" aria-hidden="true"></i>
                        <Link
                          to={`/dashboard/task-data/${task.id}`}
                          state={{ taskData: task, type: "edit" }}
                        >
                          <i className="fa fa-edit mx-2" aria-hidden="true"></i>
                        </Link>
                        <i className="fa fa-trash" aria-hidden="true"></i>
                      </td>
                    </tr>
                  ))
                ) : (
                  <h1>no dataaa</h1>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <UsersTasks />
      )}
    </>
  );
}
