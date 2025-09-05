import BuyCourseButton from "@/components/BuyCourseButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
import React from "react";
import ReactPlayer from "react-player";
import { useParams, useNavigate } from 'react-router-dom';
import { useGetCourseDetailWithStatusQuery } from "@/features/api/purchaseApi";

const CourseDetail = () => {
    const params = useParams();
    const courseId = params.courseId;
    const navigate = useNavigate();

    const { data, isLoading, isError } =
        useGetCourseDetailWithStatusQuery(courseId);

    console.log("Full API Response:", data);

    if (isLoading) return <h1>Loading...</h1>;
    if (isError) return <h>Failed to load course details</h>;

    const { course, purchased } = data;

    console.log(course);

    const handleContinueCourse = () => {
        if (purchased) {
            navigate(`/course-progress/${courseId}`)
        }
    }

    return (
        <div>
            <div className="bg-[#2D2F31] text-white">
                <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
                    <h1 className="font-bold text-2xl md:3xl">{course?.courseTitle}</h1>
                    <p className="text-base md:text-lg">{course?.subTitle}</p>
                    <p>Created By{" "}
                        <span className="text-[#C0C4FC] underline italic">
                            {course?.creator?.name || "Unknown"}
                        </span>
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                        <BadgeInfo size={16} />
                        <p>Created Date {course?.createdAt.split('T')[0]}</p>
                    </div>
                    <p>Student enrolled: {course?.enrolledStudents?.length || 0}</p>
                </div>
            </div>
            <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col gap-4 lg:flex-row justify-between gap-10">
                <div className="w-full lg:w-1/2 space-y-5">
                    <h1 className="font-bold text-2xl md:text-3xl">Course Description</h1>
                    <p className="text-base md:text-sm" dangerouslySetInnerHTML={{ __html: course.description }} />
                    <Card className="bg-[#2d2f56] text-white">
                        <CardHeader >
                            <CardTitle className="text-lg font-semibold">What you'll learn</CardTitle>
                            <CardDescription>{course?.lectures?.length || 0} lecture{course?.lectures?.length === 1 ? "" : "s"}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {course?.lectures?.map((lecture, idx) => (
                                <div key={lecture._id || idx} className="flex items-center gap-3 text-sm ">
                                    <span className="text-sm text-gray-700">
                                        {lecture.isPreviewFree ? <PlayCircle size={14} color="white" /> : <Lock size={14} />}
                                    </span>
                                    <p>{lecture.title || "Lecture"}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
                <div className="w-full lg:w-1/3">
                    <Card className="bg-[#2d2f56] text-white">
                        <CardContent className="p-4 flex flex-col">
                            <div className="w-full aspect-video mb-4">
                                {/* react video player ayega */}
                                <ReactPlayer
                                        width="100%"
                                        height={"100%"}
                                        url={course.lectures[0].videoUrl}
                                        controls={true}
                                />
                                {/* {console.log("Video URL:", course?.lectures?.[0]?.videoUrl)}; */}
                            </div>
                            <div>
                                <h1>{course?.lectures?.[0]?.title || "Lecture title"}</h1>
                                <Separator className="my-2" />
                                <h1 className="text-lg md:text-xl font-semiobold">
                                    {(!course?.coursePrice || course.coursePrice <= 0)
                                        ? "Free"
                                        : `₹${course.coursePrice}`}
                                </h1>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between items-center">
                            {purchased ? (
                                <Button onClick={handleContinueCourse} className="bg-[white] text-black w-1/2 hover:bg-[grey] transition-colors">Continue Course</Button>
                            ) : (
                                <BuyCourseButton courseId={courseId} /> 
                            )}
                            <span className="text-sm">
                                Last updated {course?.updatedAt ? new Date(course.updatedAt).toLocaleDateString() : ""}
                            </span>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
};

export default CourseDetail;
