import React from "react";
import { Link, Outlet } from "react-router-dom";
import { ChartNoAxesColumn, SquareLibrary, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"; // ✅ shadcn/ui drawer

const Sidebar = () => {
  return (
    <div className="flex">
      {/* Mobile drawer trigger */}
      <div className="lg:hidden p-1 mr-2 mt-1 ">
        <Sheet>
          <SheetTrigger asChild>
            <button className="p-2 border rounded-md">
              <Menu />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[200px] flex flex-col">
            <div className="mt-15 px-3">
              <SidebarLinks closeOnClick /> {/* ✅ close drawer on click */}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:block w-[250px] sm:w-[175px] border-r border-gray-300 dark:border-gray-700 p-5 sticky top-0 h-screen">
        <SidebarLinks /> {/* ✅ no close behavior on desktop */}
      </div>

      {/* Main content */}
      <div className="flex-1 md:p-24 p-2">
        <Outlet />
      </div>
    </div>
  );
};

const SidebarLinks = ({ closeOnClick = false }) => {
  const Wrapper = closeOnClick ? SheetClose : React.Fragment;

  return (
    <div className="space-y-4">
      <Wrapper asChild>
        <Link to="dashboard" className="flex items-center gap-2">
          <ChartNoAxesColumn size={22} />
          <h1>Dashboard</h1>
        </Link>
      </Wrapper>

      <Wrapper asChild>
        <Link to="course" className="flex items-center gap-2">
          <SquareLibrary size={22} />
          <h1>Courses</h1>
        </Link>
      </Wrapper>
    </div>
  );
};

export default Sidebar;
