import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE,
});

export const segmentApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SEGMENT_API,
});
