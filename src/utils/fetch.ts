import {
  WeiboHotResponse,
  HoroscopeResponse,
  DailyEnglishResponse,
  AllHotspotsResponse,
  HeadlinesResponse,
  PaperNewsResponse
} from '../types/index.js';


export async function fetchWeiboHot() {
  const response = await fetch("https://api.vvhan.com/api/hotlist/wbHot");
  const data: WeiboHotResponse = await response.json();
  return data.data;
}

export async function fetchHoroscope(type: string, time: string) {
  const url = `https://api.vvhan.com/api/horoscope?type=${type}&time=${time}`;
  const response = await fetch(url);
  const data: HoroscopeResponse = await response.json();
  return data;
}

export async function fetchDailyEnglish(random: boolean = false) {
  const url = random 
    ? 'https://api.vvhan.com/api/dailyEnglish?type=sj'
    : 'https://api.vvhan.com/api/dailyEnglish';
  const response = await fetch(url);
  const data: DailyEnglishResponse = await response.json();
  return data;
}

export async function fetchAllHotspots(): Promise<AllHotspotsResponse> {
  const url = 'https://api.vvhan.com/api/hotlist/all';
  const response = await fetch(url);
  const data: AllHotspotsResponse = await response.json();
  return data;
}

export async function fetchToutiaoHotspots(): Promise<HeadlinesResponse> {
  const url = 'https://api.vvhan.com/api/hotlist/toutiao';
  const response = await fetch(url);
  const data: HeadlinesResponse = await response.json();
  return data;
}

export async function fetchPaperNews(): Promise<PaperNewsResponse> {
  const url = 'https://api.vvhan.com/api/hotlist/pengPai';
  const response = await fetch(url);
  const data: PaperNewsResponse = await response.json();
  return data;
}
