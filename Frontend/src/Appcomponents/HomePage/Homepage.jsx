import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { ChevronLeft, ChevronRight } from "lucide-react";
import PopularCourses from "../Courses/PopularCourses";
import IconCloud from "@/components/ui/icon-cloud";

import "animate.css";
import { Review } from "../Review/Review";
import InteractiveHoverButton from "@/components/ui/interactive-hover-button";
const Homepage = () => {
  const slugs = [
    "microsoftteams", // For team collaboration
    "slack", // Workplace communication
    "zoom", // Video conferencing
    "asana", // Task management
    "trello", // Project organization
    "notion", // Note-taking and planning
    "github", // Version control and collaboration
    "gitlab", // Collaboration and productivity
    "figma", // Creative collaboration
    "googlemeet", // Video meetings
    "microsoftoutlook", // Email and organization
    "linkedin", // Professional networking
    "medium", // Knowledge sharing
    "edx", // Education and courses
    "coursera", // Online learning
    "khanacademy", // Skill building
    "udemy", // Learning new skills
    "microsoftpowerpoint", // Presentations
    "microsoftword", // Documentation
    "microsoftexcel", // Data and organization
    "stackoverflow", // Knowledge sharing and troubleshooting
    "youtube", // Video learning
    "firebase", // Development tools
    "react", // Technology stack
    "javascript", // Development tools
    "python", // Coding and automation
  ];
  const images = [
    "https://next-images.123rf.com/index/_next/image/?url=https://assets-cdn.123rf.com/index/static/assets/top-section-bg.jpeg&w=3840&q=75",
    "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
    "https://fps.cdnpk.net/images/home/subhome-ai.webp?w=649&h=649",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="w-full h-[850px] sm:h-[818px] md:py-3 bg-pale py-3 ">
        <div className="w-[90%] mx-auto sm:h-[90%] md:h-full flex flex-col lg:flex-row justify-between items-center">
          <div className="w-full lg:w-1/2 flex justify-center items-center animate__animated animate__fadeInLeft">
            <div className="relative flex size-full max-w-lg items-center justify-center  mb-10 sm:mb-0  ">
              <IconCloud iconSlugs={slugs} />
            </div>
          </div>

          <div className="w-full lg:w-1/2 text-center lg:text-left animate__animated animate__bounceInRight">
            <h1 className="text-3xl font-bold mb-4">
              Unlock Your Potential: Learn, Build, and Grow
            </h1>
            <p className="w-[90%] lg:w-2/3 mx-auto lg:mx-0 mb-6">
              Empower yourself with the skills and knowledge you need to
              succeed. Dive into hands-on learning experiences, and achieve your
              personal and professional goals with confidence.
            </p>

            <InteractiveHoverButton name={"Explore Courses"} />
          </div>
        </div>
      </div>

      {/* Image Slider */}
      <div className="relative w-[460px] sm:w-[80%] lg:w-[70%]  mx-auto overflow-hidden my-10 rounded-3xl">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-[100%] sm:w-full md:w-full h-[400px] object-cover rounded-3xl mx-auto"
          />
        </AnimatePresence>

        {/* Slider Buttons */}
        <div className="">
          <button
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="absolute top-1/2 left-2 transform   -translate-y-1/2 text-white  "
          >
            <ChevronLeft className="w-20 h-20" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next Slide"
            className="absolute top-1/2 right-2 transform -translate-y-1/2  text-white  "
          >
            <ChevronRight className="w-20 h-20" />
          </button>
        </div>
        {/* pagination */}
        <div className="flex justify-center space-x-2 mt-4 ">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? "bg-black" : "bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>

      {/* popular courses */}

      <div className="w-[460px] sm:w-[70%] my-10 mx-auto  ">
        <PopularCourses />
      </div>

      <div>
        <Review />
      </div>
    </div>
  );
};

export default Homepage;
