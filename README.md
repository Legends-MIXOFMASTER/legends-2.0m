# LegendTracker

A full-stack Node.js/Express/React application for managing House Legends courses, bookings, and contact forms.

## Deployment

### Build Command
```
npm run build
```

### Start Command
```
npm run start
```

### Environment Variables
Copy `.env.example` to `.env` and fill in your secrets:

```
DATABASE_URL=
JWT_SECRET=
EMAIL_USER=
EMAIL_PASS=
EMAIL_FROM=
CONTACT_EMAIL=
PLAUSIBLE_DOMAIN=
BASE_URL=
PORT=3000
```

## Local Development

1. Install dependencies:
   ```
   npm install
   ```
2. Copy `.env.example` to `.env` and fill in all required values.
3. Run the development server:
   ```
   npm run dev
   ```
4. Run tests:
   ```
   npm test
   ```

## CI/CD Setup

This project uses GitHub Actions for CI/CD. The workflow includes:
- Running tests across multiple Node.js versions
- Code coverage reporting with Codecov
- Security scanning with Snyk
- Automated deployment to Vercel

### Required Secrets

Add these secrets in your GitHub repository settings (Settings > Secrets and variables > Actions):

```
CODECOV_TOKEN=      # Get from Codecov after connecting your repo
SNYK_TOKEN=         # Get from Snyk after connecting your repo
VERCEL_TOKEN=       # Get from Vercel user settings
VERCEL_ORG_ID=      # Get from Vercel organization settings
VERCEL_PROJECT_ID=  # Get from Vercel project settings
```

## Production Deployment

### Vercel (Recommended)
1. Push your repo to GitHub
2. Set up the required secrets for GitHub Actions
3. Push to `main` or `develop` branch to trigger deployment
4. The site will be automatically deployed to Vercel

### Railway (Alternative)
1. Push your repo to GitHub
2. Connect your repo to Railway
3. Set the build command: `npm run build`
4. Set the start command: `npm run start`
5. Add all required environment variables in Railway's dashboard
6. Deploy!

---

For more help, open an issue or contact the maintainer.
