import express from "express";
const router = express.Router();

// Simple test route
router.get("/test", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "API Router Working!"
  });
});

export default router;
