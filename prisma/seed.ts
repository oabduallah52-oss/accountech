import { AccountClass } from "@prisma/client";
import { prisma } from "@/lib/prisma";

async function main() {
  await prisma.journalLine.deleteMany();
  await prisma.journalEntry.deleteMany();
  await prisma.account.deleteMany();
  await prisma.companyProfile.deleteMany();
  await prisma.branch.deleteMany();
  await prisma.currency.deleteMany();
  await prisma.numberSeries.deleteMany();

  await prisma.companyProfile.create({
    data: {
      id: 1,
      name: "Sky Vision",
      legalName: "Sky Vision Aviation",
      country: "United States",
      baseCurrency: "USD",
      fiscalYearStartMonth: 1,
    },
  });

  await prisma.branch.createMany({
    data: [
      { code: "HQ", name: "Head Office", city: "New York", airportCode: "JFK" },
      { code: "OPS", name: "Flight Operations", city: "Atlanta", airportCode: "ATL" },
    ],
  });

  await prisma.currency.createMany({
    data: [
      { code: "USD", name: "US Dollar", symbol: "$", isBase: true },
      { code: "EUR", name: "Euro", symbol: "€" },
      { code: "GBP", name: "British Pound", symbol: "£" },
    ],
  });

  await prisma.numberSeries.createMany({
    data: [
      { module: "Journal Entries", prefix: "JE", nextNumber: 1, padding: 6 },
      { module: "Documents", prefix: "DOC", nextNumber: 1, padding: 6 },
    ],
  });

  const accounts: Array<{
    code: string;
    name: string;
    class: (typeof AccountClass)[keyof typeof AccountClass];
    type: string;
    balance: string;
    level: number;
    parent: string | null;
    posting: boolean;
  }> = [
    { code: "1000", name: "Assets", class: AccountClass.ASSETS, type: "ASSET", balance: "DEBIT", level: 1, parent: null, posting: false },
    { code: "1100", name: "Cash", class: AccountClass.ASSETS, type: "ASSET", balance: "DEBIT", level: 2, parent: "1000", posting: true },
    { code: "1200", name: "Bank", class: AccountClass.ASSETS, type: "ASSET", balance: "DEBIT", level: 2, parent: "1000", posting: true },
    { code: "1300", name: "Accounts Receivable", class: AccountClass.ASSETS, type: "ASSET", balance: "DEBIT", level: 2, parent: "1000", posting: true },
    { code: "1400", name: "Aircraft Spare Parts Inventory", class: AccountClass.ASSETS, type: "ASSET", balance: "DEBIT", level: 2, parent: "1000", posting: true },
    { code: "1500", name: "Aircraft Assets", class: AccountClass.ASSETS, type: "ASSET", balance: "DEBIT", level: 2, parent: "1000", posting: true },
    { code: "2000", name: "Liabilities", class: AccountClass.LIABILITIES, type: "LIABILITY", balance: "CREDIT", level: 1, parent: null, posting: false },
    { code: "2100", name: "Accounts Payable", class: AccountClass.LIABILITIES, type: "LIABILITY", balance: "CREDIT", level: 2, parent: "2000", posting: true },
    { code: "2200", name: "Loans", class: AccountClass.LIABILITIES, type: "LIABILITY", balance: "CREDIT", level: 2, parent: "2000", posting: true },
    { code: "2300", name: "Aircraft Lease Liability", class: AccountClass.LIABILITIES, type: "LIABILITY", balance: "CREDIT", level: 2, parent: "2000", posting: true },
    { code: "3000", name: "Equity", class: AccountClass.EQUITY, type: "EQUITY", balance: "CREDIT", level: 1, parent: null, posting: false },
    { code: "3100", name: "Capital", class: AccountClass.EQUITY, type: "EQUITY", balance: "CREDIT", level: 2, parent: "3000", posting: true },
    { code: "3200", name: "Retained Earnings", class: AccountClass.EQUITY, type: "EQUITY", balance: "CREDIT", level: 2, parent: "3000", posting: true },
    { code: "4000", name: "Revenue", class: AccountClass.REVENUE, type: "REVENUE", balance: "CREDIT", level: 1, parent: null, posting: false },
    { code: "4100", name: "Passenger Flight Revenue", class: AccountClass.REVENUE, type: "REVENUE", balance: "CREDIT", level: 2, parent: "4000", posting: true },
    { code: "4200", name: "Cargo Revenue", class: AccountClass.REVENUE, type: "REVENUE", balance: "CREDIT", level: 2, parent: "4000", posting: true },
    { code: "4300", name: "Charter Revenue", class: AccountClass.REVENUE, type: "REVENUE", balance: "CREDIT", level: 2, parent: "4000", posting: true },
    { code: "5000", name: "Expenses", class: AccountClass.EXPENSES, type: "EXPENSE", balance: "DEBIT", level: 1, parent: null, posting: false },
    { code: "5100", name: "Fuel Expense", class: AccountClass.EXPENSES, type: "EXPENSE", balance: "DEBIT", level: 2, parent: "5000", posting: true },
    { code: "5200", name: "Aircraft Maintenance Expense", class: AccountClass.EXPENSES, type: "EXPENSE", balance: "DEBIT", level: 2, parent: "5000", posting: true },
    { code: "5300", name: "Engine Lease Expense", class: AccountClass.EXPENSES, type: "EXPENSE", balance: "DEBIT", level: 2, parent: "5000", posting: true },
    { code: "5400", name: "Airport Charges", class: AccountClass.EXPENSES, type: "EXPENSE", balance: "DEBIT", level: 2, parent: "5000", posting: true },
    { code: "5500", name: "Salaries Expense", class: AccountClass.EXPENSES, type: "EXPENSE", balance: "DEBIT", level: 2, parent: "5000", posting: true },
  ];

  for (const acc of accounts) {
    const parent = acc.parent ? await prisma.account.findUnique({ where: { code: acc.parent } }) : null;
    await prisma.account.create({
      data: {
        code: acc.code,
        name: acc.name,
        arabicName: "",
        englishName: acc.name,
        accountClass: acc.class,
        accountType: acc.type,
        normalBalance: acc.balance,
        currency: "USD",
        parentId: parent?.id ?? null,
        allowPosting: acc.posting,
        controlAccount: false,
        systemAccount: true,
        isSystem: true,
        isActive: true,
        level: acc.level,
        description: `${acc.name} seed account`,
      },
    });
  }

  console.log("Single-company aviation accounting seed completed successfully");
}

main().catch((error) => { console.error(error); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });
