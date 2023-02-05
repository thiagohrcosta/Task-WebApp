import { Box, Button, Container, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, Text, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { TaskCompleted } from "../../components/taskCompleted";
import { Tasks } from "../../components/tasks";
import { api } from "../../services/api";
import { theme } from "../../styles/theme";

import { useForm } from "react-hook-form";

export function Home() {
  const [tasks, setTasks] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [isSubmitNewTask, setIsSubmitNewTask] = useState(false);

  const { register, handleSubmit } = useForm();


  async function onSubmitNewTask(data) {
    setIsSubmitNewTask(true);

    const response = await fetch('http://localhost:3333/tasks', {
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        title: data.title,
        description: data.description,
      })
    })
    
    
    if (response.status === 201) {
      setIsSubmitNewTask(false);
      onClose();
    }

    fetchTasks();
  }

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
            onClick={onOpen}
          >
            Add new task
          </Button>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent
              background={theme.colors.primary}
            >
              <ModalHeader
                color={theme.colors.white}
              >
                Create a new task
              </ModalHeader>
              <ModalCloseButton
                backgroundColor={theme.colors.red500}
                color={theme.colors.white}
                _hover={{
                  backgroundColor: theme.colors.primary,
                  color: theme.colors.red500,
                  border: `1px solid ${theme.colors.red500}`,
                }}
              />
              <ModalBody
                background={theme.colors.secondary}
              >
                <Box
                  padding="20px"
                >
                  <form onSubmit={handleSubmit(onSubmitNewTask)}>
                    <Input
                      padding="20px"
                      placeholder="Insert a task title"
                      color={theme.colors.white}
                      {...register("title")} 
                    />
                    <Input
                      padding="20px"
                      margin="20px 0"
                      placeholder="Insert a task description"
                      color={theme.colors.white}
                      background={theme.colors.secondary}
                      {...register("description")}
                    />
                    <Button 
                      background={theme.colors.blue500}
                      color={theme.colors.white}
                      width="100%"
                      margin="20px 0"
                      type="submit" 
                      _hover={{
                        backgroundColor: theme.colors.primary,
                        color: theme.colors.blue500,
                        border: `1px solid ${theme.colors.blue500}`,
                        transition: 'ease-in-out 0.25s',
                      }}
                      isLoading={isSubmitNewTask}
                    >
                      Submit
                    </Button>
                  </form>
                </Box>
              </ModalBody>
            </ModalContent>
          </Modal>
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
            // need to add a horizontal scroll to this box
            // overflow={tasks.length > 3 ? 'scroll' : 'hidden'}
            overflowY="scroll"
            overFlowX="hidden"
            height="65vh"
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