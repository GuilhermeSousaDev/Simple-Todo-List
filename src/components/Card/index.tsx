import { Box, useTheme } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateTask } from "../../store/Tasks/tasksSlice";
import TaskConfig from "./TaskConfig";
import TaskCheckbox from "./TaskCheckbox";
import TaskName from "./TaskName";
import { motion } from "framer-motion";

interface IProps {
    task: {
        id: string;
        name: string;
        color: string;
        isDone: boolean;
    };
    index: number;
}

export default function Card({ task, index }: IProps) {
    const theme = useTheme();
    const dispatch = useDispatch();
    const payload = index;

    const [isSelected, setIsSelected] = useState(false);
    const [isEditTask, setIsEditTask] = useState(false);
    const [newTaskName, setNewTaskName] = useState<string>('');

    const handleSetCardIsSelected = () => {
        if (!task.isDone && !isEditTask) {
            setIsSelected(!isSelected);
        }
    }

    const handleCloseEditTask = useCallback((e: MouseEvent) => {
        const localClickName = (e.target as HTMLElement).localName;

        if (
            localClickName !== 'input' && 
            localClickName !== 'svg' && 
            localClickName !== 'path' && 
            isEditTask
        ) {
            setIsEditTask(false);
        }
    }, [isEditTask]);

    useEffect(() => {
        window.addEventListener('click', handleCloseEditTask);

        return () => {
            window.removeEventListener('click', handleCloseEditTask);
        };
    }, [handleCloseEditTask]);
    
    const handleUpdateTaskName = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Enter' && newTaskName) {
            dispatch(updateTask({ index, name: newTaskName }));
            setNewTaskName('');
            setIsEditTask(false);
            setIsSelected(false);
        }
    }, [newTaskName, dispatch, index]);

    useEffect(() => {
        window.addEventListener('keypress', handleUpdateTaskName);

        return () => {
            window.removeEventListener('keypress', handleUpdateTaskName);
        }
    }, [handleUpdateTaskName]);

    return (
        <motion.div
            initial={{ y: -250, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", duration: 2 }}
        >
            <Box display="flex" justifyContent="space-between" alignItems="center" 
                sx={{
                    width: '100%',
                    height: '30px',
                    p: 5,
                    backgroundColor: '#ffffff',
                    boxShadow: `-10px 10px 1px ${task.color}, -10px 10px 2px ${task.color}`,
                    border: `3px solid ${task.color}`,
                    [theme.breakpoints.down(400)]: {
                        justifyContent: 'center',
                    }
                }}
            >
                <TaskName 
                    isEditTask={isEditTask}
                    setNewTaskName={setNewTaskName}
                    task={task}
                />
                <TaskCheckbox 
                    handleSetCardIsSelected={handleSetCardIsSelected}
                    isSelected={isSelected}
                    payload={payload}
                    task={task}
                />
            </Box>

            <TaskConfig 
                isTaskConfigOpen={isSelected}
                payload={payload}
                setIsEditTask={setIsEditTask}
                setIsSelected={setIsSelected}
            />
        </motion.div>
    )
}