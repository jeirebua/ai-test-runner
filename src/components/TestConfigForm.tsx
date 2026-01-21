import {
  Box,
  Button,
  Flex,
  Input,
  Text,
  NativeSelectRoot,
  NativeSelectField,
} from "@chakra-ui/react";
import { Globe, Play } from "lucide-react";
import { useState } from "react";
import type { BrowserType, TestConfig } from "../types/test.types";

interface TestConfigFormProps {
  onRunTest: (description: string, config: TestConfig) => void;
  isRunning: boolean;
}

export const TestConfigForm = ({
  onRunTest,
  isRunning,
}: TestConfigFormProps) => {
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("https://demo.example.com");
  const [browser, setBrowser] = useState<BrowserType>("chrome");
  const [email, setEmail] = useState("admin@test.com");
  const [password, setPassword] = useState("password123");

  const handleSubmit = () => {
    if (!description.trim() || !url.trim()) return;

    onRunTest(description, {
      url,
      browser,
      email: email || undefined,
      password: password || undefined,
    });
  };

  return (
    <Box
      bg="white"
      borderWidth="1px"
      borderColor="gray.200"
      rounded="lg"
      p={6}
      shadow="sm"
    >
      <Text fontSize="lg" fontWeight="semibold" mb={4} color="gray.700">
        New Test
      </Text>

      {/* Test Description */}
      <Box mb={4}>
        <Text fontSize="sm" fontWeight="medium" mb={2} color="gray.700">
          What do you want to test?
        </Text>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Login as admin user, navigate to settings page, and verify profile information is displayed"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
          rows={3}
          disabled={isRunning}
        />
      </Box>

      {/* Test Configuration */}
      <Text fontSize="sm" fontWeight="medium" mb={3} color="gray.700">
        Test Configuration
      </Text>

      <Flex gap={3} mb={4}>
        <Box flex={1}>
          <Flex
            alignItems="center"
            gap={2}
            px={3}
            py={2}
            borderWidth="1px"
            borderColor="gray.300"
            rounded="md"
            bg="white"
          >
            <Globe size={18} className="text-gray-500" />
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              border="none"
              px={0}
              _focus={{ outline: "none" }}
              disabled={isRunning}
            />
          </Flex>
        </Box>

        <Box width="200px">
          <NativeSelectRoot disabled={isRunning}>
            <NativeSelectField
              value={browser}
              onChange={(e) => setBrowser(e.target.value as BrowserType)}
              borderColor="gray.300"
            >
              <option value="chrome">Browser: Chrome</option>
              <option value="firefox">Browser: Firefox</option>
              <option value="safari">Browser: Safari</option>
              <option value="edge">Browser: Edge</option>
            </NativeSelectField>
          </NativeSelectRoot>
        </Box>
      </Flex>

      {/* Test Data */}
      <Text fontSize="sm" fontWeight="medium" mb={3} color="gray.700">
        Test Data (optional)
      </Text>

      <Flex gap={3} mb={6}>
        <Box flex={1}>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            borderColor="gray.300"
            disabled={isRunning}
          />
        </Box>
        <Box flex={1}>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            borderColor="gray.300"
            disabled={isRunning}
          />
        </Box>
      </Flex>

      {/* Run Button */}
      <Flex justifyContent="center">
        <Button
          onClick={handleSubmit}
          disabled={isRunning || !description.trim() || !url.trim()}
          bg="primary.500"
          color="white"
          px={8}
          py={6}
          fontSize="md"
          fontWeight="semibold"
          rounded="lg"
          _hover={{
            bg: "primary.600",
            transform: "translateY(-1px)",
            shadow: "md",
          }}
          _active={{
            bg: "primary.700",
            transform: "translateY(0)",
          }}
          _disabled={{
            bg: "gray.300",
            cursor: "not-allowed",
            _hover: {
              bg: "gray.300",
              transform: "none",
            },
          }}
          transition="all 0.2s"
        >
          <Flex alignItems="center" gap={2}>
            <Play size={18} fill="white" />
            <Text>Run Test</Text>
          </Flex>
        </Button>
      </Flex>
    </Box>
  );
};
