import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { fetchAllHotspots } from '../utils/fetch.js';
import { HotspotAggregatorParams } from '../types/index.js';

export function registerInternetHotspotsAggregatorTool(server: McpServer) {
  server.tool("internet-hotspots-aggregator", 
    "获取互联网热点聚合数据，返回包含热点内容的实时数据，包含微博热搜、今日头条、知乎日报、虎扑步行街、36氪、哔哩哔哩热榜，知乎、IT资讯、虎嗅网、人人都是产品经理热榜百度、抖音热点豆瓣小组精选。通过API实时获取。",
    {
      limit: z.number().positive().optional().describe("每个分类显示的热点数量限制")
    },
    async (params: HotspotAggregatorParams) => {
      const data = await fetchAllHotspots();
      
      if (!data.success || !data.data) {
        return {
          content: [
            {
              type: "text",
              text: "无法获取互联网热点聚合数据"
            }
          ]
        };
      }
      
      // Apply limit if specified
      const limit = params?.limit && params.limit > 0 ? params.limit : undefined;
      
      // Format each category with its hotspots
      const formattedContent = data.data.map(category => {
        const items = limit ? category.data.slice(0, limit) : category.data;
        
        const itemsList = items.map(item => {
          // Format depends on available data
          if (item.index !== undefined) {
            return `${item.index}. ${item.title}${item.hot ? ` (${item.hot})` : ''}`;
          } else {
            return `• ${item.title}${item.hot ? ` (${item.hot})` : ''}`;
          }
        }).join('\n');
        
        return `【${category.name}】\n${itemsList}\n`;
      }).join('\n');
      
      return {
        content: [
          {
            type: "text",
            text: formattedContent
          }
        ]
      };
    }
  );
}
