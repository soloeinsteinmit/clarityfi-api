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
    return res.status(ERROR_CODE).json({ error: parsedData.error });
  }

  const user = await createUser(parsedData.data);
  return res.status(SUCCESS_CODE).json({ user });
}

/**
 * Controller: Handles GET /api/users
 * Sends list of all users in JSON response
 */
export async function getUsersController(req: Request, res: Response) {
  const users = await getAllUsers(); // call service layer
  return res.status(SUCCESS_CODE).json(users); // send response
}

/**
 * Controller: Handles GET /api/users/:id
 * Sends user object
 */
export async function getUserByIdController(req: Request, res: Response) {
  const { id } = req.params;
  // console.log("\nparams -> ", req.params);
  const user = await getUserById(id);
  return res.status(SUCCESS_CODE).json({ user });
}

/**
 * Controller: Handles PUT /api/users/:id
 * Update user info and sends user object
 */
export async function updateUserController(req: Request, res: Response) {
  const { id } = req.params;
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
  const isDataDownloaded = await downloadAccountData(req.body);
  return res.status(SUCCESS_CODE).json({
    //TODO: chane this later on
    success: isDataDownloaded,
    message: "Account data has been downloaded successfully",
    code: "ACCOUNT_DATA_DOWNLOAD",
  });
}

/**
 * Controller: Handles DELETE /api/users/:id
 * Delete user info
 */
export async function deleteUserController(req: Request, res: Response) {
  const { id } = req.params;
  const idUserDeleted = await deleteUser(id);
  return res.status(SUCCESS_CODE).json({
    //TODO: chane this later on
    success: idUserDeleted,
    message: "Account has been deleted successfully",
    code: "ACCOUNT_DELETION",
  });
}
