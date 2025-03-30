import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { fetchWeiboHot } from '../utils/fetch.js';

export function registerWeiboHotspotsTool(server: McpServer) {
  server.tool("get-weibo-hotspots", 
    "获取微博最新热搜榜单，返回包含排名、话题标题和热度值的实时数据。数据来源于微博官方，通过API实时获取。", 
    {}, // No parameters for this tool
    async () => {
      const hotItems = await fetchWeiboHot();
      return {
        content: [
          {
            type: "text",
            text: hotItems.map(item => `${item.index}. ${item.title} (${item.hot})`).join('\n')
          }
        ]
      };
    }
  );
}
