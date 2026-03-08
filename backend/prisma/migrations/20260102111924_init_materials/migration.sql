-- CreateTable
CREATE TABLE "Material" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Material_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpecSheet" (
    "id" TEXT NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "application" TEXT NOT NULL,
    "composition" TEXT NOT NULL,
    "voc" TEXT NOT NULL,
    "recycledContent" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "materialId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SpecSheet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SpecSheet_materialId_key" ON "SpecSheet"("materialId");

-- AddForeignKey
ALTER TABLE "SpecSheet" ADD CONSTRAINT "SpecSheet_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "Material"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
