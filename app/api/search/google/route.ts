import { type NextRequest, NextResponse } from "next/server"
import { validateApiKey } from "@/lib/config"
import { incrementTotalReq, fetchJson } from "@/lib/helpers"

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
    const result = await fetchJson(`https://fastrestapis.fasturl.cloud/search/google?ask=${q}`)
    return NextResponse.json({
      status: true,
      result: result.result,
    })
  } catch (error: any) {
    return NextResponse.json({ status: false, error: error.message }, { status: 500 })
  }
}
