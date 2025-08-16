import Stripe from 'stripe';
import {Course} from '../models/course.model.js';
import { CoursePurchase } from '../models/coursePurchase.model.js';
import { User } from '../models/user.model.js';
import { Lecture } from '../models/lecture.model.js';

// import dotenv from 'dotenv';
// dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
    try {
        console.log("Creating checkout session...");

        const userId = req.id;
        const { courseId } = req.body;
        
        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: 'Course not found' });

        // Ensure coursePrice is a valid number
        const coursePrice = Number(course.coursePrice);

        // If course is free, enroll directly and return course progress URL
        if (isNaN(coursePrice) || coursePrice <= 0) {
            // Check if already purchased
            const alreadyPurchased = await CoursePurchase.findOne({ userId, courseId });
            if (!alreadyPurchased) {
                const newPurchase = new CoursePurchase({
                    courseId,
                    userId,
                    amount: 0,
                    status: "completed",
                });
                await newPurchase.save();
                // Make all lectures visible
                if (course.lectures && course.lectures.length > 0) {
                    await Lecture.updateMany(
                        { _id: { $in: course.lectures } },
                        { $set: { isPreviewFree: true } }
                    );
                }
                // Update user's enrolledCourses
                await User.findByIdAndUpdate(userId, { $addToSet: { enrolledCourses: course._id } });
                // Update course's enrolledStudents
                await Course.findByIdAndUpdate(course._id, { $addToSet: { enrolledStudents: userId } });
            }
            return res.status(200).json({ success: true, url: `http://localhost:5173/course-progress/${courseId}` });
        }

        // create a new course purchase record
        const newPurchase = new CoursePurchase({
            courseId,
            userId,
            amount: coursePrice,
            status: "pending",
        });

        // Create a Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: course.courseTitle,
                            images: [course.courseThumbnail],
                        },
                        unit_amount: Math.round(coursePrice * 100), // Ensure integer
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `http://localhost:5173/course-progress/${courseId}`, // once payment successful redirect to course progress page
            cancel_url: `http://localhost:5173/course-detail/${courseId}`,
            metadata: {
                courseId: courseId,
                userId: userId,
            },
            shipping_address_collection: {
                allowed_countries: ['IN'], //Optionally restrict allowed countries
            },
        });

        if(!session.url) {
            return res.status(400).json({ success: false, message: 'Error while creating session' });
        }
        //Save the checkout session ID to the course purchase record
        newPurchase.paymentId = session.id;
        await newPurchase.save();

        // Return the stipe checkout session URL
        return res.status(200).json({ success: true, url: session.url });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export const stripeWebhook = async (req, res) => {
    let event;

    try {
        const payloadString = JSON.stringify(req.body, null, 2);
        const secret = process.env.WEBHOOK_ENDPOINT_SECRET;

        const header = stripe.webhooks.generateTestHeaderString({
            payload: payloadString,
            secret,
        });
        event = stripe.webhooks.constructEvent(payloadString, header, secret);

    } catch (error) {
        console.error('Error constructing webhook event:', error.message);
        return res.status(400).send(`Webhook Error: ${error.message}`);

    }

    //Handle the checkout session completed event
    if (event.type === "checkout.session.completed"){
        try {
            const session = event.data.object;

            const purchase = await CoursePurchase.findOne({
                paymentId: session.id,
            }).populate({path:"courseId"});

            if(!purchase){
                return res.status(404).json({message:"Purchase not found"});
            }
            if(session.amount_total){
                purchase.amount = session.amount_total / 100;
            }
            purchase.status = "completed";
            
            //Make all lectures visible by setting `isPreviewFree` to true
            if(purchase.courseId && purchase.courseId.lectures.length > 0) {
                await Lecture.updateMany(
                    { _id: { $in: purchase.courseId.lectures } },
                    { $set: { isPreviewFree: true } }
                );
            }
            //Make sure to save the updated purchase record
            await purchase.save();
            // await purchase.courseId.save();
            //Update the user's enrolledCourses
            await User.findByIdAndUpdate(purchase.userId, 
                {$addToSet: { enrolledCourses: purchase.courseId._id }},// Add course ID to user's enrolled courses
                { new: true }
            );

            //Update course to add user ID to enrolledStudents
            await Course.findByIdAndUpdate(purchase.courseId._id, 
                {$addToSet: { enrolledStudents: purchase.userId }},// Add user ID to course's enrolled students
                { new: true }
            );
        } catch (error) {
            console.error('Error Handling webhook event:', error);
            return res.status(500).send('Webhook Internal Server Error');
        }
    }
    res.status(200).send('Webhook event handled successfully');
};


export const getCourseDetailWithPurchaseStatus = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    // 1. Find the course and populate creator and lectures for frontend display
    const course = await Course.findById(courseId)
      .populate({ path: "creator" })
      .populate({ path: "lectures" });

    // 2. If course not found, return 404
    if (!course) {
      return res.status(404).json({ message: "course not found!" });
    }

    // 3. Check if the current user has purchased this course
    const purchased = await CoursePurchase.findOne({ userId, courseId });

    // 4. Return course details and purchase status (as boolean)
    return res.status(200).json({
      course,
      purchased: !!purchased, // true if purchased, false otherwise
    });
  } catch (error) {
    console.log(error);
    // Optionally, return a 500 error here
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const getAllPurchasedCourse = async (_, res) => {
  try {
    const purchasedCourse = await CoursePurchase.find({
      status: "completed",
    }).populate("courseId");
    if (!purchasedCourse) {
      return res.status(404).json({
        purchasedCourse: [],
      });
    }
    return res.status(200).json({
      purchasedCourse,
    });
  } catch (error) {
    console.log(error);
  }
};