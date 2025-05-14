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

## Production Deployment (e.g., Railway)
1. Push your repo to GitHub.
2. Connect your repo to Railway.
3. Set the build command: `npm run build`
4. Set the start command: `npm run start`
5. Add all required environment variables in Railway's dashboard.
6. Deploy!

---

For more help, open an issue or contact the maintainer.
