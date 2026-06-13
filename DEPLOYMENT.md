# ResQNet Deployment

## Backend
Deploy `resqnet-api` as a Node web service.

Build command:
```bash
npm ci
```

Start command:
```bash
npm start
```

Required environment variables:
```bash
MONGO_URI=mongodb+srv://...
JWT_SECRET=change_this_to_a_long_random_secret
FRONTEND_URL=https://your-frontend-domain.com
NODEMAILER_USER=rahulgavhade55@gmail.com
NODEMAILER_PASS=your_email_app_password
STRIPE_SECRET_KEY=your_stripe_secret_key
```

Health check path:
```bash
/health
```

## Frontend
Deploy `resqnet-client` as a static Vite site.

Build command:
```bash
npm ci && npm run build
```

Publish directory:
```bash
dist
```

Required environment variable:
```bash
VITE_API_URL=https://your-backend-domain.com
```

## Important
Do not commit real `.env` files. Add the live frontend URL to backend `FRONTEND_URL`, and add the live backend URL to frontend `VITE_API_URL`.
