import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// Import tool registrations
import { registerWeiboHotspotsTool } from './tools/weiboHotspots.js';
import { registerHoroscopeTool } from './tools/horoscope.js';
import { registerDailyEnglishSentenceTool } from './tools/dailyEnglishSentence.js';
import { registerInternetHotspotsAggregatorTool } from './tools/internetHotspotsAggregator.js';
import { registerTodayHeadlinesHotspotsTool } from './tools/todayHeadlinesHotspots.js';
import { registerPaperNewsHotspotsTool } from './tools/paperNewsHotspots.js';
import { registerOtherHotspotTools } from './tools/otherHotspots.js';

// Create server instance
const server = new McpServer({
  name: "weibo-hot-server",
  version: "0.1.0",
});

// Register all tools
registerWeiboHotspotsTool(server);
registerHoroscopeTool(server);
registerDailyEnglishSentenceTool(server);
registerInternetHotspotsAggregatorTool(server);
registerTodayHeadlinesHotspotsTool(server);
registerPaperNewsHotspotsTool(server);
registerOtherHotspotTools(server);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Weibo Hot MCP Server running on SSE");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
