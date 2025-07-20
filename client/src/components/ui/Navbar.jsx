import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Separator,
} from '@radix-ui/react-dropdown-menu';
import { Menu, School } from 'lucide-react';

import { Button } from './button';
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


const Navbar = () => {
  const user = true;
  const role = 'instructor'

  return (
    <div className="h-16 dark:bg-[#0A0A0A] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
      {/* Desktop */}
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <School size={30} />
          <h1 className="hidden md:block font-extrabold text-2xl">
            StudyNest
          </h1>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-8">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="w-10 h-10 rounded-full overflow-hidden cursor-pointer">
                  <Avatar className="w-full h-full">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                      className="w-full h-full object-cover rounded-full"
                    />
                    <AvatarFallback className="w-full h-full flex items-center justify-center bg-gray-200 text-sm rounded-full">
                      CN
                    </AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 mt-2" align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem>My Learning</DropdownMenuItem>
                  <DropdownMenuItem>Edit Profile</DropdownMenuItem>
                  <DropdownMenuItem>Log out</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Dashboard</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline">Login</Button>
              <Button>Signup</Button>
            </div>
          )}
          <DarkMode />
        </div>
      </div>

      {/* Mobile device */}
      <div className='flex md:hidden items-center justify-between px-4 h-full'>
        <h1 className='font-extrabold text-2xl'>StudyNest</h1>
        <MobileNavbar />
      </div>
    </div>
  );
};

export default Navbar;

const MobileNavbar = () => {
  const role = 'instructor'
  return (
    <Sheet>
      <div className="flex items-center px-4 h-full"> {/* Added this div for positioning */}
        <SheetTrigger asChild>
          <Button size='icon' className='rounded-full bg-gray-200 hover:bg-gray-200' variant="outline">
            <Menu />
          </Button>
        </SheetTrigger>
        {/* The rest of your mobile navbar content can go here if needed, or remain outside this div */}
      </div>
      <SheetContent className='flex flex-col'>
        <SheetHeader className='flex flex-row items-center justify-between mt-2'>
          <SheetTitle>StudyNest</SheetTitle>
          <DarkMode />
        </SheetHeader>
        <Separator className='mr-2' />
        <nav className="flex flex-col space-y-4">
          <span>My Learning</span>
          <span>Edit Profile</span>
          <p>Log out</p>
        </nav>
        {
          role === 'instructor' && (
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Dashboard</Button>
              </SheetClose>
            </SheetFooter>
          )
        }

      </SheetContent>
    </Sheet>
  );
};