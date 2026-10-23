-- CreateTable
CREATE TABLE "LeedCredit" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LeedCredit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MaterialAttribute" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MaterialAttribute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MaterialAttributeMap" (
    "id" TEXT NOT NULL,
    "materialId" TEXT NOT NULL,
    "attributeId" TEXT NOT NULL,

    CONSTRAINT "MaterialAttributeMap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeedAttributeMap" (
    "id" TEXT NOT NULL,
    "attributeId" TEXT NOT NULL,
    "leedCreditId" TEXT NOT NULL,

    CONSTRAINT "LeedAttributeMap_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MaterialAttributeMap_materialId_attributeId_key" ON "MaterialAttributeMap"("materialId", "attributeId");

-- CreateIndex
CREATE UNIQUE INDEX "LeedAttributeMap_attributeId_leedCreditId_key" ON "LeedAttributeMap"("attributeId", "leedCreditId");

-- AddForeignKey
ALTER TABLE "MaterialAttributeMap" ADD CONSTRAINT "MaterialAttributeMap_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "Material"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaterialAttributeMap" ADD CONSTRAINT "MaterialAttributeMap_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES "MaterialAttribute"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeedAttributeMap" ADD CONSTRAINT "LeedAttributeMap_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES "MaterialAttribute"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeedAttributeMap" ADD CONSTRAINT "LeedAttributeMap_leedCreditId_fkey" FOREIGN KEY ("leedCreditId") REFERENCES "LeedCredit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
