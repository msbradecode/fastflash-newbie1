import { type NextRequest, NextResponse } from "next/server"
import { validateApiKey } from "@/lib/config"
import { incrementTotalReq, fetchJson, getBuffer } from "@/lib/helpers"

async function getWaifu() {
  try {
    const data = await fetchJson(`https://api.waifu.pics/sfw/waifu`)
    const response = await getBuffer(data.url)
    return response
  } catch (error) {
    throw error
  }
}

export async function GET(request: NextRequest) {
  incrementTotalReq()

  const searchParams = request.nextUrl.searchParams
  const apikey = searchParams.get("apikey")

  if (!apikey || !validateApiKey(apikey)) {
    return NextResponse.json({ status: false, error: "Invalid or missing API key" })
  }

  try {
    const imageBuffer = await getWaifu()

    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": "image/png",
        "Content-Length": imageBuffer.length.toString(),
      },
    })
  } catch (error: any) {
    return NextResponse.json({ status: false, error: error.message }, { status: 500 })
  }
}
