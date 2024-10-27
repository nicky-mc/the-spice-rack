-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "email_address" TEXT,
    "first_name" TEXT,
    "last_name" TEXT,
    "image_url" TEXT,
    "banner_url" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_banner_url_key" ON "User"("banner_url");
