import { Delete, Done, Edit } from "@mui/icons-material";
import { Alert } from "@mui/material";
import { useDispatch } from "react-redux";
import { doneTask, removeTask } from "../../store/Tasks/tasksSlice";

interface IProps {
    isTaskConfigOpen: boolean;
    payload: number;
    setIsSelected: (state: boolean) => void;
    setIsEditTask: (state: boolean) => void;
}

export default function TaskConfig({ isTaskConfigOpen, payload, setIsSelected, setIsEditTask }: IProps) {
    const dispatch = useDispatch();

    const handleDeleteTask = () => dispatch(removeTask(payload));

    const handleDoneTask = () => {
        dispatch(doneTask(payload));
        setIsSelected(false);
        setIsEditTask(false);
    };

    const handleEditTask = () => {
        setIsEditTask(true);
    }

    return (
        <>
            {
                isTaskConfigOpen &&
                <Alert
                    severity="success"
                    icon={false}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mt: 5,
                    }}
                >
                    <Edit
                        sx={{ ml: 3, cursor: 'pointer' }}
                        onClick={handleEditTask}
                    />
                    <Delete
                        sx={{ ml: 3, cursor: 'pointer' }}
                        onClick={handleDeleteTask}
                    />
                    <Done
                        sx={{ ml: 3, cursor: 'pointer' }}
                        onClick={handleDoneTask}
                    />
                </Alert>
            }
        </>
    )
}