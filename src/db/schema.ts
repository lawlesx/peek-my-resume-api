import { pgTable, text, timestamp, integer, uuid } from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'

export const resumes = pgTable('resumes', {
  id: uuid('id').defaultRandom().primaryKey(),

  filename: text('filename').notNull(),
  filepath: text('filepath').notNull(),
  mimetype: text('mimetype').notNull(), // File type (application/pdf, etc.)
  size: integer('size').notNull(), // File size in bytes

  uploadedAt: timestamp('uploaded_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),

  reviewLink: text('review_link'),

  jobRole: text('job_role').notNull(),
  version: integer('version').notNull().default(1),

  // Relation
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
})

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),

  name: text('name'),
  email: text('email').notNull().unique(),

  createdAt: timestamp('created_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
})
