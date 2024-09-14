import { useQuery } from "@tanstack/react-query";
import { USERSSURLS } from "../../../../../constants/URLS";
import axios from "axios";
export type TaskType = {
  id: string;
  title: string;
  status: string;
};
export type TasksType = TaskType[];

const getUsersTasks = async () => {
  const response = await axios.get<{ data: TasksType }>(
    USERSSURLS.getAllMyAssignedTasks,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      params: { pageSize: 100, pageNumer: 1 },
    }
  );
  return response.data.data;
};

export const useUsersTasks = () => {
  const { data: tasks, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: getUsersTasks,
    initialData: [],
  });

  return { tasks, isLoading };
};
