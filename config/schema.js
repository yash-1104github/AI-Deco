import { integer, serial, varchar, pgTable, timestamp } from "drizzle-orm/pg-core";

export const Users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull(),
  imageUrl: varchar("imageUrl").notNull(),
  credits: integer("credits").default(10),
  createdAt: timestamp("createdAt").defaultNow(),
});

export const AiGeneratedImage = pgTable("aiGeneratedImage", {
  id: serial("id").primaryKey(),
  roomType: varchar("roomType").notNull(),
  designType: varchar("designType").notNull(),
  originalImg: varchar("originalImg").notNull(),
  aiImage: varchar("aiImage").notNull(),
  userEmail: varchar("userEmail"),
  createdAt: timestamp("createdAt").defaultNow(),
});

export const CommunityImages = pgTable("communityImages", {
  id: serial("id").primaryKey(),
  roomType: varchar("roomType").notNull(),
  designType: varchar("designType").notNull(),
  originalImg: varchar("originalImg").notNull(),
  aiImage: varchar("aiImage").notNull(),
  userEmail: varchar("userEmail"),
  userName: varchar("userName"),
  createdAt: timestamp("createdAt").defaultNow(),
});