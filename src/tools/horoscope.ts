import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { fetchHoroscope } from '../utils/fetch.js';
import { HoroscopeParams } from '../types/index.js';

// Zodiac translation maps
const timeMap: Record<string, string> = {
  "today": "今日",
  "nextday": "明日",
  "week": "本周",
  "month": "本月"
};

const typeMap: Record<string, string> = {
  "aries": "白羊座",
  "taurus": "金牛座",
  "gemini": "双子座",
  "cancer": "巨蟹座",
  "leo": "狮子座",
  "virgo": "处女座",
  "libra": "天秤座",
  "scorpio": "天蝎座",
  "sagittarius": "射手座",
  "capricorn": "摩羯座",
  "aquarius": "水瓶座",
  "pisces": "双鱼座"
};

// Constants for the zodiac signs and time periods
const zodiacSigns = ["aries", "taurus", "gemini", "cancer", "leo", "virgo", 
                    "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"] as const;
const horoscopePeriods = ["today", "nextday", "week", "month"] as const;

export function registerHoroscopeTool(server: McpServer) {
  server.tool("get-realtime-horoscope", 
    "获取今日、明日、本周、本月十二星座运势星座运势，返回包含运势内容的实时数据。通过API实时获取。", 
    {
      type: z.enum(zodiacSigns).optional().describe("星座名称（英文）"),
      time: z.enum(horoscopePeriods).optional().describe("运势时段")
    },
    async (params: HoroscopeParams) => {
      // Default to scorpio and today if not specified
      const type = params?.type || "scorpio";
      const time = params?.time || "today";
      
      const data = await fetchHoroscope(type, time);
      
      if (!data.success) {
        return {
          content: [
            {
              type: "text",
              text: "无法获取星座运势数据"
            }
          ]
        };
      }
      
      const horoscope = data.data;
      
      const result = `${typeMap[type]}${timeMap[time]}运势 (${horoscope.time})\n\n` +
        `综合指数: ${horoscope.index.all} (${horoscope.fortune.all}星)\n` +
        `爱情指数: ${horoscope.index.love} (${horoscope.fortune.love}星)\n` +
        `工作指数: ${horoscope.index.work} (${horoscope.fortune.work}星)\n` +
        `财富指数: ${horoscope.index.money} (${horoscope.fortune.money}星)\n` +
        `健康指数: ${horoscope.index.health} (${horoscope.fortune.health}星)\n\n` +
        `短评: ${horoscope.shortcomment}\n\n` +
        `宜: ${horoscope.todo.yi}\n` +
        `忌: ${horoscope.todo.ji}\n\n` +
        `综合运势: ${horoscope.fortunetext.all}\n\n` +
        `爱情运势: ${horoscope.fortunetext.love}\n\n` +
        `工作学习: ${horoscope.fortunetext.work}\n\n` +
        `财富运势: ${horoscope.fortunetext.money}\n\n` +
        `健康运势: ${horoscope.fortunetext.health}\n\n` +
        `幸运数字: ${horoscope.luckynumber}\n` +
        `幸运颜色: ${horoscope.luckycolor}\n` +
        `幸运星座: ${horoscope.luckyconstellation}`;
      
      return {
        content: [
          {
            type: "text",
            text: result
          }
        ]
      };
    }
  );
}
