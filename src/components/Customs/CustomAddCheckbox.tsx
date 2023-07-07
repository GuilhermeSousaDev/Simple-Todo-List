import { Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function CustomAddCheckbox() {
    return (
        <Box sx={{ border: '2px solid black', borderRadius: 1, cursor: 'pointer' }}>
            <AddIcon fontSize="small" />
        </Box>
    )
}