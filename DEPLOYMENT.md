# ResQNet Deployment

## Backend on Render
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

## Frontend on Vercel
Deploy `resqnet-client` as a Vite project.

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

Recommended deploy order:
1. Deploy backend on Render with MongoDB Atlas `MONGO_URI`.
2. Deploy frontend on Vercel with `VITE_API_URL` set to the Render backend URL.
3. Update Render `FRONTEND_URL` to the final Vercel frontend URL.
