import { Box, Flex, Text } from "@chakra-ui/react";
import { Bot, BookOpen, Code2, User } from "lucide-react";

export const Header = () => {
  return (
    <Box
      borderBottomWidth="1px"
      borderColor="gray.200"
      bg="white"
      px={6}
      py={4}
      shadow="sm"
    >
      <Flex alignItems="center" justifyContent="space-between">
        <Flex alignItems="center" gap={3}>
          <Box color="primary.500">
            <Bot size={32} strokeWidth={2.5} />
          </Box>
          <Text fontSize="2xl" fontWeight="bold" color="gray.800">
            AI Test Runner
          </Text>
        </Flex>

        <Flex alignItems="center" gap={4}>
          <Flex
            as="button"
            alignItems="center"
            gap={2}
            px={3}
            py={2}
            rounded="md"
            _hover={{ bg: "gray.100" }}
            transition="all 0.2s"
          >
            <BookOpen size={18} />
            <Text fontSize="sm" fontWeight="medium">
              Docs
            </Text>
          </Flex>

          <Flex
            as="button"
            alignItems="center"
            gap={2}
            px={3}
            py={2}
            rounded="md"
            _hover={{ bg: "gray.100" }}
            transition="all 0.2s"
          >
            <Code2 size={18} />
            <Text fontSize="sm" fontWeight="medium">
              API
            </Text>
          </Flex>

          <Flex
            as="button"
            alignItems="center"
            gap={2}
            px={3}
            py={2}
            rounded="md"
            _hover={{ bg: "gray.100" }}
            transition="all 0.2s"
          >
            <User size={18} />
            <Text fontSize="sm" fontWeight="medium">
              @username
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};
