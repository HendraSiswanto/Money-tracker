import { prisma } from "../utils/prisma";
import { CategoryType } from "@prisma/client";

export const CategoryService = {
  getAll: (userId: string) => {
    return prisma.category.findMany({
      where: { userId },
    });
  },

   seedDefaults: (userId: string, categories: any[]) => {
  return prisma.category.createMany({
    data: categories.map(c => ({
      name: c.name,
      emote: c.emote,
      color: c.color,
      type: c.type,
      userId,
    })),
  });
},
  
  create: (data: {
    userId: string;
    name: string;
    emote: string;
    type: CategoryType;
    color?: string | null;
  }) => {
    return prisma.category.create({
      data: {
        userId: data.userId,
        name: data.name,
        emote: data.emote,
        type: data.type,              
        color: data.color ?? "",      
      },
    });
  },

  update: (id: number, data: any) => {
    return prisma.category.update({
      where: { id },
      data,
    });
  },

  delete: (id: number) => {
    return prisma.category.delete({
      where: { id },
    });
  }
};
