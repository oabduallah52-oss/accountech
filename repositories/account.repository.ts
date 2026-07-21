import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import {
  AccountQueryInput,
  CreateAccountInput,
  UpdateAccountInput,
} from "@/types/account";

const accountInclude = {
  parent: true,
  children: true,
  journalLines: { select: { id: true } },
} satisfies Prisma.AccountInclude;

function buildSearchWhere(search: string): Prisma.AccountWhereInput[] {
  const term = search.trim();
  if (!term) {
    return [];
  }

  const normalized = term.toLowerCase();

  return [
    { code: { contains: normalized, mode: "insensitive" } },
    { name: { contains: normalized, mode: "insensitive" } },
    { arabicName: { contains: normalized, mode: "insensitive" } },
    { englishName: { contains: normalized, mode: "insensitive" } },
    { description: { contains: normalized, mode: "insensitive" } },
  ];
}

function buildAccountFilters(filters: AccountQueryInput = {}): Prisma.AccountWhereInput {
  const where: Prisma.AccountWhereInput = {};

  if (filters.accountType) {
    where.accountType = filters.accountType;
  }

  if (typeof filters.status === "boolean") {
    where.isActive = filters.status;
  }

  if (typeof filters.posting === "boolean") {
    where.allowPosting = filters.posting;
  }

  if (filters.search) {
    where.OR = buildSearchWhere(filters.search);
  }

  return where;
}

export async function getAccountsRepository(filters: AccountQueryInput = {}) {
  return prisma.account.findMany({
    where: buildAccountFilters(filters),
    include: accountInclude,
    orderBy: [{ level: "asc" }, { code: "asc" }],
  });
}

export async function getAccountTreeRepository(filters: AccountQueryInput = {}) {
  const accounts = await getAccountsRepository(filters);

  const accountMap = new Map<number, { id: number; children: typeof accounts }>();

  for (const account of accounts) {
    accountMap.set(account.id, { id: account.id, children: [] as typeof accounts });
  }

  const tree: typeof accounts = [];

  for (const account of accounts) {
    const parentId = account.parentId ?? null;
    const node = accountMap.get(account.id);

    if (!node) {
      continue;
    }

    if (parentId && accountMap.has(parentId)) {
      const parent = accountMap.get(parentId);
      if (parent) {
        parent.children.push(account);
      }
    } else {
      tree.push(account);
    }
  }

  return tree;
}

export async function getAccountByIdRepository(id: number) {
  return prisma.account.findUnique({
    where: { id },
    include: accountInclude,
  });
}

export async function createAccountRepository(data: CreateAccountInput) {
  const parent = data.parentId
    ? await prisma.account.findUnique({ where: { id: data.parentId } })
    : null;

  const level = data.level ?? parent?.level ?? 1;

  return prisma.account.create({
    data: {
      code: data.code.trim(),
      name: data.englishName.trim(),
      arabicName: data.arabicName.trim(),
      englishName: data.englishName.trim(),
      accountClass: data.accountClass,
      accountType: data.accountType,
      normalBalance: data.normalBalance,
      currency: data.currency?.trim() ?? "USD",
      parentId: data.parentId ?? null,
      level: Math.max(level, 1),
      allowPosting: data.allowPosting ?? true,
      controlAccount: data.controlAccount ?? false,
      systemAccount: data.systemAccount ?? false,
      isActive: data.isActive ?? true,
      description: data.description?.trim() ?? null,
    },
    include: accountInclude,
  });
}

export async function updateAccountRepository(id: number, data: UpdateAccountInput) {
  const currentAccount = await prisma.account.findUnique({ where: { id } });

  if (!currentAccount) {
    throw new Error("Account not found");
  }

  const parentId = data.parentId ?? currentAccount.parentId;

  if (parentId === id) {
    throw new Error("An account cannot be its own parent.");
  }

  if (parentId) {
    const parent = await prisma.account.findUnique({ where: { id: parentId } });
    if (!parent) {
      throw new Error("Parent account not found.");
    }
  }

  return prisma.account.update({
    where: { id },
    data: {
      code: data.code?.trim(),
      name: data.englishName?.trim() ?? currentAccount.name,
      arabicName: data.arabicName?.trim() ?? currentAccount.arabicName,
      englishName: data.englishName?.trim() ?? currentAccount.englishName,
      accountClass: data.accountClass,
      accountType: data.accountType,
      normalBalance: data.normalBalance,
      currency: data.currency?.trim(),
      parentId: parentId ?? null,
      level: data.level ?? currentAccount.level,
      allowPosting: data.allowPosting,
      controlAccount: data.controlAccount,
      systemAccount: data.systemAccount,
      isActive: data.isActive,
      description: data.description?.trim() ?? currentAccount.description,
    },
    include: accountInclude,
  });
}

export async function deleteAccountRepository(id: number) {
  const account = await prisma.account.findUnique({
    where: { id },
    include: {
      children: { select: { id: true } },
      journalLines: { select: { id: true } },
    },
  });

  if (!account) {
    throw new Error("Account not found");
  }

  if (account.children.length > 0) {
    throw new Error("Cannot delete an account that has child accounts.");
  }

  if (account.journalLines.length > 0) {
    throw new Error("Cannot delete an account that has journal entries linked to it.");
  }

  return prisma.account.delete({ where: { id } });
}