import { useMutation, useQueryClient } from "@tanstack/react-query";
import { USERSSURLS } from "../../../../../constants/URLS";
import axios from "axios";
import { TasksType, TaskType } from "./useUserTasks";

type changeStatusFn = {
  newStatus: string;
  taskId: string;
};
const changeStatus = async (newStatus: string, taskId: string) => {
  await axios.put(
    USERSSURLS.changeStatus(taskId),
    { status: newStatus },
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );
};
export const useChangeStatus = () => {
  const queryClient = useQueryClient();

  const changeStatusMutation = useMutation({
    mutationFn: ({ newStatus, taskId }: changeStatusFn) =>
      changeStatus(newStatus, taskId),
    onSuccess: () => {
      // toast
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onMutate: async (todo) => {
      const prevTodos: TasksType = queryClient.getQueryData(["tasks"]) || [];

      const newTodos = prevTodos?.map((task: TaskType) => {
        if (task.id == todo.taskId) {
          task.status = todo.newStatus;
          return task;
        }
        return task;
      });
      // Optimistically update to the new value
      queryClient.setQueryData(["tasks"], newTodos);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return changeStatusMutation.mutate;
};
