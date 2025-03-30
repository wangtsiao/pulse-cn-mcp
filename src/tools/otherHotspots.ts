import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

// Helper for creating simple hotspot tools that aren't implemented yet
function createEmptyHotspotTool(server: McpServer, name: string, description: string) {
  server.tool(name, description, {}, async () => {
    return {
      content: [
        {
          type: "text",
          text: "该功能尚未实现，敬请期待"
        }
      ]
    };
  });
}

export function registerOtherHotspotTools(server: McpServer) {
  // Hupu hotspots
  createEmptyHotspotTool(
    server,
    "hupu-pedestrian-street-hotspots", 
    "获取虎扑步行街实时热搜榜单，返回包含热点内容的实时数据。通过API实时获取。"
  );
  
  // Zhihu hotspots
  createEmptyHotspotTool(
    server,
    "zhihu-realtime-hotspots", 
    "获取知乎实时热搜榜单，返回包含热点内容的实时数据。通过API实时获取。"
  );
  
  createEmptyHotspotTool(
    server,
    "zhihu-daily-hotspots", 
    "获取知乎日报每日热搜榜单，返回包含热点内容的实时数据。通过API实时获取。"
  );
  
  // 36kr hotspots
  createEmptyHotspotTool(
    server,
    "36-krypton-24-hour-hotspots", 
    "获取36氪24小时热搜榜单，返回包含热点内容的实时数据。通过API实时获取。"
  );
  
  // Bilibili hotspots
  createEmptyHotspotTool(
    server,
    "bilibili-daily-hotspots", 
    "获取哔哩哔哩全站日榜单，返回包含热点内容的实时数据。通过API实时获取。"
  );
  
  // Baidu hotspots
  createEmptyHotspotTool(
    server,
    "baidu-hotspots", 
    "获取百度热搜榜单，返回包含热点内容的实时数据。通过API实时获取。"
  );
  
  // Douyin hotspots
  createEmptyHotspotTool(
    server,
    "douyin-hotspots", 
    "获取抖音热搜榜单，返回包含热点内容的实时数据。通过API实时获取。"
  );
  
  // Douban group hotspots
  createEmptyHotspotTool(
    server,
    "douban-group-hotspots", 
    "获取豆瓣小组精选热搜榜单，返回包含热点内容的实时数据。通过API实时获取。"
  );
  
  // Huxiu hotspots
  createEmptyHotspotTool(
    server,
    "huxiu-hotspots", 
    "获取虎嗅网热搜榜单，返回包含热点内容的实时数据。通过API实时获取。"
  );
  
  // Product manager hotspots
  createEmptyHotspotTool(
    server,
    "product-manager-hotspots", 
    "获取人人都是产品经理热搜榜单，返回包含热点内容的实时数据。通过API实时获取。"
  );
  
  // IT information hotspots
  createEmptyHotspotTool(
    server,
    "in-information-hotspots", 
    "获取IT资讯热搜榜单，返回包含热点内容的实时数据。通过API实时获取。"
  );
  
  // Insect hotspots
  createEmptyHotspotTool(
    server,
    "insect-hotspots", 
    "获取虫族部落热搜榜单，返回包含热点内容的实时数据。通过API实时获取。"
  );
}
