import { PrismaClient, CategoryType } from "@prisma/client";


const prisma = new PrismaClient();

 const defaultCategories = [
  { name: "Salary", emote: "💼", color: "#1C4532", type: CategoryType.income },
  { name: "Bonus", emote: "💰", color: "#1C4532", type: CategoryType.income },
  { name: "Freelance", emote: "👨‍💻", color: "#1C4532", type: CategoryType.income },
  { name: "Investment", emote: "📈", color: "#1C4532", type: CategoryType.income },
  { name: "Gift", emote: "🎁", color: "#1C4532", type: CategoryType.income },

  { name: "Food", emote: "🍔", color: "#45241cff", type: CategoryType.expense },
  { name: "Transport", emote: "🚌", color: "#45241cff", type: CategoryType.expense },
  { name: "Shopping", emote: "🛍️", color: "#45241cff", type: CategoryType.expense },
];

async function main() {
  const users = await prisma.user.findMany();

  for (const user of users) {
    const count = await prisma.category.count({
      where: { userId: user.id },
    });

    if (count === 0) {
      await prisma.category.createMany({
        data: defaultCategories.map((c) => ({
          ...c,
          userId: user.id,
        })),
      });
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
