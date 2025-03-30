// Shared types for Weibo Hot API

export type WeiboHotItem = {
  title: string;
  hot: string;
  url: string;
  mobil_url: string;
  index: number;
}

export type WeiboHotResponse = {
  success: boolean;
  name: string;
  subtitle: string;
  update_time: string;
  data: WeiboHotItem[];
}

// Horoscope types
export type ZodiacSign = "aries" | "taurus" | "gemini" | "cancer" | "leo" | "virgo" | 
                 "libra" | "scorpio" | "sagittarius" | "capricorn" | "aquarius" | "pisces";

export type HoroscopePeriod = "today" | "nextday" | "week" | "month";

export interface HoroscopeParams {
  type?: ZodiacSign;
  time?: HoroscopePeriod;
}

export type HoroscopeResponse = {
  success: boolean;
  data: {
    title: string;
    time: string;
    todo: {
      yi: string;
      ji: string;
    };
    fortune: {
      all: number;
      love: number;
      work: number;
      money: number;
      health: number;
    };
    index: {
      all: string;
      love: string;
      work: string;
      money: string;
      health: string;
    };
    shortcomment: string;
    fortunetext: {
      all: string;
      love: string;
      work: string;
      money: string;
      health: string;
    };
    type: string;
    uptype: string;
    luckynumber: string;
    luckycolor: string;
    luckyconstellation: string;
  }
}

// Daily English types
export interface DailyEnglishParams {
  random?: boolean;
}

export type DailyEnglishResponse = {
  success: boolean;
  data: {
    zh: string;  // Chinese translation
    en: string;  // English sentence
    pic: string; // Picture URL
  }
}

// Internet hotspots types
export type HotspotSource = {
  title: string;
  url: string;
  hot?: string;
  mobileUrl?: string;
  index?: number;
}

export type HotspotCategory = {
  name: string;
  data: HotspotSource[];
}

export type AllHotspotsResponse = {
  success: boolean;
  data: HotspotCategory[];
}

export interface HotspotAggregatorParams {
  limit?: number;
}

// Headlines types
export type HeadlineItem = {
  title: string;
  url: string;
  hot?: string;
  index?: number;
}

export type HeadlinesResponse = {
  success: boolean;
  data: HeadlineItem[];
}

export interface HeadlinesParams {
  limit?: number;
}

// Paper News types
export type PaperNewsItem = {
  title: string;
  url: string;
  hot?: string;
  index?: number;
}

export type PaperNewsResponse = {
  success: boolean;
  data: PaperNewsItem[];
}

export interface PaperNewsParams {
  limit?: number;
}
