import { Box, Button, Container, Text } from "@chakra-ui/react";
import { theme } from "../../styles/theme";

export function Home() {
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
      </Container>
    </Box>
  );
}