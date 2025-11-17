import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const t = await prisma.transaction.create({
    data: {
      type: "income",
      amount: 50000,
      z
      note: "Test data",
    },
  });
  console.log("Created:", t);

  const e = await prisma.transaction.create({
    data: {
      type: "expense",
      amount: 20000,
      category: "Salary",
      note: "Test data",
    },
  });
  console.log(e);

  const transactions = await prisma.transaction.findMany();
  console.log(transactions);
}

main()
  .catch((err) => {
    console.error(err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
