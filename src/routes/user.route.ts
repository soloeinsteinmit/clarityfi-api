import { Router } from "express";
import {
  getUsersController,
  createUserController,
  getUserByIdController,
  deleteUserController,
  downloadAccountDataController,
  updateUserController,
} from "../controllers/user.controller";
import { asyncHandler } from "../utils/asyncHandler";

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
userRouter.get("/", asyncHandler(getUsersController));

/**
 * @route GET /api/users/:id
 * @desc Get user by id
 */
userRouter.get("/:id", asyncHandler(getUserByIdController));

/**
 * @route PUT /api/users/:id
 * @desc Update user by id
 */
userRouter.put("/:id", asyncHandler(updateUserController));

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

export default userRouter;
