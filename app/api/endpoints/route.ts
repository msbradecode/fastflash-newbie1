import { NextResponse } from "next/server"
import endpoints from "../endpoints.json"

export async function GET() {
  return NextResponse.json(endpoints)
}
