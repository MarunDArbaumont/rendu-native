import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
export type TTask = {
    id: number;
    title: string;
    description: string;
    category: string;

}

type TTaskContext = {
    taskList: TTask[];
    addTask: (task: TTask) => void;
    deleteTask: (id: number) => void;
}

const initTaskList: TTask[] = [
    {
        id: 1,
        title: "Clean the floor",
        description: "Take a mop and clean the floor",
        category: "clean",
    },
    {
        id: 2,
        title: "Clean toilet",
        description: "Take a toothbrush and clean the toilet",
        category: "other",
    },
    {
        id: 3,
        title: "Make diner",
        description: "Make diner",
        category: "food",
    },
]

const TaskContext = createContext<TTaskContext | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [taskList, setTasks] = useState<TTask[]>(initTaskList);

    const addTask = (task: TTask) => {
        setTasks([...taskList, task]);
    };

    const deleteTask = (id: number) => {
        console.log("Deleting Task ID:", id);
        console.log("Current Tasks:", taskList);
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    };


    useEffect(() => {
        console.log(JSON.stringify(taskList, null, 2));
    }, [taskList])


    return (
        <TaskContext.Provider value={{ taskList, addTask, deleteTask }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTasksContext = (): TTaskContext => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTasks must be used within a TaskProvider');
    }
    return context;
};