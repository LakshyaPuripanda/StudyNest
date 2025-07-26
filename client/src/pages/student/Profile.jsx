import {React,useEffect} from 'react'
import axios from 'axios'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import Course from './Course';
import { useLoadUserQuery } from '@/features/api/authApi';



const Profile = () => {
    const {data, isLoading}= useLoadUserQuery();
    console.log(data);
    
   useEffect(() => {
    axios.get("http://localhost:8080/api/v1/user/profile", {
      withCredentials: true // if your API uses cookies
    })
      .then(response => {
            
      })
      .catch(err => {
        setError("Failed to load profile");
        setLoading(false);
        console.error(err);
      });
  }, []);

    // const isLoading = false;
    const enrolledCourses = [1];
    return (
        <div className="max-w-4xl mx-auto px-4 my-10">
            <h1 className="font-bold text-2xl text-center md:text-left">PROFILE</h1>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
                <div className="flex flex-col items-center">
                    <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-4">
                        <AvatarImage
                            src="https://github.com/shadcn.png"
                            alt="@shadcn"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
                <div>
                    <div className="mb-2 flex">
                        <span className="w-20 font-semibold text-gray-900 dark:text-gray-100">Name:</span>
                        <span className="text-gray-700 dark:text-gray-300">Sahil</span>
                    </div>
                    <div className="mb-2 flex">
                        <span className="w-20 font-semibold text-gray-900 dark:text-gray-100">Email:</span>
                        <span className="text-gray-700 dark:text-gray-300">sahil@gmail.com</span>
                    </div>
                    <div className="mb-2 flex">
                        <span className="w-20 font-semibold text-gray-900 dark:text-gray-100">Role:</span>
                        <span className="text-gray-700 dark:text-gray-300">INSTRUCTOR</span>
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button size="sm" className="mt-2">
                                Edit Profile
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Edit Profile</DialogTitle>
                                <DialogDescription>
                                    Make changes to your profile here. Click save when you're
                                    done.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label>Name</Label>
                                    <Input
                                        type="text"
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Name"
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label>Profile Photo</Label>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        className="col-span-3"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                                            wait
                                        </>
                                    ) : (
                                        "Save Changes"
                                    )}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <div>
                <h1>Courses you're enrolled in </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
                    {enrolledCourses.length === 0 ? (
                        <h1>You haven't enrolled yet</h1>
                    ) : (
                        enrolledCourses.map((course, index) => (
                            <Course key={index} />
                        ))
                    )}
                </div>
            </div>
        </div>

    )
}

export default Profile
