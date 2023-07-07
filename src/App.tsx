import { Box } from "@mui/material"
import Navbar from "./components/Navbar"
import TodoList from "./pages/Todo"
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";

function App() {
  const { tasks } = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = 'Salvar Dados Ao Sair';

      localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [tasks]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{ bgcolor: '#4AD9CA', minHeight: '100vh' }}
    >
      <Navbar />
      <TodoList />
    </Box>
  )
}

export default App
