# FastFlash API - Next.js

Modern REST API built with Next.js 14, TypeScript, and deployed on Vercel.

## Features

- ⚡ **Fast & Modern**: Built with Next.js 14 and TypeScript
- 🔐 **API Key Authentication**: Secure endpoint access
- 📱 **Mobile Responsive**: Works perfectly on all devices
- 🚀 **Easy Deploy**: One-click deployment to Vercel
- 🎨 **Beautiful UI**: Modern gradient design with animations
- 📊 **Real-time Stats**: Live API usage statistics
- 🔍 **Multiple Categories**: AI, Download, Search, Tools, etc.

## Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/fastflash-api)

## Local Development

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/fastflash-api.git
cd fastflash-api
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Run development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000)

## API Usage

### Authentication
All API endpoints require an API key:
\`\`\`
GET /api/ai/gemini?apikey=YOUR_API_KEY&text=Hello
\`\`\`

### Available Endpoints

#### AI Chat
- `/api/ai/gemini` - Google Gemini AI
- `/api/ai/deepseek` - Deepseek AI

#### Download
- `/api/download/tiktok` - TikTok video downloader
- `/api/download/youtube` - YouTube downloader
- `/api/download/instagram` - Instagram downloader

#### Search
- `/api/search/youtube` - YouTube search
- `/api/search/google` - Google search

#### Tools
- `/api/tools/ssweb` - Website screenshot
- `/api/tools/qrcode` - QR code generator

#### Random
- `/api/random/waifu` - Random anime images
- `/api/random/meme` - Random memes

## Configuration

Edit `settings.json` to customize:

\`\`\`json
{
  "creator": "Your Name",
  "whatsapp": "https://wa.me/yourNumber",
  "github": "https://github.com/yourUsername",
  "youtube": "https://youtube.com/@yourChannel",
  "apititle": "Your API Title",
  "apikey": ["key1", "key2", "key3"]
}
\`\`\`

## Environment Variables

Create `.env.local` for sensitive data:

\`\`\`env
DEEPSEEK_API_KEY=your_deepseek_key
GOOGLE_AI_KEY=your_google_key
\`\`\`

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: CSS3 with custom properties
- **Deployment**: Vercel
- **APIs**: Various third-party integrations

## License

MIT License - feel free to use for your projects!

## Support

- 📱 WhatsApp: [Contact Developer](https://wa.me/6285133888035)
- 🐙 GitHub: [Issues & PRs](https://github.com/IbraDecode)
- 📺 YouTube: [Tutorials](https://youtube.com/@IbraDecode)
