import React, { useCallback, useEffect, useState } from "react";
import { get_PopularCourses } from "../../EndPoints/courses";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CircleArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { CircleArrowLeft } from "lucide-react";
import ReactStars from "react-rating-stars-component";
const PopularCourses = () => {
  const [popularCourses, setPopularCourses] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [coursePerpage, setCoursePerpage] = useState(4);
  const updatePerPage = useCallback(() => {
    //usecallback 3
    if (window.innerWidth <= 874) {
      setCoursePerpage(1);
    } else if (window.innerWidth <= 1523) {
      setCoursePerpage(2);
    } else if (window.innerWidth <= 1844) {
      setCoursePerpage(3);
    } else {
      setCoursePerpage(4);
    }
  });

  const lastCourseIndex = currentPage * coursePerpage; //1*4 = 4 at largest screen
  const firstCourseIndex = lastCourseIndex - coursePerpage; //4-4 =0
  const currentCourses = popularCourses.slice(
    firstCourseIndex,
    lastCourseIndex
  ); //slice(0,4) 0 inclusive 4 exclussive , [0 1 2 3] (array)

  const totalpages = Math.ceil(popularCourses.length / coursePerpage); //4/4 = 1
  const paginate = (pageNum) => {
    setTimeout(() => {
      setCurrentPage(pageNum);
    }, 300);
  };
  // const itemsPerPage = 6; // Number of courses to display per page

  const DisplayCourses = async () => {
    try {
      const response = await get_PopularCourses();
      if (response.isSuccess) {
        setPopularCourses(response.Popularcourses);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    DisplayCourses();
    updatePerPage();
    // Add a resize event listener
    window.addEventListener("resize", updatePerPage);
    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", updatePerPage);
  }, []);

  return (
    <div>
      <div className="mb-5">
        <h1 className="font-bold text-xl mb-5">Popular Courses</h1>
        <div className="flex items-center justify-between flex-wrap ">
          <p className="text-md  max-w-[600px]">
            Explore our most popular programs, get job-ready for an in-demand
            career
          </p>

          {popularCourses.length !== 0 && (
            <div className="flex justify-center mt-4">
              <div className="flex flex-wrap items-center justify-center max-w-full overflow-hidden gap-2  p-2 rounded-lg">
                {/* Previous Button */}

                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  aria-label="Previous Page"
                  className={`flex items-center  transition-all
          ${
            currentPage === 1
              ? " text-gray-400 cursor-not-allowed"
              : " text-red-900 "
          }`}
                >
                  <CircleArrowLeft
                    size={44}
                    strokeWidth={1.25}
                    absoluteStrokeWidth
                  />
                </button>

                {/* Next Button */}
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalpages}
                  aria-label="Next Page"
                  className={`flex items-center transition-all
          ${
            currentPage === totalpages
              ? " text-gray-400 cursor-not-allowed"
              : " text-red-900 "
          }`}
                >
                  <CircleArrowRight
                    size={44}
                    strokeWidth={1.25}
                    absoluteStrokeWidth
                  />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {Array.isArray(popularCourses) && popularCourses.length !== 0 ? (
        <div className="flex justify-center lg:justify-between items-center flex-wrap gap-6">
          {currentCourses.map((popular) => (
            <motion.div
              key={popular.course_id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="w-[80%] md:w-[48%] lg:w-[300px]"
            >
              <Card className="h-[342px] shadow-lg">
                <CardContent className="flex flex-col gap-6">
                  <img
                    src={popular.course_image_url}
                    alt=""
                    className="w-full h-[158px]"
                  />
                  <div className="px-4 flex flex-col gap-3">
                    <CardDescription className="font-bold">
                      {popular.course_name}
                    </CardDescription>
                    <CardDescription>{popular.instructor_name}</CardDescription>
                    <CardDescription className="flex items-center gap-5">
                      {popular.rating}{" "}
                      <div>
                        <ReactStars
                          edit={false}
                          count={5} // Total stars
                          value={popular.rating}
                          size={24} // Size of stars
                          isHalf={true} // Allow half star rating
                          emptyIcon={<i className="far fa-star"></i>} // Empty star icon
                          halfIcon={<i className="fa fa-star-half-alt"></i>} // Half star icon
                          fullIcon={<i className="fa fa-star"></i>} // Full star icon
                          activeColor="#ffd700" // Color for active stars (gold color)
                        />
                      </div>
                    </CardDescription>
                  </div>
                  <CardFooter className="flex justify-between items-center px-3">
                    {popular.is_popular ? (
                      <h4 className="py-1 px-7 bg-yellow-400">Popular</h4>
                    ) : (
                      <>Not</>
                    )}
                    <Button variant="link">Check Details</Button>
                  </CardFooter>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-xl text-center text-red-600 font-medium">
          {currentCourses ? "Loading" : "No popular courses Found!!!"}
        </div>
      )}

      {/* Pagination Controls */}
      <div className=" w-fit mx-auto text-md flex items-center justify-center text-center mt-7 border border-black p-1 ">
        <Button variant="link">View All</Button>
        <ArrowRight size={19} />
      </div>
    </div>
  );
};

export default PopularCourses;
