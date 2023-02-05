import { Box, Button, Text } from "@chakra-ui/react";
import { api } from "../../services/api";
import { theme } from "../../styles/theme";

export function Tasks({
  id,
  title,
  description,
  completedAt,
  updatedAt,  
}) {

  async function handleMarkAsCompleted(e) {
    e.preventDefault();
    
    const response = await api.patch(`/tasks/${id}`, {
      header: {
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
      },
    })

    alert("Task marked as completed!")
    window.location.reload();
  }

  return (
    <Box
      height="220px"
      background={theme.colors.secondary}
      borderRadius="8px"
      padding="20px"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      cursor="pointer"
      _hover={{
        border: `1px solid ${theme.colors.green500}`,
        transition: 'ease-in-out 0.25s',
      }}
    > 
      <Text
        color={theme.colors.white}
        textTransform="uppercase"
        fontWeight="bold"
        fontSize="18px"
        textAlign="center"
      >
        {title}
      </Text>
      <Text
        color={theme.colors.white}
      >
        {description}
      </Text>
      <Button
        marginTop="20px"
        border={`1px solid ${theme.colors.green500}`}
        color={theme.colors.green500}
        background={theme.colors.secondary}
        _hover={{
          backgroundColor: theme.colors.green500,
          color: theme.colors.secondary,
          transition: 'ease-in-out 0.25s',
        }}
        onClick={(e) => handleMarkAsCompleted(e)}
      >
        Mark as completed
      </Button>
    </Box>
  )
}