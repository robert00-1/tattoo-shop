-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "cryptoCurrency" TEXT,
ADD COLUMN     "cryptoNetwork" TEXT,
ADD COLUMN     "walletAddress" TEXT;
