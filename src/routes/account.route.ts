import { Router } from "express";

import { getAccountByIdController } from "../controllers/account.controller";
import { asyncHandler } from "../utils/asyncHandler";

const accountRouter = Router();

/**
 * @route GET /api/accounts/:accountId
 * @desc Get user account by id
 */
accountRouter.get("/:accountId", asyncHandler(getAccountByIdController));

export default accountRouter;
