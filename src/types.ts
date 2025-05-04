export type Subtask = {
    title: string;
    isCompleted: boolean;
  };
  
export  type Task = {
    id: string;
    title: string;
    description: string;
    status: string;
    subtasks: Subtask[];
  };
  
export  type Column = {
    id: string;
    name: string;
    taskIds: string[];
  };
  
export  type Board = {
    id: string;
    name: string;
    columnIds: string[];
  };
  
export  type Data = {
    boards: Board[];
    columns: Column[];
    tasks: Task[];
  };