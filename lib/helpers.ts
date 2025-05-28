import axios from "axios"

export function tanggal(numer: number): string {
  const myMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const myDays = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"]
  const tgl = new Date(numer)
  const day = tgl.getDate()
  const bulan = tgl.getMonth()
  const thisDay = myDays[tgl.getDay()]
  const yy = tgl.getYear()
  const year = yy < 1000 ? yy + 1900 : yy

  return `${thisDay}, ${day}/${myMonths[bulan]}/${year}`
}

export const capital = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const getBuffer = async (url: string, options?: any): Promise<Buffer> => {
  try {
    const res = await axios({
      method: "get",
      url,
      headers: {
        DNT: 1,
        "Upgrade-Insecure-Request": 1,
      },
      ...options,
      responseType: "arraybuffer",
    })
    return Buffer.from(res.data)
  } catch (err) {
    throw err
  }
}

export const fetchJson = async (url: string, options?: any): Promise<any> => {
  try {
    const res = await axios({
      method: "GET",
      url: url,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
      },
      ...options,
    })
    return res.data
  } catch (err) {
    throw err
  }
}

export const runtime = (seconds: number = process.uptime()): string => {
  seconds = Number(seconds)
  const d = Math.floor(seconds / (3600 * 24))
  const h = Math.floor((seconds % (3600 * 24)) / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  const dDisplay = d > 0 ? d + (d == 1 ? "d " : "d ") : ""
  const hDisplay = h > 0 ? h + (h == 1 ? "h " : "h ") : ""
  const mDisplay = m > 0 ? m + (m == 1 ? "m " : "m ") : ""
  const sDisplay = s > 0 ? s + (s == 1 ? "s" : "s") : ""
  return dDisplay + hDisplay + mDisplay + sDisplay
}

// Global state
let totalReq = 0

export const incrementTotalReq = () => {
  totalReq += 1
  return totalReq
}

export const getTotalReq = () => totalReq

// Tambahkan function untuk menghitung endpoints
export const getTotalEndpoints = async (): Promise<number> => {
  try {
    const endpoints = await import("../app/api/endpoints.json")
    return Object.values(endpoints.default).reduce((total: number, category: any) => total + category.length, 0)
  } catch {
    return 50 // fallback number
  }
}
