import prisma from "../prisma/client";
import { z } from "zod";
import bcrypt from "bcryptjs";

export const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type CreateUserSchema = z.infer<typeof userSchema>;

/**
 * @param data - Create a user in the database
 * @returns newly created user object (without password)
 */
export async function createUser(data: CreateUserSchema) {
  // hash the password before saving
  const hashedPassword = await bcrypt.hash(data.password, 10);

  // checking if user email exist
  const emailExist = await checkEmail(data.email);
  if (emailExist) return { message: "Email already exist" };

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      isVerified: false,
      isDeleted: false,
    },
    select: {
      id: true,
      name: true,
      email: true,
      isVerified: true,
      createdAt: true,
      updatedAt: true,
      isDeleted: true,
    },
  });

  return user;
}

/**
 * Fetch all users from the database.
 * @returns A list of users.
 */
export async function getAllUsers() {
  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      isVerified: true,
      createdAt: true,
      updatedAt: true,
      isDeleted: true,
    },
  });
}

/**
 * Get user by ID
 * @returns User object
 */
export async function getUserById(userId: string) {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      isVerified: true,
      createdAt: true,
      updatedAt: true,
      isDeleted: true,
    },
  });
}

// Partial schema for optional updates
const updateUserSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.email().optional(),
  password: z.string().min(6).optional(), // hash if passed
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;
/**
 * Update a user by ID with dynamic fields
 * @param userId - the user's ID
 * @param data - partial user data to update
 * @returns updated user object (without password)
 */
export async function updateUserById(userId: string, data: UpdateUserInput) {
  const parsed = updateUserSchema.safeParse(data);
  if (!parsed.success) {
    return new Error(JSON.stringify(parsed.error.format()));
  }

  const updateData = { ...parsed.data };

  // if password is provided
  if (updateData.password) {
    updateData.password = await bcrypt.hash(updateData.password, 10);
  }

  // check if user is updating email and check if the new email exist
  if (updateData.email) {
    const emailExist = await checkEmail(updateData.email);
    if (emailExist) return { message: "Email already exist" };
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: updateData,
    select: {
      id: true,
      name: true,
      email: true,
      isVerified: true,
      createdAt: true,
      updatedAt: true,
      isDeleted: true,
    },
  });

  return updatedUser;
}

/**
 * Delete user
 * @param userId - the user's ID
 * @returns true for account deleted
 */
export async function deleteUser(userId: string) {
  // TODO: LOGIC FOR BACKING UP USERS AFTER DELETE DATA
  await prisma.user.delete({
    where: {
      id: userId,
    },
  });

  // TODO: RETURN THIS FOR NOW
  return true;
}

/**
 * Download accound data to excel/csv
 * @param userId - the user's ID
 * @returns true for data downloaded
 */
export async function downloadAccountData(userId: string) {
  // TODO: LOGIC FOR DOWNLOADING

  return true;
  // TODO: RETURN THIS FOR NOW
  // return {
  //   success: true,
  //   message: "Account has been deleted successfully",
  //   code: "ACCOUNT_DELETION",
  // };
}

/**
 * Checks if an input user email exist
 * @param email - email to check
 * @returns true if email exist false otherwise
 */
async function checkEmail(email: string) {
  // checking if user already exist in db
  const dbEmail = await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      email: true,
    },
  });

  if (email == dbEmail?.email) return true;

  return false;
}
