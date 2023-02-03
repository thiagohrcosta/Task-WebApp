import { Box, Text } from "@chakra-ui/react";
import { theme } from "../../styles/theme";

import { format } from 'date-fns'

export function TaskCompleted({
  title,
  completedAt
}) {
  return (
    <Box
      width="100%"
      backgroundColor={theme.colors.green500}
      padding="20px"
      borderRadius="8px"
      color={theme.colors.primary}
    >
      <Text>{title} ({format(new Date(completedAt), 'MM/dd/yyyy')})</Text>
    </Box>
  )
}