-- CreateTable
CREATE TABLE "Spam" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "phone_number" TEXT NOT NULL,
    "spamId" INTEGER NOT NULL,

    CONSTRAINT "Spam_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Spam" ADD CONSTRAINT "Spam_spamId_fkey" FOREIGN KEY ("spamId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
