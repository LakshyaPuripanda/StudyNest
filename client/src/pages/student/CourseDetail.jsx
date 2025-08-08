import BuyCourseButton from "@/components/BuyCourseButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BadgeInfo, PlayCircle } from "lucide-react";
import React from "react";

const CourseDetail = () => {
    const purchasedCourse = false; // This should be replaced with actual logic to check if the course is purchased
    return (
        <div className="mt-20 space-y-5">
            <div className="bg-[#2D2F31] text-white">
                <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
                    <h1 className="font-bold text-2xl md:3xl">Course Title</h1>
                    <p className="text-base md:text-lg">Course Sub-title</p>
                    <p>Created By{""} <span className="text-[#C0C4FC] underline italic">Sahil Yadav Ji</span></p>
                    <div className="flex items-center gap-2 text-sm">
                        {/* <span className="bg-[#C0C4FC] text-black px-2 py-1 rounded-full">Category</span>
                        <span className="bg-[#C0C4FC] text-black px-2 py-1 rounded-full">Level</span>
                        <span className="bg-[#C0C4FC] text-black px-2 py-1 rounded-full">Language</span> */}
                        <BadgeInfo size={16} />
                        <p>Last updated 08-08-2030</p>

                    </div>
                    <p>Student enrolled: 10</p>
                </div>
            </div>
            <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col gap-4 lg:flex-row justify-between gap-10">
                <div className="w-full lg:w-1/2 space-y-5">
                    <h1 className="font-bold text-2xl md:text-3xl">Course Description</h1>
                    <p className="text-base md:text-sm">
                        This course covers both the NextJS "App Router" & the "Pages Router" - two different approaches for building fullstack apps with React! And, of course, you'll learn what these two approaches are, why two different approaches exist and how each approach works!<br/>
                        Because NextJS is growing fast and therefore in high demand. And there are good reasons for that: NextJS allows you to build React apps with built-in server-side rendering and page pre-rendering. Building great user experiences and search engine friendly (SEO!) React apps has never been easier!<br/>
                        We'll also cover the latest NextJS features, including the new "Turbopack" bundler, the new "React Server Components" and much more!<br />
                    </p>
                    <Card className="bg-[#2d2f56] text-white">
                        <CardHeader >
                            <CardTitle className="text-lg font-semibold">What you'll learn</CardTitle>
                            <CardDescription>4 lecture</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">{
                            [1, 2, 3].map((_, idx) => (
                                // className="flex items-center gap-2"
                                <div key={idx} className="flex items-center gap-3 text-sm ">
                                    <span className="text-sm text-gray-700">{ true ? <PlayCircle size={14} color="white"/>: <Lock size={14}/>}</span>
                                    <p>lecture title</p>
                                </div>
                            ))
                        }
                        </CardContent>
                    </Card>
                </div>
                <div className="w-full lg:w-1/3">
                    <Card className="bg-[#2d2f56] text-white">
                        <CardContent className="p-4 flex flex-col">
                            <div className="w-full aspect-video mb-4">
                                {/* react video player ayega */}
                            </div>
                            <div>
                                <h1 >Lecture title</h1>
                                <Separator className="my-2" />  
                                <h1 className="text-lg md:text-xl font-semiobold">Course Price</h1>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between items-center">
                            {
                                purchasedCourse ? (
                                    <Button className="bg-[white] text-black w-1/2 hover:bg-[grey] transition-colors">Go to Course</Button>
                                ) : (
                                    <BuyCourseButton/>
                                )
                            }
                            
                            <span className="text-sm">Last updated 08-08-2030</span>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
};

export default CourseDetail;    
