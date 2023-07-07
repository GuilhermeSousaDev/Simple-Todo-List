import { CheckBoxOutlineBlank } from "@mui/icons-material";
import { Box, TextField, useTheme } from "@mui/material";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import CustomAddCheckbox from "./CustomAddCheckbox";
import ListStylePoint from "./ListStylePoint";
import { useDispatch } from "react-redux";
import { v4 as randomUuid } from "uuid";
import { addTask } from "../../store/Tasks/tasksSlice";

const colors = [
    '#63C3C4',
    '#39bcc2',
    '#2da0a5',
    '#c43639',
    '#b4779a',
    '#F20587',
    '#F2059F',
    '#F2CB05',
]

export default function InputCreateTodo() {
    const theme = useTheme();
    const dispatch = useDispatch();

    const [isHoverCheckBox, setIsHoverCheckBox] = useState(false);
    const [taskTitle, setTaskTitle] = useState<string>('');

    const handleCreateTodo = useCallback(() => {
        if (taskTitle) {
            const payload = {
                id: randomUuid(),
                name: taskTitle,
                color: colors[Math.floor(Math.random() * ((colors.length - 1) - 0 + 1)) + 0],
                isDone: false,
            };
    
            dispatch(addTask(payload));
            setTaskTitle('');
        }
    }, [dispatch, taskTitle]);

    const handleChangeTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.target.value);
    };

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === 'Enter' && taskTitle) {
                handleCreateTodo();
            }
        };

        window.addEventListener('keypress', handleKeyPress);

        return () => {
            window.removeEventListener('keypress', handleKeyPress);
        };
    }, [handleCreateTodo, taskTitle]);

    return (
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{
                width: '100%',
                height: '30px',
                p: 5,
                backgroundColor: '#ffffff',
                boxShadow: `-20px 25px 1px #595959, -20px 25px 2px #595959`,
                border: `3px solid #595959`,
                transform: 'rotate(-0.5deg)',
                mb: 10,
                [theme.breakpoints.down(400)]: {
                    p: 0.5,
                    pb: 5,
                    pt: 5,
                }
            }}
        >
            <ListStylePoint />
            <TextField
                variant="standard"
                placeholder="What is your task ?"
                inputProps={{ value: taskTitle }}
                onChange={handleChangeTaskTitle}
            />
            <Box
                onMouseOver={() => setIsHoverCheckBox(true)}
                onMouseOut={() => setIsHoverCheckBox(false)}
            >
                {
                    !isHoverCheckBox ?
                        <CheckBoxOutlineBlank /> :
                        <div onClick={handleCreateTodo}>
                            <CustomAddCheckbox />
                        </div>
                }
            </Box>
        </Box>
    )
}