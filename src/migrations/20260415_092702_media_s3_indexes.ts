import { type MigrateUpArgs, type MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Drop old imageSizes columns (landscape, standard, photo, portrait) from media table
  await db.execute(sql`
    ALTER TABLE "media"
      DROP COLUMN IF EXISTS "sizes_landscape_url",
      DROP COLUMN IF EXISTS "sizes_landscape_width",
      DROP COLUMN IF EXISTS "sizes_landscape_height",
      DROP COLUMN IF EXISTS "sizes_landscape_mime_type",
      DROP COLUMN IF EXISTS "sizes_landscape_filesize",
      DROP COLUMN IF EXISTS "sizes_landscape_filename",
      DROP COLUMN IF EXISTS "sizes_standard_url",
      DROP COLUMN IF EXISTS "sizes_standard_width",
      DROP COLUMN IF EXISTS "sizes_standard_height",
      DROP COLUMN IF EXISTS "sizes_standard_mime_type",
      DROP COLUMN IF EXISTS "sizes_standard_filesize",
      DROP COLUMN IF EXISTS "sizes_standard_filename",
      DROP COLUMN IF EXISTS "sizes_photo_url",
      DROP COLUMN IF EXISTS "sizes_photo_width",
      DROP COLUMN IF EXISTS "sizes_photo_height",
      DROP COLUMN IF EXISTS "sizes_photo_mime_type",
      DROP COLUMN IF EXISTS "sizes_photo_filesize",
      DROP COLUMN IF EXISTS "sizes_photo_filename",
      DROP COLUMN IF EXISTS "sizes_portrait_url",
      DROP COLUMN IF EXISTS "sizes_portrait_width",
      DROP COLUMN IF EXISTS "sizes_portrait_height",
      DROP COLUMN IF EXISTS "sizes_portrait_mime_type",
      DROP COLUMN IF EXISTS "sizes_portrait_filesize",
      DROP COLUMN IF EXISTS "sizes_portrait_filename";
  `)

  // Create new indexes for catalog filtering on prodotti table
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "prodotti_categoria_idx" ON "prodotti" USING btree ("categoria");
    CREATE INDEX IF NOT EXISTS "prodotti_disponibile_idx" ON "prodotti" USING btree ("disponibile");
    CREATE INDEX IF NOT EXISTS "prodotti_in_evidenza_idx" ON "prodotti" USING btree ("in_evidenza");
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // Drop the catalog indexes
  await db.execute(sql`
    DROP INDEX IF EXISTS "prodotti_categoria_idx";
    DROP INDEX IF EXISTS "prodotti_disponibile_idx";
    DROP INDEX IF EXISTS "prodotti_in_evidenza_idx";
  `)

  // Re-add old imageSizes columns (landscape, standard, photo, portrait)
  await db.execute(sql`
    ALTER TABLE "media"
      ADD COLUMN IF NOT EXISTS "sizes_landscape_url" varchar,
      ADD COLUMN IF NOT EXISTS "sizes_landscape_width" numeric,
      ADD COLUMN IF NOT EXISTS "sizes_landscape_height" numeric,
      ADD COLUMN IF NOT EXISTS "sizes_landscape_mime_type" varchar,
      ADD COLUMN IF NOT EXISTS "sizes_landscape_filesize" numeric,
      ADD COLUMN IF NOT EXISTS "sizes_landscape_filename" varchar,
      ADD COLUMN IF NOT EXISTS "sizes_standard_url" varchar,
      ADD COLUMN IF NOT EXISTS "sizes_standard_width" numeric,
      ADD COLUMN IF NOT EXISTS "sizes_standard_height" numeric,
      ADD COLUMN IF NOT EXISTS "sizes_standard_mime_type" varchar,
      ADD COLUMN IF NOT EXISTS "sizes_standard_filesize" numeric,
      ADD COLUMN IF NOT EXISTS "sizes_standard_filename" varchar,
      ADD COLUMN IF NOT EXISTS "sizes_photo_url" varchar,
      ADD COLUMN IF NOT EXISTS "sizes_photo_width" numeric,
      ADD COLUMN IF NOT EXISTS "sizes_photo_height" numeric,
      ADD COLUMN IF NOT EXISTS "sizes_photo_mime_type" varchar,
      ADD COLUMN IF NOT EXISTS "sizes_photo_filesize" numeric,
      ADD COLUMN IF NOT EXISTS "sizes_photo_filename" varchar,
      ADD COLUMN IF NOT EXISTS "sizes_portrait_url" varchar,
      ADD COLUMN IF NOT EXISTS "sizes_portrait_width" numeric,
      ADD COLUMN IF NOT EXISTS "sizes_portrait_height" numeric,
      ADD COLUMN IF NOT EXISTS "sizes_portrait_mime_type" varchar,
      ADD COLUMN IF NOT EXISTS "sizes_portrait_filesize" numeric,
      ADD COLUMN IF NOT EXISTS "sizes_portrait_filename" varchar;
  `)
}
