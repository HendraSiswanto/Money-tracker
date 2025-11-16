import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const t = await prisma.transaction.create({
    data: {
      type: "income",
      amount: 50000,
      category: "Salary",
      note: "Test data",
    },
  });
  console.log("Created:", t);

  const transactions = await prisma.transaction.findMany()
  console.log(transactions);
}

main()
  .catch((err) => {
    console.error(err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
