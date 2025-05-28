import { type NextRequest, NextResponse } from "next/server"
import { validateApiKey } from "@/lib/config"
import { incrementTotalReq } from "@/lib/helpers"
import QRCode from "qrcode"

export async function GET(request: NextRequest) {
  incrementTotalReq()

  const searchParams = request.nextUrl.searchParams
  const text = searchParams.get("text")
  const apikey = searchParams.get("apikey")

  if (!text) {
    return NextResponse.json({ status: false, error: "Text is required" })
  }

  if (!apikey || !validateApiKey(apikey)) {
    return NextResponse.json({ status: false, error: "Invalid or missing API key" })
  }

  try {
    const qrBuffer = await QRCode.toBuffer(text, {
      type: "png",
      width: 512,
      margin: 2,
    })

    return new NextResponse(qrBuffer, {
      headers: {
        "Content-Type": "image/png",
        "Content-Length": qrBuffer.length.toString(),
      },
    })
  } catch (error: any) {
    return NextResponse.json({ status: false, error: error.message }, { status: 500 })
  }
}
