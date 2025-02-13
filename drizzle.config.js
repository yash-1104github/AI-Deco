import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    schema: './config/schema.js',
    dialect: 'postgresql',
    dbCredentials: {
    url: 'postgresql://neondb_owner:npg_9OiyHvUT0mbh@ep-polished-cherry-a1f899np-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require',
    },
});