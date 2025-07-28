import { Button } from '@/components/ui/button'
import { FancyButton } from '@/components/ui/FancyButton'
import { Input } from '@/components/ui/input'
import { TypingPlaceholderInput } from '@/components/ui/TypingPlaceholderInput'
import React from 'react'

const HeroSection = () => {
  return (
    <div className="mx-auto max-w-[1100px] relative bg-gradient-to-r from-blue-500 to bg-indigo-600 dark:from-gray-800 dark:to-gray-900 py-24 px-4 text-center">
      <div className='max-w-3xl mx-auto'>
        <h1 className="text-white text-4xl font-bold mb-4">
          Find the Best Courses for You
        </h1>
        <p className="text-gray-200 dark:text-gray-400 mb-8">
          Discover, Learn, and Upskill with our wide range of courses
        </p>

        <form className="flex items-center bg-white dark:bg-gray-800 rounded-full shadow-lg overflow-hidden max-w-xl mx-auto mb-6">
          <TypingPlaceholderInput text="Search Courses" typingSpeed={100} />
          <Button type="submit" className="bg-blue-600 dark:bg-blue-700 text-white px-6 py-3 rounded-r-full hover:bg-blue-700 dark:hover:bg-blue-800">Search</Button>
        </form>
          <FancyButton color="#1050fd" hoverColor='blue'>Explore Courses</FancyButton>
      </div>
    </div>
  )
}

export default HeroSection
