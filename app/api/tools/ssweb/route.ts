import { type NextRequest, NextResponse } from "next/server"
import { validateApiKey } from "@/lib/config"
import { incrementTotalReq, fetchJson } from "@/lib/helpers"

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
    const result = await fetchJson(
      `https://api.pikwy.com/?tkn=125&d=3000&u=${url}&fs=0&w=1280&h=1200&s=100&z=100&f=$jpg&rt=jweb`,
    )
    return NextResponse.json({
      status: true,
      result: result.iurl,
    })
  } catch (error: any) {
    return NextResponse.json({ status: false, error: error.message }, { status: 500 })
  }
}
