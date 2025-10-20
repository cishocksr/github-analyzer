# 📊 GitHub Profile Analyzer

A beautiful, feature-rich web application that provides deep insights into your GitHub activity, contributions, and coding patterns. Built with Next.js 15, TypeScript, and Tailwind CSS.

![GitHub Profile Analyzer](https://img.shields.io/badge/Next.js-15.5-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=for-the-badge&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

## ✨ Features

### 📈 Comprehensive Analytics Dashboard
- **Repository Insights**: Total repos, stars, forks, and issues at a glance
- **Language Distribution**: Visual breakdown of your programming languages
- **Activity Timeline**: Monthly commit and repository creation trends
- **Contribution Heatmap**: GitHub-style contribution calendar for the last 365 days
- **Top Repositories**: Ranked by stars, forks, and overall activity

### 🎉 Year in Review
- Interactive story-style presentation of your coding journey
- Slide-based navigation with keyboard support
- Beautiful animations and gradient backgrounds
- Shareable statistics for social media

### 📤 Export & Share
- Export your statistics as JSON
- Share your coding achievements on social media
- Copy-ready formatted stats

## 🚀 Getting Started

### Prerequisites
- Node.js 20+ or Bun runtime
- A GitHub account
- GitHub OAuth App credentials

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/github-analyzer.git
cd github-analyzer
```

2. **Install dependencies**
```bash
# Using npm
npm install

# Using bun (recommended)
bun install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
# GitHub OAuth App credentials
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# NextAuth configuration
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# Optional: Set to production URL when deploying
# NEXTAUTH_URL=https://your-domain.com
```

4. **Create a GitHub OAuth App**

- Go to [GitHub Developer Settings](https://github.com/settings/developers)
- Click "New OAuth App"
- Fill in the details:
    - **Application name**: GitHub Profile Analyzer
    - **Homepage URL**: `http://localhost:3000`
    - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
- Copy the Client ID and generate a Client Secret
- Add them to your `.env.local` file

5. **Generate NextAuth Secret**
```bash
openssl rand -base64 32
```
Add the output to `NEXTAUTH_SECRET` in your `.env.local` file

6. **Run the development server**
```bash
npm run dev
# or
bun dev
```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
github-analyzer/
├── app/                          # Next.js app directory
│   ├── api/                      # API routes
│   │   ├── auth/                 # NextAuth endpoints
│   │   └── github/               # GitHub API integrations
│   ├── dashboard/                # Main dashboard page
│   ├── year-in-review/          # Year in review feature
│   └── page.tsx                  # Landing page
├── components/                   # React components
│   ├── charts/                   # Chart components (Recharts)
│   ├── dashboard-content.tsx    # Main dashboard content
│   ├── year-in-review.tsx       # Year in review slides
│   └── ...                       # Other components
├── lib/                          # Utilities and configurations
│   ├── auth.ts                   # NextAuth configuration
│   ├── github.ts                 # GitHub API client
│   └── cache.ts                  # Caching utilities
├── types/                        # TypeScript type definitions
└── public/                       # Static assets
```

## 🛠️ Built With

### Core Technologies
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety and better DX
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[NextAuth.js 5](https://authjs.dev/)** - Authentication for Next.js

### Key Libraries
- **[@octokit/rest](https://github.com/octokit/rest.js)** - GitHub API client
- **[Recharts](https://recharts.org/)** - Charting library for data visualization
- **[Biome](https://biomejs.dev/)** - Fast linter and formatter

## 📊 API Routes

| Endpoint | Description |
|----------|-------------|
| `GET /api/github/user` | Fetch authenticated user information |
| `GET /api/github/repos` | Get all repositories |
| `GET /api/github/languages` | Get language statistics |
| `GET /api/github/analytics` | Get comprehensive analytics data |
| `GET /api/github/rate-limit` | Check GitHub API rate limit status |

## 🔧 Configuration

### GitHub OAuth Scopes
The app requires the following GitHub OAuth scopes:
- `read:user` - Read user profile information
- `repo` - Access to public and private repositories

### Caching Strategy
- In-memory caching with 5-minute TTL
- Prevents excessive GitHub API calls
- Automatic cache invalidation

### Rate Limiting
- Respects GitHub API rate limits (5,000 requests/hour for authenticated users)
- Implements batch processing for repository language analysis
- Check current rate limit via `/api/github/rate-limit` endpoint

## 🚢 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/github-analyzer)

1. Click the button above or visit [Vercel](https://vercel.com)
2. Import your GitHub repository
3. Add environment variables:
    - `GITHUB_CLIENT_ID`
    - `GITHUB_CLIENT_SECRET`
    - `NEXTAUTH_SECRET`
    - `NEXTAUTH_URL` (your production URL)
4. Deploy!

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- **Netlify**: Use the Next.js plugin
- **Railway**: Direct GitHub integration
- **DigitalOcean App Platform**: Docker or buildpack deployment

## 🧪 Testing

### Run Linter
```bash
npm run lint
# or
bun run lint
```

### Auto-fix Issues
```bash
npm run lint:fix
# or
bun run lint:fix
```

### Format Code
```bash
npm run format
# or
bun run format
```

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style (enforced by Biome)
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [GitHub REST API](https://docs.github.com/en/rest) for providing the data
- [Recharts](https://recharts.org/) for beautiful charts
- [Next.js](https://nextjs.org/) team for an amazing framework
- [Vercel](https://vercel.com/) for hosting and deployment

## 📧 Contact

Have questions or suggestions? Feel free to:
- Open an issue on GitHub
- Reach out via [your email/social]

## 🗺️ Roadmap

- [ ] Dark mode support
- [ ] PDF export functionality
- [ ] User comparison feature
- [ ] Advanced filtering and search
- [ ] Repository recommendations
- [ ] Contribution streak tracking
- [ ] Custom date range selection
- [ ] More visualization options

## 🐛 Known Issues

Check the [Issues](https://github.com/yourusername/github-analyzer/issues) page for known bugs and feature requests.

---

<p align="center">Made with ❤️ by Chris Shockley</p>
<p align="center">
  <a href="https://github.com/yourusername/github-analyzer">⭐ Star this repo</a> if you find it useful!
</p>