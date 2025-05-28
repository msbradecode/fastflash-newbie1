import settings from "../settings.json"

export const API_KEYS = settings.apikey
export const SETTINGS = settings

export const validateApiKey = (apikey: string): boolean => {
  return API_KEYS.includes(apikey)
}
