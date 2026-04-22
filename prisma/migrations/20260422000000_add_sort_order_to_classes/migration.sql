-- AlterTable
ALTER TABLE "classes" ADD COLUMN IF NOT EXISTS "sort_order" INTEGER NOT NULL DEFAULT 0;

-- Backfill using creation order as initial sequence per course
WITH ranked AS (
  SELECT
    id,
    ROW_NUMBER() OVER (PARTITION BY myclasse_id ORDER BY created_at ASC, id ASC) - 1 AS rn
  FROM "classes"
)
UPDATE "classes" c
SET "sort_order" = ranked.rn
FROM ranked
WHERE c.id = ranked.id;
