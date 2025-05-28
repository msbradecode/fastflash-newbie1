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
    const result = await fetchJson(`https://fastrestapis.fasturl.cloud/downup/ytmp4?url=${url}&quality=720&server=auto`)
    return NextResponse.json({
      status: true,
      result: result.result,
    })
  } catch (error: any) {
    return NextResponse.json({ status: false, error: error.message }, { status: 500 })
  }
}
