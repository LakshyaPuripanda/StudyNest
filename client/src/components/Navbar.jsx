import React, { useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Separator,
} from '@radix-ui/react-dropdown-menu';
import { Menu, School } from 'lucide-react';

import { Button } from './ui/button';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@radix-ui/react-avatar';

import DarkMode from '@/DarkMode';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutUserMutation } from '@/features/api/authApi';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const { user, loading } = useSelector(store => store.auth);

  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    await logoutUser();
  };
  // console.log(user, "checking user data in navbar");

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "Logged out successfully");
      navigate("/login");
    }
  }, [isSuccess]);

  if (loading) {
    return null;
  }

  return (
    <div className="h-16 dark:bg-[#0A0A0A] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
      {/* Desktop */}
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full px-4">
        {/* Logo */}
        <Link>
          <div className="flex items-center gap-2">
            <School size={30} />
            <h1 className="hidden md:block font-extrabold text-2xl">
              StudyNest
            </h1>
          </div>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-8">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="w-10 h-10 rounded-full overflow-hidden cursor-pointer">
                  <Avatar className="w-full h-full">
                    <AvatarImage
                      src={user?.photoUrl || "https://github.com/shadcn.png"}
                      alt="@shadcn"
                      className="w-full h-full object-cover rounded-full"
                    />
                    <AvatarFallback className="w-full h-full flex items-center justify-center bg-gray-200 text-sm rounded-full">
                      CN
                    </AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="w-56 mt-2 rounded-xl shadow-lg p-2
               bg-white dark:bg-[#111829]
               border border-gray-200 dark:border-gray-700"
                align="end"
              >
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    className="px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                  >
                    <Link to="my-learning">My Learning</Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    className="px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                  >
                    <Link to="profile">Edit Profile</Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={logoutHandler}
                    className="px-4 py-2 rounded-md hover:bg-red-100 dark:hover:bg-red-900 cursor-pointer transition-colors text-red-600 dark:text-red-400"
                  >
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                {user?.role === "instructor" && (
                  <>
                    <DropdownMenuSeparator className="my-2 border-gray-200 dark:border-gray-700" />
                    <DropdownMenuItem
                      className="px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                    >
                      <Link to="/admin/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => navigate("/login")}>Login</Button>
              <Button onClick={() => navigate("/login")}>Signup</Button>
            </div>
          )}
          <DarkMode />
        </div>
      </div>

      {/* Mobile device */}
      <div className='flex md:hidden items-center justify-between px-4 h-full'>
       <Link>
        <h1 className='font-extrabold text-2xl'>StudyNest</h1>
       </Link>
        {user && < MobileNavbar />}
      </div>
    </div>
  );
};

export default Navbar;

const MobileNavbar = () => {
  const role = 'instructor';
  const [logoutUser] = useLogoutUserMutation();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await logoutUser();
    navigate("/login");
  };

  return (
    <Sheet>
      <div className="flex items-center px-4 h-full">
        <SheetTrigger asChild>
          <Button size="icon" className="rounded-full hover:bg-gray-200" variant="outline">
            <Menu />
          </Button>
        </SheetTrigger>
      </div>

      <SheetContent className="flex flex-col w-[250px]">
        <SheetHeader className="flex flex-row items-center justify-between mt-6">
          <SheetTitle>
            StudyNest
            </SheetTitle>
          <DarkMode />
        </SheetHeader>

        <Separator className="mr-3" />

        <nav className="flex flex-col space-y-4 ml-3">
          <SheetClose asChild>
            <Link to="my-learning">My Learning</Link>
          </SheetClose>

          <SheetClose asChild>
            <Link to="profile">Edit Profile</Link>
          </SheetClose>

          <SheetClose asChild>
            <button
              onClick={logoutHandler}
              className="text-left text-red-500 cursor-pointer"
            >
              Log out
            </button>
          </SheetClose>
        </nav>

        {role === "instructor" && (
          <div className="mt-6 ml-3">
            <SheetClose asChild>
              <Button onClick={() => navigate("/admin/dashboard")}>
                Dashboard
              </Button>
            </SheetClose>
          </div>
        )}

      </SheetContent>
    </Sheet>
  );
};
