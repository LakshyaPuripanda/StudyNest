import Stripe from 'stripe';
import {Course} from '../models/course.model.js';
import { CoursePurchase } from '../models/coursePurchase.model.js';
import { User } from '../models/user.model.js';
import { Lecture } from '../models/lecture.model.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
    try {
        const userId = req.id;
        const { courseId } = req.body;
        
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        // create a new course purchase record
        const newPurchase = await CoursePurchase.create({
            courseId,
            userId,
            amount: course.coursePrice,
            status:"pending",

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
                        unit_amount: course.coursePrice * 100, // Convert to smallest currency unit
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/course-progress/${courseId}`,
            cancel_url: `${process.env.FRONTEND_URL}/course-detail/${courseId}`,
            metadata: {
                courseId,
                userId,
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

export const webhook = async (req, res) => {
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