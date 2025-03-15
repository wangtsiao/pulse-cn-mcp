import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const WEIBO_API_URL = "https://api.vvhan.com/api/hotlist/wbHot";

// Create server instance
const server = new McpServer({
	name: "weibo-hot-server",
	version: "1.0.0",
});


type WeiboHotItem = {
	title: string;
	hot: string;
	url: string;
	mobil_url: string;
	index: number;
}

type WeiboHotResponse = {
	success: boolean;
	name: string;
	subtitle: string;
	update_time: string;
	data: WeiboHotItem[];
}

async function fetchWeiboHot() {
	const response = await fetch(WEIBO_API_URL);
	const data: WeiboHotResponse = await response.json();
	return data.data;
}

server.tool("get-weibo-hot", "获取微博热搜榜", async () => {
	const hotItems = await fetchWeiboHot();
	return {
		content: [
			{
				type: "text",
				text: hotItems.map(item => `${item.index}. ${item.title} (${item.hot})`).join('\n')
			}
		]
	};
});

async function main() {
	const transport = new StdioServerTransport();
	await server.connect(transport);
	console.error("Weibo Hot MCP Server running on SSE");
}

main().catch((error) => {
	console.error("Fatal error in main():", error);
	process.exit(1);
});
