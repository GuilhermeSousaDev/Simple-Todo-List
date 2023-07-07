import { Box, Modal, SxProps, TextField, Typography, useTheme } from "@mui/material";
import ListStylePoint from "../Customs/ListStylePoint";
import { useState } from "react";

interface IProps {
    isEditTask: boolean;
    task: {
        name: string;
        isDone: boolean;
    };
    setNewTaskName: (newTaskName: string) => void;
}
  
export default function TaskName({ isEditTask, task, setNewTaskName }: IProps) {
    const windowWidth = window.innerWidth;
    const theme = useTheme();

    const [isShowFullName, setIsShowFullName] = useState(false);

    let parsedTaskName: string;

    if (windowWidth > 400) {
        parsedTaskName = task.name.length > 20 ? task.name.substring(0, 20) + '...' : task.name;
    } else {
        parsedTaskName = task.name.length > 10 ? task.name.substring(0, 10) + '...' : task.name;
    }

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        wordBreak: 'break-word',
        whiteSpace: 'pre-wrap',
        [theme.breakpoints.down(400)]: {
            width: 200,
        },
    } as SxProps;

    return (
        <Box display="flex" alignItems="center" sx={{ width: 150 }}>
            <ListStylePoint />

            <Modal open={isShowFullName} onClose={() => setIsShowFullName(false)}>
                <Box sx={modalStyle}>{task.name}</Box>
            </Modal>


            <Box sx={{ ml: 5, [theme.breakpoints.down(400)]: { ml: 0 } }}>
                {isEditTask ?
                    <TextField
                        variant="standard"
                        defaultValue={task.name}
                        onChange={(e) => setNewTaskName(e.target.value)}
                    /> :
                    <Typography
                        onClick={() => setIsShowFullName(!isShowFullName)}
                        sx={{
                            textDecoration: task.isDone ? 'line-through' : 'none',
                            width: '100%',
                        }}
                    >
                        {parsedTaskName}
                    </Typography>
                }
            </Box>
        </Box>
    )
}