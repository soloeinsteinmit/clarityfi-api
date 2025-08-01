import { Request, Response } from "express";
import {
  getAllUsers,
  userSchema,
  createUser,
  getUserById,
  updateUserById,
  deleteUser,
  downloadAccountData,
} from "../services/user.service";
import { ERROR_CODE, SUCCESS_CODE } from "../utils/constants";

/**
 * Controller: Handle POST /api/users
 * Send user info in JSON respose
 */
export async function createUserController(req: Request, res: Response) {
  // safe validate with schema
  const parsedData = userSchema.safeParse(req.body);

  if (!parsedData.success) {
    return res.status(ERROR_CODE).json({
      success: false,
      message: parsedData.error,
      data: {},
    });
  }

  const user = await createUser(parsedData.data);
  return res.status(SUCCESS_CODE).json(user);
}

/**
 * Controller: Handles GET /api/users
 * Sends list of all users in JSON response
 */
export async function getAllUsersController(req: Request, res: Response) {
  const users = await getAllUsers();
  return res.status(SUCCESS_CODE).json(users);
}

/**
 * Controller: Handles GET /api/users/:id
 * Sends user object
 */
export async function getUserByIdController(req: Request, res: Response) {
  const { id } = req.params;
  if (!id) {
    return res.status(ERROR_CODE).json({
      success: false,
      message: "User ID is required",
      data: null,
    });
  }
  const user = await getUserById(id);
  return res.status(SUCCESS_CODE).json(user);
}

/**
 * Controller: Handles PUT /api/users/:id
 * Update user info and sends user object
 */
export async function updateUserController(req: Request, res: Response) {
  const { id } = req.params;
  if (!id) {
    return res.status(ERROR_CODE).json({
      success: false,
      message: "User ID is required",
      data: null,
    });
  }
  const updateUser = await updateUserById(id, req.body);
  return res.status(SUCCESS_CODE).json(updateUser);
}

/**
 * Controller: Handles DELETE /api/users/:id
 * Delete user info
 */
export async function downloadAccountDataController(
  req: Request,
  res: Response
) {
  const dowloadedData = await downloadAccountData(req.body);
  return res.status(SUCCESS_CODE).json(dowloadedData);
}

/**
 * Controller: Handles DELETE /api/users/:id
 * Delete user info
 */
export async function deleteUserController(req: Request, res: Response) {
  const { id } = req.params;
  if (!id) {
    return res.status(ERROR_CODE).json({
      success: false,
      message: "User ID is required",
      data: null,
    });
  }
  const deletedUser = await deleteUser(id);
  return res.status(SUCCESS_CODE).json(deletedUser);
}
