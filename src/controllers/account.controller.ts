import { Request, Response } from "express";
import { ERROR_CODE, SUCCESS_CODE } from "../utils/constants";
import {
  accountSchema,
  createAccount,
  getAccountById,
  getAllUserAccounts,
} from "../services/account.service";

/**
 * Controller: Handle POST /api/users/:userId/accounts
 * Send account info in JSON respose
 */
export async function createUserAccountController(req: Request, res: Response) {
  const parsedData = accountSchema.safeParse(req.body);

  if (!parsedData.success) {
    return res.status(ERROR_CODE).json({
      success: false,
      message: parsedData.error,
      data: {},
    });
  }

  const { userId } = req.params;

  if (!userId) {
    return res.status(ERROR_CODE).json({
      success: false,
      message: "User ID is required",
      data: null,
    });
  }
  const account = await createAccount(userId, parsedData.data);
  return res.status(SUCCESS_CODE).json(account);
}

/**
 * Controller: Handles GET /api/users/:userId/accounts
 * Sends list of all user account in JSON response
 */
export async function getAllUserAccountController(req: Request, res: Response) {
  const { userId } = req.params;
  if (!userId) {
    return res.status(ERROR_CODE).json({
      success: false,
      message: "User ID is required",
      data: null,
    });
  }
  const accounts = await getAllUserAccounts(userId);
  return res.status(SUCCESS_CODE).json(accounts);
}

/**
 * Controller: Handles GET /api/accounts/:accountId
 * Sends account + user + transaction info in JSON response
 */
export async function getAccountByIdController(req: Request, res: Response) {
  const { accountId } = req.params;
  if (!accountId) {
    return res.status(ERROR_CODE).json({
      success: false,
      message: "Account ID is required",
      data: null,
    });
  }
  const account = await getAccountById(accountId);
  return res.status(SUCCESS_CODE).json(account);
}
