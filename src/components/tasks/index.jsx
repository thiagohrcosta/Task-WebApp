import { Box, Text } from "@chakra-ui/react";
import { theme } from "../../styles/theme";

export function Tasks({
  id,
  title,
  description,
  completedAt,
  updatedAt,  
}) {
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
    </Box>
  )
}