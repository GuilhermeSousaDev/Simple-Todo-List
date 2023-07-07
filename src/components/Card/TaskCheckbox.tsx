import { CheckBox, CheckBoxOutlineBlank, CheckCircle, Delete } from "@mui/icons-material";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { removeTask } from "../../store/Tasks/tasksSlice";
import { useState } from "react";

interface IProps {
    payload: number;
    isSelected: boolean;
    task: {
        isDone: boolean;
        color: string;
    };
    handleSetCardIsSelected: () => void;
}

export default function TaskCheckbox({ payload, task, isSelected, handleSetCardIsSelected }: IProps) {
    const dispatch = useDispatch();

    const [isShowRemoveIconDoneTask, setIsShowRemoveIconDoneTask] = useState(false);

    return (
        <Box onClick={handleSetCardIsSelected} sx={{ cursor: 'pointer' }}>
            {!task.isDone ? !isSelected ? <CheckBoxOutlineBlank /> : <CheckBox /> : ''}
            {task.isDone &&
                <Box
                    onMouseOver={() => setIsShowRemoveIconDoneTask(true)}
                    onMouseOut={() => setIsShowRemoveIconDoneTask(false)}
                >
                    {isShowRemoveIconDoneTask ?
                        <Delete onClick={() => dispatch(removeTask(payload))} sx={{ color: '#c43639' }} /> :
                        <CheckCircle sx={{ color: task.color }} fontSize="medium" />
                    }
                </Box>
            }
        </Box>
    )
}