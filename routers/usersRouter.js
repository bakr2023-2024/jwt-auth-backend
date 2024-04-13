const { Router } = require("express");
const {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/usersController");
const { protect } = require("../middleware/authMiddleware");
const router = Router();
router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", protect, logoutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
module.exports = router;
