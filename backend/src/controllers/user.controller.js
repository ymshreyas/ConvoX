import FriendRequest from "../models/FriendRequest.js";
import User from "../models/user.js";

export const getRecommendedUsers = async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const currentuser = req.user;

    const recommendedUsers = await User.find({
      $and: [
        { _id: { $ne: currentUserId } }, //exclude current user
        { _id: { $nin: currentuser.friends } }, //exclude current user's friends
        { isOnboarded: true }, //only include users who are onboarded
      ],
    });

    res.status(200).json(recommendedUsers);
  } catch (error) {
    console.error("Error in getRecommendedUsers controller:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};

export const getMyFriends = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("friends")
      .populate(
        "friends",
        "fullName profilePic nativeLanguage learningLanguage"
      );
    res.status(200).json(user.friends);
  } catch (error) {
    console.error("Error in getMyFriends controller:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};

export const sendFriendRequest = async (req, res) => {
  try {
    const { id: recipientId } = req.params;
    const myId = req.user.id;

    if (myId === recipientId) {
      return res.status(400).json({
        message: "You cannot send a friend request to yourself.",
      });
    }

    // Check if the recipient exists
    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    //check if the user is already a friend
    if (recipient.friends.includes(myId)) {
      return res.status(400).json({
        message: "You are already friends with this user.",
      });
    }

    // Check if a friend request already exists
    const existingRequest = await FriendRequest.findOne({
      $or: [
        { sender: myId, recipient: recipientId },
        { sender: recipientId, recipient: myId },
      ],
    });
    if (existingRequest) {
      return res.status(400).json({
        message: "Friend request already sent or received.",
      });
    }

    // Create a new friend request
    const newRequest = await FriendRequest.create({
      sender: myId,
      recipient: recipientId,
    });

    res.status(201).json(newRequest);
  } catch (error) {
    console.error("Error in sendFriendRequest controller:", error.message);
    res.status(500).json({
      message: "Internal Server error",
    });
  }
};

export const acceptFriendRequest = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the friend request
    const friendRequest = await FriendRequest.findById(id);
    if (!friendRequest) {
      return res.status(404).json({
        message: "Friend request not found.",
      });
    }

    // Check if the logged-in user is the recipient of the request
    if (friendRequest.recipient.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not authorized to accept this friend request.",
      });
    }

    friendRequest.status = "accepted";
    await friendRequest.save();

    // Add each user to the other's friends list
    // $addToSet ensures that the user is added only if they are not already in the array [Prevent duplicates]

    await User.findByIdAndUpdate(friendRequest.sender, {
      $addToSet: { friends: friendRequest.recipient },
    });
    await User.findByIdAndUpdate(friendRequest.recipient, {
      $addToSet: { friends: friendRequest.sender },
    });

    res.status(200).json({
      message: "Friend request accepted successfully.",
    });
  } catch (error) {
    console.error("Error in acceptFriendRequest controller:", error.message);
    res.status(500).json({
      message: "Internal Server error",
    });
  }
};

export const getFriendRequests = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find all friend requests where the user is the recipie nt
    const incomingRequests = await FriendRequest.find({
      recipient: userId,
      status: "pending",
    }).populate(
      "sender",
      "fullName profilePic nativeLanguage learningLanguage"
    );

    const acceptedRequests = await FriendRequest.find({
      sender: userId,
      status: "accepted",
    }).populate("recipient", "fullName profilePic");

    res.status(200).json({ incomingRequests, acceptedRequests });
  } catch (error) {
    console.error("Error in getFriendRequests controller:", error.message);
    res.status(500).json({
      message: "Internal Server error",
    });
  }
};

export const getOutGoingFriendRequests = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find all friend requests where the user is the sender
    const outgoingRequests = await FriendRequest.find({
      sender: userId,
      status: "pending",
    }).populate(
      "recipient",
      "fullName profilePic nativeLanguage learningLanguage"
    );

    res.status(200).json(outgoingRequests);
  } catch (error) {
    console.error(
      "Error in getOutGoingFriendRequests controller:",
      error.message
    );
    res.status(500).json({
      message: "Internal Server error",
    });
  }
};
