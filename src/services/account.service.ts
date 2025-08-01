import prisma from "../prisma/client";
import { success, z } from "zod";
import { AccountType } from "../../generated/prisma";

export const accountSchema = z.object({
  name: z.string(),
  accountType: z.enum(AccountType),
});

type AccountSchema = z.infer<typeof accountSchema>;

/**
 * @param data - Create a account in the database
 * @returns newly created account object
 */
export async function createAccount(userId: string, data: AccountSchema) {
  const dbAccName = await prisma.account.findUnique({
    where: {
      name: data.name,
    },
    select: {
      name: true,
    },
  });

  if (dbAccName?.name === data.name) {
    return {
      success: false,
      message: "Account name already exist. Kinldy use a new name",
      data: null,
    };
  }

  const account = await prisma.account.create({
    data: {
      userId: userId,
      name: data.name,
      type: data.accountType,
      isActive: true,
      isDeleted: false,
    },
    select: {
      id: true,
      userId: true,
      name: true,
      type: true,
      currency: true,
      current_balance: true,
      isActive: true,
      isDeleted: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!account) {
    return {
      success: false,
      message: "Account creation failed, try again",
      data: null,
    };
  }

  return {
    success: true,
    message: "Account created",
    data: account,
  };
}

/**
 * Fetch all user account from the database.
 * @returns A list of accounts.
 */
export async function getAllUserAccounts(userId: string) {
  const allAccounts = await prisma.account.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      userId: true,
      name: true,
      type: true,
      currency: true,
      current_balance: true,
      isActive: true,
      isDeleted: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!allAccounts) {
    return {
      success: false,
      message: "Account is empty",
      data: null,
    };
  }

  return {
    success: true,
    message: "All accounts",
    data: allAccounts,
  };
}

/**
 * Get specific account.
 * @returns An accounts object
 */
export async function getAccountById(accountId: string) {
  const account = await prisma.account.findUnique({
    where: {
      id: accountId,
    },
    include: {
      user: {
        select: {
          //   id: true,
          name: true,
          email: true,
        },
      },
      transactions: true,
    },
  });

  if (!account) {
    return {
      success: false,
      message: "Account not found",
      data: null,
    };
  }

  return {
    success: true,
    message: "Account info",
    data: account,
  };
}
