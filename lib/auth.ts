import { prisma } from "./prisma";

export async function getUser(username: string) {
  return prisma.user.findUnique({
    where: {
      username,
    },
    include: {
      role: true,
    },
  });
}