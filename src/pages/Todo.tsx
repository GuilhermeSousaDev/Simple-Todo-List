import { Box } from "@mui/material";
import Card from "../components/Card";
import InputCreateTodo from "../components/Customs/InputCreateTodo";
import { RootState } from "../store/store";
import { ITask, setTaskBySavedTasks } from "../store/Tasks/tasksSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function TodoList() {
    const dispatch = useDispatch();
    const { tasks } = useSelector((state: RootState) => state.tasks);

    useEffect(() => {
        const savedTasksString = localStorage.getItem('tasks');

        if (savedTasksString) {
            const savedTasks = JSON.parse(savedTasksString);

            dispatch(setTaskBySavedTasks(savedTasks));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Box
            display="flex"
            flexDirection="column"
            gap="30px"
            sx={{ mt: 15, width: '52%', mb: 15 }}
        >
            <InputCreateTodo />

            <AnimatePresence mode="popLayout">
                {tasks.length ? tasks.map((task: ITask, index) => (
                    <motion.div 
                        key={task.id}
                        layout
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ type: "spring" }}
                    >
                        <Card task={task} index={index} />
                    </motion.div>
                )) : ''}
            </AnimatePresence>
        </Box>
    )
}