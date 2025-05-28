import { type NextRequest, NextResponse } from "next/server"
import { validateApiKey } from "@/lib/config"
import { incrementTotalReq } from "@/lib/helpers"
import axios from "axios"
import * as cheerio from "cheerio"

async function instagramDownload(url: string) {
  try {
    const response = await axios.post(
      "https://instanavigation.app/api/ajaxSearch",
      new URLSearchParams({
        q: url,
        t: "media",
        lang: "en",
      }),
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Android 10; Mobile; rv:131.0) Gecko/131.0 Firefox/131.0",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
      },
    )

    const $ = cheerio.load(response.data.data)
    const thumbnail = $(".download-items__thumb img").attr("src")
    const downloadUrls: string[] = []

    $(".download-items__btn a").each((_, element) => {
      const href = $(element).attr("href")
      if (href) downloadUrls.push(href)
    })

    return {
      thumbnail: thumbnail || "Thumbnail not found",
      downloadUrls: downloadUrls.length > 0 ? downloadUrls : ["Download URL not found"],
    }
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
    const result = await instagramDownload(url)
    return NextResponse.json({
      status: true,
      result,
    })
  } catch (error: any) {
    return NextResponse.json({ status: false, error: error.message }, { status: 500 })
  }
}
