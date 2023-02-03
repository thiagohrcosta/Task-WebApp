import { Box } from "@chakra-ui/react";
import { theme } from "../../styles/theme";

export function Home() {
  return (
    <Box
      background={theme.colors.primary}
      height="100vh"
    >
      <Text>Tasks</Text>

    </Box>
  );
}