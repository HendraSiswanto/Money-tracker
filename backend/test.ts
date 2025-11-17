import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  

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
