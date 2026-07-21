import { prisma } from "./prisma";

export async function getUser(email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      role: true,
    },
  });
}