"use client"

import { useEffect, useState } from "react"
import { SETTINGS } from "@/lib/config"

interface Stats {
  totalfitur: string
  totalrequest: string
  status: string
  runtime: string
  domain: string
}

export default function Home() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/status")
        const data = await response.json()
        setStats(data.result)
      } catch (error) {
        console.error("Failed to fetch stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="container">
      <section className="hero">
        <h1>⚡ {SETTINGS.apititle}</h1>
        <p>Simple API with easy and minimalistic integration for WhatsApp Bot Developers.</p>

        <div className="api-links">
          <a href={SETTINGS.saluran} target="_blank" rel="noopener noreferrer">
            📋 Information API
          </a>
          <a href={SETTINGS.whatsapp} target="_blank" rel="noopener noreferrer">
            👤 Contact Developer
          </a>
          <a href="/docs" className="api-links">
            📚 API Documentation
          </a>
        </div>
      </section>

      <div className="stats">
        <div>
          <h3>Total Endpoints</h3>
          <p>{loading ? "..." : stats?.totalfitur || "0"}</p>
        </div>
        <div>
          <h3>Total Requests</h3>
          <p>{loading ? "..." : stats?.totalrequest || "0"}</p>
        </div>
        <div>
          <h3>Status</h3>
          <p>{loading ? "..." : stats?.status || "Unknown"}</p>
        </div>
        <div>
          <h3>Runtime</h3>
          <p>{loading ? "..." : stats?.runtime || "0s"}</p>
        </div>
      </div>

      <footer className="footer">
        <div>© 2025 Fast Flash - Created by {SETTINGS.creator}</div>
        <div className="contact">
          <a href={SETTINGS.github} target="_blank" rel="noopener noreferrer" title="GitHub">
            🐙
          </a>
          <a href={SETTINGS.whatsapp} target="_blank" rel="noopener noreferrer" title="WhatsApp">
            📱
          </a>
          <a href={SETTINGS.youtube} target="_blank" rel="noopener noreferrer" title="YouTube">
            📺
          </a>
        </div>
      </footer>
    </div>
  )
}
