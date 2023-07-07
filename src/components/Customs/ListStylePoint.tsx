import { Box, useTheme } from "@mui/material";

export default function ListStylePoint() {
    const theme = useTheme();

    return (
        <Box sx={{
            top: '5px',
            width: '8px',
            height: '8px',
            bgcolor: '#000',
            [theme.breakpoints.down(400)]: {
                display: 'none',
            }
        }}></Box>
    )
}