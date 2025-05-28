"use client"

import { useEffect, useState } from "react"
import { SETTINGS } from "@/lib/config"

interface ApiEndpoint {
  name: string
  desc: string
  status: string
  path: string
}

interface ApiCategories {
  [key: string]: ApiEndpoint[]
}

export default function DocsPage() {
  const [endpoints, setEndpoints] = useState<ApiCategories>({})
  const [activeTab, setActiveTab] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEndpoints = async () => {
      try {
        const response = await fetch("/api/endpoints")
        const data = await response.json()
        setEndpoints(data)
        setActiveTab(Object.keys(data)[0] || "")
      } catch (error) {
        console.error("Failed to fetch endpoints:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchEndpoints()
  }, [])

  const filteredEndpoints = Object.keys(endpoints).reduce((acc, category) => {
    const filtered = endpoints[category].filter(
      (endpoint) =>
        endpoint.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        endpoint.desc.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    if (filtered.length > 0) {
      acc[category] = filtered
    }
    return acc
  }, {} as ApiCategories)

  const displayEndpoints = searchQuery ? filteredEndpoints : endpoints

  if (loading) {
    return (
      <div className="container">
        <div className="hero">
          <h1>📚 API Documentation</h1>
          <p>Loading endpoints...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="hero">
        <h1>📚 API Documentation</h1>
        <p>Complete guide to all available API endpoints</p>

        <div style={{ marginTop: "2rem", maxWidth: "500px", margin: "2rem auto 0" }}>
          <input
            type="text"
            placeholder="🔍 Search endpoints..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "1rem 1.5rem",
              fontSize: "1rem",
              borderRadius: "25px",
              border: "2px solid rgba(255, 255, 255, 0.2)",
              background: "rgba(255, 255, 255, 0.1)",
              color: "white",
              backdropFilter: "blur(10px)",
            }}
          />
        </div>
      </div>

      {!searchQuery && (
        <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem", overflowX: "auto" }}>
          {Object.keys(endpoints).map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              style={{
                background: activeTab === category ? "white" : "transparent",
                color: activeTab === category ? "var(--primary)" : "white",
                border: "2px solid white",
                padding: "0.8rem 1.5rem",
                borderRadius: "25px",
                cursor: "pointer",
                fontWeight: "600",
                whiteSpace: "nowrap",
                transition: "all 0.3s ease",
              }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      )}

      <div style={{ display: "grid", gap: "1.5rem" }}>
        {Object.keys(displayEndpoints).map((category) => (
          <div key={category}>
            {searchQuery && (
              <h2 style={{ marginBottom: "1rem", color: "white" }}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </h2>
            )}

            {(!searchQuery ? activeTab === category : true) &&
              displayEndpoints[category].map((endpoint, index) => (
                <div
                  key={index}
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    padding: "1.5rem",
                    borderRadius: "15px",
                    border: "2px solid rgba(255, 255, 255, 0.2)",
                    marginBottom: "1rem",
                    backdropFilter: "blur(5px)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "start",
                      marginBottom: "1rem",
                    }}
                  >
                    <div>
                      <h3 style={{ color: "white", marginBottom: "0.5rem" }}>{endpoint.name}</h3>
                      <p style={{ color: "rgba(255, 255, 255, 0.8)", marginBottom: "1rem" }}>{endpoint.desc}</p>
                      <span
                        style={{
                          background:
                            endpoint.status === "Active" ? "rgba(0, 206, 168, 0.2)" : "rgba(243, 156, 18, 0.2)",
                          color: "white",
                          padding: "0.4rem 1rem",
                          borderRadius: "20px",
                          fontSize: "0.8rem",
                          fontWeight: "600",
                        }}
                      >
                        {endpoint.status}
                      </span>
                    </div>
                  </div>

                  <div
                    style={{
                      background: "rgba(0, 0, 0, 0.2)",
                      padding: "1rem",
                      borderRadius: "8px",
                      fontFamily: "monospace",
                      fontSize: "0.9rem",
                      color: "white",
                      overflowX: "auto",
                    }}
                  >
                    <code>
                      GET {window.location.origin}
                      {endpoint.path}
                    </code>
                  </div>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(`${window.location.origin}${endpoint.path}`)
                      alert("URL copied to clipboard!")
                    }}
                    style={{
                      background: "linear-gradient(135deg, var(--primary), var(--primary-light))",
                      color: "white",
                      border: "none",
                      padding: "0.8rem 1.5rem",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: "600",
                      marginTop: "1rem",
                      transition: "all 0.3s ease",
                    }}
                  >
                    📋 Copy URL
                  </button>
                </div>
              ))}
          </div>
        ))}
      </div>

      <div
        style={{
          textAlign: "center",
          marginTop: "3rem",
          padding: "2rem",
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "15px",
        }}
      >
        <h3 style={{ color: "white", marginBottom: "1rem" }}>Need Help?</h3>
        <p style={{ color: "rgba(255, 255, 255, 0.8)", marginBottom: "1.5rem" }}>
          Contact our developer for support and custom integrations
        </p>
        <a
          href={SETTINGS.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: "linear-gradient(135deg, var(--secondary), var(--accent))",
            color: "white",
            textDecoration: "none",
            padding: "1rem 2rem",
            borderRadius: "25px",
            fontWeight: "600",
            display: "inline-block",
            transition: "all 0.3s ease",
          }}
        >
          💬 Contact Developer
        </a>
      </div>
    </div>
  )
}
