import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type TTask = {
    id: string;
    title: string;
    description: string;
    is_toggle: boolean;
}

type TTaskContext = {
    taskList: TTask[];
    addTask: (task: TTask) => void;
    removeTask: (id: string) => void;
    toggleTaskCompletion: (id: string) => void;
    deleteTask: (id: string) => void;
}

const initTaskList: TTask[] = [
    {
        id: "1",
        title: "Task 1",
        description: "Description 1",
        is_toggle: false,
    },
    {
        id: "2",
        title: "Task 2",
        description: "Description 2",
        is_toggle: false,
    },
    {
        id: "3",
        title: "Task 3",
        description: "Description 3",
        is_toggle: false,
    },
]

const TaskContext = createContext<TTaskContext | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [taskList, setTasks] = useState<TTask[]>(initTaskList);

    const addTask = (task: TTask) => {
        setTasks([...taskList, task]);
    };

    const removeTask = (id: string) => {
        setTasks(taskList.filter(task => task.id !== id));
    };

    const toggleTaskCompletion = (id: string) => {
        setTasks(taskList.map(task =>
            task.id === id ? { ...task, is_toggle: !task.is_toggle } : task
        ));
    };

    const deleteTask = (id: string) => {
        setTasks(taskList.filter(task => task.id !== id));
    }

    useEffect(() => {
        console.log(JSON.stringify(taskList, null, 2));
    }, [taskList])


    return (
        <TaskContext.Provider value={{ taskList, addTask, removeTask, toggleTaskCompletion, deleteTask }}>
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