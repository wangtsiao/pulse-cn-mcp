import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

// const transport = new StdioClientTransport({
//   command: "node",
//   args: ["./build/src/index.js"],
// });

const transport = new StdioClientTransport({
  command: "docker",
  args: [
    "run", 
    "-i", 
    "--rm",
    "deployment-wangtsiao-pulse-cn-mcp:latest"
  ],
});

// const transport = new SSEClientTransport(new URL("http://localhost:8025/sse/weibohot"));

const client = new Client(
  {
    name: "pulse-cn-mcp",
    version: "0.1.0"
  },
);

// Connect to the MCP server and make sure it completes
try {
  console.log("Connecting to the MCP server...");
  await client.connect(transport);
  console.log("Successfully connected to the MCP server");
} catch (error) {
  console.error("Failed to connect to the MCP server:", error);
  process.exit(1);
}

// Test 1: List all available tools
console.log("Testing listing all available tools...");
try {
  const response = await client.listTools();
  if (!response) {
    console.error("tools is undefined, but should contain data");
  } else {
    console.log(JSON.stringify(response.tools));
    console.log(`Available tools (${response.tools.length}):`);
  }
} catch (error) {
  console.error("Error listing tools:", error);
}

// Test 2: Test the weibo hotspots tool specifically
console.log("\nTesting weibo hotspots tool...");

// Calling the tool with proper parameters
const result = await client.callTool({
  name: "get-weibo-hotspots",
  arguments: {},
});

console.log("Weibo Hotspots result: ", JSON.stringify(result, null, 2));
