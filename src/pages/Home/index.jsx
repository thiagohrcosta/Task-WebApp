import { Box, Button, Container, SimpleGrid, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { TaskCompleted } from "../../components/taskCompleted";
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
        <Box
          display="flex"
          width="100%"
          gap="20px"
          marginTop="100px"
        >
          <Box
            width="70%"
          >
            <SimpleGrid columns={4} spacing={10}>
              {tasks && tasks.map((task) => {
                if (task.completed_at === null) {
                  return (
                    <Box>
                      <Tasks
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        description={task.description}
                      />
                    </Box>
                  )
                }
              })}
            </SimpleGrid>
          </Box>
          <Box
            width="30%"
            border={`1px solid ${theme.colors.green500}`}
            borderRadius="8px"
            display="flex"
            flexDirection="column"
            padding="20px"
            textAlign="center"
          >
            <Text
              color={theme.colors.green500}
              fontWeight="bold"
              fontSize="18px"
              textTransform="uppercase"
            >
              Completed tasks
            </Text>
            {tasks && tasks.map((task) => {
              if (task.completed_at !== null) {
                return (
                  <Box
                    margin="20px 0"
                  >
                    <TaskCompleted
                      key={task.id}
                      id={task.id}
                      title={task.title}
                      completedAt={task.completed_at}
                    />
                  </Box>
                )
              }
            })}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}