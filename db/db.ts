import { drizzle } from "drizzle-orm/postgres-js";

import postgres from "postgres";

import * as invoicesSchema from "./schema/invoice";
import * as usersSchema from "./schema/auth";

const connectionString = process.env.DATABASE_URL!;
const pool = postgres(connectionString, { max: 1 });

export const db = drizzle(pool, {
  schema: { ...usersSchema, ...invoicesSchema },
});
