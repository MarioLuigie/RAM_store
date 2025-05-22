/*
  Warnings:

  - Added the required column `oldRole` to the `RoleChangeLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RoleChangeLog" ADD COLUMN     "oldRole" TEXT NOT NULL;
