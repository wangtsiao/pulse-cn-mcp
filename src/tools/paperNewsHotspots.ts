import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { fetchPaperNews } from '../utils/fetch.js';
import { PaperNewsParams } from '../types/index.js';

export function registerPaperNewsHotspotsTool(server: McpServer) {
  server.tool("the-paper-news-hotspots", 
    "获取澎湃新闻热搜榜单，返回包含热点内容的实时数据。通过API实时获取。", 
    {
      limit: z.number().positive().optional().describe("显示的新闻数量限制")
    },
    async (params: PaperNewsParams) => {
      const data = await fetchPaperNews();
      
      if (!data.success || !data.data) {
        return {
          content: [
            {
              type: "text",
              text: "无法获取澎湃新闻热点数据"
            }
          ]
        };
      }
      
      // Apply limit if specified
      const limit = params?.limit && params.limit > 0 ? params.limit : undefined;
      const newsItems = limit ? data.data.slice(0, limit) : data.data;
      
      // Format news items
      const formattedNews = newsItems.map(item => {
        if (item.index !== undefined) {
          return `${item.index}. ${item.title}${item.hot ? ` (${item.hot})` : ''}`;
        } else {
          return `• ${item.title}${item.hot ? ` (${item.hot})` : ''}`;
        }
      }).join('\n');
      
      return {
        content: [
          {
            type: "text",
            text: "【澎湃新闻热搜榜】\n" + formattedNews
          }
        ]
      };
    }
  );
}
