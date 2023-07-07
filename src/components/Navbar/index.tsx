import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { GitHub, Task } from '@mui/icons-material';

const Navbar = () => {
  return (
    <div>
      <AppBar position="fixed" sx={{ bgcolor: '#333333', width: '100%' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <Box display="flex">
            <Task sx={{ mr: 1, color: '#fff' }} />
            <Typography sx={{ color: '#fff' }}>TaskIO</Typography>
          </Box>
          <Box>
            <GitHub sx={{ color: '#fff' }} />
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
