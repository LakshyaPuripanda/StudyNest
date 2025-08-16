import express from 'express';
import { createCheckoutSession, stripeWebhook, getCourseDetailWithPurchaseStatus, getAllPurchasedCourse } from '../controllers/coursePurchase.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

const router = express.Router();

router.route("/checkout/create-checkout-session").post(isAuthenticated, createCheckoutSession);
router.route("/webhook").post(express.raw({ type: 'application/json' }), stripeWebhook);

// TODO: Implement these routes when needed
router.route("/course/:courseId/detail-with-status").get(isAuthenticated,getCourseDetailWithPurchaseStatus);
router.route("/").get(isAuthenticated, getAllPurchasedCourse);

export default router;