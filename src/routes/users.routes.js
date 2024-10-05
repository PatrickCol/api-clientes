import { Router } from "express";
import {
  rootEndpoint,
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getSubscriptions,
  getSubscriptionById,
  createSubscription,
  updateSubscription,
  deleteSubscription,
} from "../controllers/users.controllers.js";

const router = Router();

router.get("/",rootEndpoint);

router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

router.get("/subscriptions", getSubscriptions);
router.get("/subscriptions/:id", getSubscriptionById);
router.post("/subscriptions", createSubscription);
router.put("/subscriptions/:id", updateSubscription);
router.delete("/subscriptions/:id", deleteSubscription);

export default router;
