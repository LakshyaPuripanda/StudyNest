import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    courseTitle: {
        type: String,
        required: true
    },
    subTitle: {
        type: String,
    },
    description: {
        type: String,
    },
    category: {
        type: String,
        required: true
    },
    courseLevel: {
        type: String,
        enum: ["Beginner", "Medium", "Advance"],
        default: "Beginner"
     },
    coursePrice: {
        type: Number,
    },
    courseThumbnail: {
        type: String,
        
    },
    enrolledStudents: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    lectures: [
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Lecture'  
        }
    ],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    },
    isPublished: {
        type: Boolean,
        default: false
    }

    // courseImage: {
    //     type: String,
    //     default: ""
    // },
    // courseVideo: {
    //     type: String,
    //     default: ""
    // },
    // courseContent: {
    //     type: String,
    //     default: ""
    // },
    // courseDuration: {
    //     type: String,
    //     default: "0"
    // },
    // courseRating: {
    //     type: Number,
    //     default: 0
    // },
}, { timestamps: true });

export const Course = mongoose.model("Course", courseSchema);
export default Course;
