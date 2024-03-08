# MalinRecipe

Malin Recipe is a recipes web app (again ...), using NextJs, TypeScript, AWS S3, PrismaORM, NextAuth, Material-Ui.

## Installation

Create a .env in root project directory with :

```bash
# MONGO DB ENV
DATABASE_URL
DATABASE_USER
DATABASE_PASSWORD

# AUTH PROVIDERS ENV
NEXTAUTH_URL
NEXTAUTH_SECRET
GITHUB_ID
GITHUB_SECRET
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET

# AWS IMAGE STORAGE ENV
AWS_BUCKET_NAME
AWS_BUCKET_REGION
AWS_BUCKET_ID
AWS_BUCKET_SECRET
```

Then, you shall start the project with :

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Finally, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
