export const createCourse = async (req, res) => {
    try {
        const { courseTitle,  category } = req.body;
        if (!title || !category) {
            return res.status(400).json({
                success: false,
                message: "Course title and category are required."
            });
        }

        const course = await Course.create({
            courseTitle,
            // description,
            category,
            // thumbnail,
            creator: req.id // Assuming req.id is the user ID
        });

        return res.status(201).json({
            course,
            success: true,
            message: "Course created successfully."
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to create course"
        });
    }
}