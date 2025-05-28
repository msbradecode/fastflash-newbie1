import { type NextRequest, NextResponse } from "next/server"
import { validateApiKey } from "@/lib/config"
import { incrementTotalReq } from "@/lib/helpers"

const DEEPSEEK_API_KEY =
  process.env.DEEPSEEK_API_KEY || "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"

async function deepseekChat(text: string) {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1:free",
        messages: [
          {
            role: "user",
            content: text,
          },
        ],
      }),
    })

    const data = await response.json()

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error("Invalid response from Deepseek API")
    }

    return data.choices[0].message.content.trim()
  } catch (err: any) {
    throw new Error("Failed to fetch from Deepseek API: " + err.message)
  }
}

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
    const result = await deepseekChat(text)
    return NextResponse.json({
      status: true,
      result,
    })
  } catch (error: any) {
    return NextResponse.json({ status: false, error: error.message }, { status: 500 })
  }
}
