import { Router } from "express";
import {
  getAllUsersController,
  createUserController,
  getUserByIdController,
  deleteUserController,
  downloadAccountDataController,
  updateUserController,
} from "../controllers/user.controller";
import { asyncHandler } from "../utils/asyncHandler";
import {
  createUserAccountController,
  getAllUserAccountController,
} from "../controllers/account.controller";

const userRouter = Router();

/**
 * @route POST /api/users
 * @desc Create new user
 */
userRouter.post("/", asyncHandler(createUserController));

/**
 * @route GET /api/users
 * @desc Returns all users
 */
userRouter.get("/", asyncHandler(getAllUsersController));

/**
 * @route GET /api/users/:id
 * @desc Get user by id
 */
userRouter.get("/:id", asyncHandler(getUserByIdController));

/**
 * @route PATCH /api/users/:id
 * @desc Update user by id
 */
userRouter.patch("/:id", asyncHandler(updateUserController));

/**
 * @route GET /api/users/:id/download
 * @desc Download user account data by id
 */
userRouter.get("/:id/download", asyncHandler(downloadAccountDataController));

/**
 * @route DELETE /api/users/:id
 * @desc Delete user by id
 */
userRouter.delete("/:id", asyncHandler(deleteUserController));

// =================================================
// Accounts related
// =================================================
/**
 * @route POST /api/users/:userId/accounts
 * @desc Create new user
 */
userRouter.post("/:userId/accounts", asyncHandler(createUserAccountController));

/**
 * @route GET /api/users/:userId/accounts
 * @desc Returns all users
 */
userRouter.get("/:userId/accounts", asyncHandler(getAllUserAccountController));

export default userRouter;
