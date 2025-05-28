import { type NextRequest, NextResponse } from "next/server"
import { validateApiKey } from "@/lib/config"
import { incrementTotalReq } from "@/lib/helpers"
import yt from "yt-search"

export async function GET(request: NextRequest) {
  incrementTotalReq()

  const searchParams = request.nextUrl.searchParams
  const q = searchParams.get("q")
  const apikey = searchParams.get("apikey")

  if (!q) {
    return NextResponse.json({ status: false, error: "Query is required" })
  }

  if (!apikey || !validateApiKey(apikey)) {
    return NextResponse.json({ status: false, error: "Invalid or missing API key" })
  }

  try {
    const results = await yt(q)
    return NextResponse.json({
      status: true,
      result: results.all,
    })
  } catch (error: any) {
    return NextResponse.json({ status: false, error: error.message }, { status: 500 })
  }
}
