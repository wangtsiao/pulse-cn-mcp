import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { fetchToutiaoHotspots } from '../utils/fetch.js';
import { HeadlinesParams } from '../types/index.js';

export function registerTodayHeadlinesHotspotsTool(server: McpServer) {
  server.tool("today-headlines-hotspots", 
    "获取今日头条热点热搜，返回包含热点内容的实时数据。通过API实时获取。", 
    {
      limit: z.number().positive().optional().describe("显示的热点数量限制")
    },
    async (params: HeadlinesParams) => {
      const data = await fetchToutiaoHotspots();
      
      if (!data.success || !data.data) {
        return {
          content: [
            {
              type: "text",
              text: "无法获取今日头条热点数据"
            }
          ]
        };
      }
      
      // Apply limit if specified
      const limit = params?.limit && params.limit > 0 ? params.limit : undefined;
      const headlines = limit ? data.data.slice(0, limit) : data.data;
      
      // Format headlines
      const formattedHeadlines = headlines.map(item => {
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
            text: formattedHeadlines
          }
        ]
      };
    }
  );
}
