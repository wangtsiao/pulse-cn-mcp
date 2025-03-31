<div align="center">

# 🔥 Pulse CN MCP Server

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.x-blue)](https://www.typescriptlang.org/)
[![smithery badge](https://smithery.ai/badge/@wangtsiao/pulse-cn-mcp)](https://smithery.ai/server/@wangtsiao/pulse-cn-mcp)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

A powerful Model Context Protocol (MCP) server providing real-time trending content from the Chinese internet.

[Features](#features) • [Installation](#installation) • [Quick Start](#quick-start) • [Documentation](#documentation) • [Contributing](#contributing) • [License](#license)

</div>

## 🌟 Overview

Pulse CN MCP Server enables AI models to access up-to-date information about what's trending on the Chinese internet. Built with the Model Context Protocol (MCP), it acts as a bridge between AI models and real-time data from China's most popular social media platforms, news sites, and content aggregators.

## ✨ Features

The server provides real-time access to trending data from 18 major Chinese platforms:

| Platform | Content | Status |
|----------|---------|--------|
| 🔮 **星座运势** | Daily horoscope predictions | ✅ |
| 💬 **每日一句励志英语** | Daily motivational English quotes | ✅ |
| 📊 **热搜热榜聚合** | Aggregated trending topics | ✅ |
| 🔥 **微博实时热搜** | Weibo real-time trending topics | ✅ |
| 📰 **今日头条热搜** | Today's Headlines trending news | ✅ |
| 📝 **澎湃新闻热搜** | ThePaper.cn news trending topics | ✅ |
| 🏀 **虎扑步行街热搜** | Hupu BXJ real-time trends | 🔜 |
| ❓ **知乎实时热搜** | Zhihu real-time trending topics | 🔜 |
| 📔 **知乎每日日报** | Zhihu daily digest | 🔜 |
| 💼 **36氪24小时热榜** | 36Kr 24-hour trending business news | 🔜 |
| 🎬 **哔哩哔哩全站日榜** | Bilibili daily rankings | 🔜 |
| 🔍 **百度热点热榜** | Baidu trending topics | 🔜 |
| 📱 **抖音热点热榜** | Douyin trending topics | 🔜 |
| 👥 **豆瓣小组精选** | Douban group featured content | 🔜 |
| 💻 **IT资讯热榜** | IT news trending topics | 🔜 |
| 📈 **虎嗅网热榜** | Huxiu 24-hour trending topics | 🔜 |
| 📱 **产品经理热文榜** | Woshipm daily popular articles | 🔜 |
| 🐞 **虫族部落最新热门** | Chongbuluo latest popular content | 🔜 |

## 🚀 Installation

```bash
# Clone the repository
git clone https://github.com/wangtsiao/pulse-cn-mcp.git

# Navigate to the project directory
cd pulse-cn-mcp

# Using npm
npm install
npm run build

# Or using Bun (faster)
bun install
bun run build
```

## ⚡ Quick Start

Start the MCP server with:

```bash
# Using npm
npm start

# Or using Bun
bun start
```

This launches the server using the Stdio transport, making it ready for MCP-compatible AI models to connect.

## 📖 Documentation

### Architecture

Pulse CN MCP Server follows a modular architecture with individual tools for each data source:

```
src/
├── index.ts            # Main entry point and server setup
└── tools/              # Individual tool implementations
    ├── weiboHotspots.js
    ├── horoscope.js
    ├── dailyEnglishSentence.js
    ├── internetHotspotsAggregator.js
    ├── todayHeadlinesHotspots.js
    ├── paperNewsHotspots.js
    └── otherHotspots.js
```

### Available Tools

#### Fully Implemented

| Tool Name | Description | Endpoint |
|-----------|-------------|----------|
| `weibo-hotspots` | Real-time trending topics from Weibo | `/weibo-hotspots` |
| `horoscope` | Daily horoscope by zodiac sign | `/horoscope` |
| `daily-english-sentence` | Daily motivational English quotes | `/daily-english-sentence` |
| `internet-hotspots-aggregator` | Aggregated trending topics | `/internet-hotspots-aggregator` |
| `today-headlines-hotspots` | Today's Headlines trending topics | `/today-headlines-hotspots` |
| `paper-news-hotspots` | ThePaper.cn trending news | `/paper-news-hotspots` |

#### Coming Soon

- `hupu-pedestrian-street-hotspots`
- `zhihu-realtime-hotspots`
- `zhihu-daily-hotspots`
- `36-krypton-24-hour-hotspots`
- `bilibili-daily-hotspots`
- `baidu-hotspots`
- `douyin-hotspots`
- `douban-group-hotspots`
- `huxiu-hotspots`
- `product-manager-hotspots`
- `in-information-hotspots`
- `insect-hotspots`

### Integration Example

Here's how to integrate with the server using TypeScript:

```typescript
import { McpClient } from "@modelcontextprotocol/sdk/client";

async function example() {
  const client = new McpClient();
  
  // Get Weibo trending topics
  const weiboHotspots = await client.callTool("weibo-hotspots", {});
  console.log(weiboHotspots.content);
  
  // Get daily horoscope for Aries
  const horoscope = await client.callTool("horoscope", { sign: "aries" });
  console.log(horoscope.content);
}
```

## 🛠️ Development

### Adding a New Tool

1. Create a new file in `src/tools/` (e.g., `myNewTool.ts`)
2. Implement your tool using the MCP Server SDK
3. Register the tool in `src/index.ts`

Example:

```typescript
// src/tools/myNewTool.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export function registerMyNewTool(server: McpServer) {
  server.tool(
    "my-new-tool",
    "Description of my new tool",
    {
      // Tool parameters schema
      param1: z.string().describe("Parameter description")
    },
    async (params) => {
      // Tool implementation
      return {
        content: [
          { type: "text", text: "Result of my tool" }
        ]
      };
    }
  );
}

// src/index.ts - Add import and registration
import { registerMyNewTool } from './tools/myNewTool.js';
// ...
registerMyNewTool(server);
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

This project utilizes the free APIs provided by [韩小韩API](https://api.vvhan.com/). We express our sincere gratitude for their excellent service and support.

---

<div align="center">
  <sub>Built with ❤️ by wangtsiao</sub>
</div>


