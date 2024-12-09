import { relations } from "drizzle-orm";
import {
  date,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { users } from "./auth";

export const currencyEnum = pgEnum("currency", ["USD", "EUR"]);
export const statusEnum = pgEnum("status", ["PENDING", "PAID"]);

export const Invoices = pgTable("invoices", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  invoiceName: text("invoiceName").notNull(),
  invoiceNumber: text("invoiceNumber").notNull(),
  date: date({ mode: "date" }).notNull(),
  dueDate: date({ mode: "date" }).notNull(),
  clientName: text("clientName").notNull(),
  clientEmail: text("clientEmail").notNull(),
  clientAddress: text("clientAddress").notNull(),
  fromName: text("fromName").notNull(),
  fromEmail: text("fromEmail").notNull(),
  fromAddress: text("fromAddress").notNull(),
  rate: integer().notNull(),
  amount: integer().notNull(),
  description: text("description").notNull(),
  note: text("note"),
  subtotal: integer().notNull(),
  totalAmount: integer().notNull(),
  currency: currencyEnum(),
  status: statusEnum(),
  userId: uuid("userId").notNull(),
  createdAt: timestamp().defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  invoices: many(Invoices),
}));
