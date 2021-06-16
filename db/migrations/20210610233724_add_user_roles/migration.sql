-- AlterTable
ALTER TABLE "Invitation" ALTER COLUMN "status" SET DEFAULT E'NO_RESPONSE';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT E'DEFAULT';
