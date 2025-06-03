import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  acceptFriendRequest,
  getFriendRequests,
  getMyFriends,
  getOutGoingFriendRequests,
  getRecommendedUsers,
  sendFriendRequest,
} from "../controllers/user.controller.js";

const userRoutes = express.Router();

userRoutes.get("/", protectRoute, getRecommendedUsers);
userRoutes.get("/friends", protectRoute, getMyFriends);

userRoutes.post("/friend-request/:id", protectRoute, sendFriendRequest);
userRoutes.put("/friend-request/:id/accept", protectRoute, acceptFriendRequest);

userRoutes.get("/friend-requests", protectRoute, getFriendRequests);
userRoutes.get("/outgoing-friend-requests", protectRoute, getOutGoingFriendRequests);

export default userRoutes;
