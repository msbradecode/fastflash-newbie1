import { type NextRequest, NextResponse } from "next/server"
import { validateApiKey } from "@/lib/config"
import { incrementTotalReq } from "@/lib/helpers"
import axios from "axios"

async function tiktokDownload(query: string) {
  try {
    const encodedParams = new URLSearchParams()
    encodedParams.set("url", query)
    encodedParams.set("hd", "1")

    const response = await axios({
      method: "POST",
      url: "https://tikwm.com/api/",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        Cookie: "current_language=en",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36",
      },
      data: encodedParams,
    })

    return response.data
  } catch (error) {
    throw error
  }
}

export async function GET(request: NextRequest) {
  incrementTotalReq()

  const searchParams = request.nextUrl.searchParams
  const url = searchParams.get("url")
  const apikey = searchParams.get("apikey")

  if (!url) {
    return NextResponse.json({ status: false, error: "URL is required" })
  }

  if (!apikey || !validateApiKey(apikey)) {
    return NextResponse.json({ status: false, error: "Invalid or missing API key" })
  }

  try {
    const result = await tiktokDownload(url)
    return NextResponse.json({
      status: true,
      result,
    })
  } catch (error: any) {
    return NextResponse.json({ status: false, error: error.message }, { status: 500 })
  }
}
