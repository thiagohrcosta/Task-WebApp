import { Box, Button, Container, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Tasks } from "../../components/tasks";
import { api } from "../../services/api";
import { theme } from "../../styles/theme";

export function Home() {
  const [tasks, setTasks] = useState([]);

  async function fetchTasks() {
    const response = await api.get('/tasks', {
      AccessControlAllowOrigin: '*',
    });
    setTasks(response.data);
  }

  useEffect(() => {
    fetchTasks();
    console.log(tasks)
  }, [])

  return (
    <Box
      backgroundColor={theme.colors.primary}
      height="100vh"
    >
      <Container
        maxW="container.xl"
        padding="40px 0"
      >
        <Box
          display="flex"
          justifyContent="space-between"
        >
          <Text
            color={theme.colors.blue500}
            fontWeight="bold"
            fontSize="32px"
          >
            Tasks WebApp
          </Text>
          <Button
            backgroundColor={theme.colors.blue500}
            color={theme.colors.white}
            _hover={{
              backgroundColor: theme.colors.primary,
              color: theme.colors.blue500,
              border: `1px solid ${theme.colors.blue500}`,
            }}
          >
            Add new task
          </Button>
        </Box>
        <Box>
          {tasks && tasks.map((task) => {
            return (
              <Tasks 
                key={task.id}
                id={task.id}
                title={task.title}
                description={task.description}
                completedAt={task.completed_at}
                updatedAt={task.updated_at}
              />
            )
          })}
        </Box>
      </Container>
    </Box>
  );
}