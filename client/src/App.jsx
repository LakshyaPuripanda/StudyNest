import './App.css'
import Login from './pages/login'
import HeroSection from './pages/student/HeroSection'
import { createBrowserRouter } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import { RouterProvider } from 'react-router'
import Courses from './pages/student/Courses'
import MyLearning from './pages/student/MyLearning'
import Profile from './pages/student/Profile'

import Check from './pages/Check'
import Sidebar from './pages/admin/Sidebar'
import Dashboard from './pages/admin/Dashboard'
import CourseTable from './pages/admin/course/CourseTable'
import AddCourse from './pages/admin/course/AddCourse'
import EditCourse from './pages/admin/course/EditCourse'

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <HeroSection />
            <Courses/>
          </>
        ),
      },
      {
        path: "login",
        element: (      
          <Login />
        ),
      },
      {
        path: "my-learning",
        element: (      
          <MyLearning />
        ),
      },
      {
        path: "profile",
        element: (      
          <Profile />
        ),
      },
      {
        path: "check",
        element: <Check/>,
      },
      // admin routes start from here
      {
        path: "admin",
        element: <Sidebar/>,
        children:[
          {
            path:"dashboard",
            element: <Dashboard/>
          },
           {
            path:"course",
            element: <CourseTable/>
          },
          {
            path:"course/create",
            element: <AddCourse/>
          },
          {
            path:"course/:courseId",
            element:<EditCourse/>
          },
        ]
      }
    ],
  },
]);


function App() {

  return (
    <main>
     <RouterProvider router={appRouter} />
    </main>
  )
}
export default App
