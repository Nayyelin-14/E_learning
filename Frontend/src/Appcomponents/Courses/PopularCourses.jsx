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
import StarRatings from "react-star-ratings";
const PopularCourses = () => {
  const [popularCourses, setPopularCourses] = useState([]);

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
  }, []);

  return (
    <div>
      <div className="mb-5 w-[90%] sm:w-full mx-auto">
        <h1 className="font-bold text-xl mb-5">Popular Courses</h1>
        <div className="flex items-center justify-between flex-wrap gap-6">
          <p className="text-md ">
            Explore our most popular programs, get job-ready for an in-demand
            career
          </p>
          <div>
            <Button className="bg-primary">
              View All <ArrowRight />
            </Button>
          </div>
        </div>
      </div>
      {Array.isArray(popularCourses) && popularCourses.length !== 0 ? (
        <div className="grid justify-items-center gap-10 sm:grid-cols-1 md:grid-cols-2  xl:grid-cols-3">
          {popularCourses.map((popular) => (
            <motion.div
              key={popular.course_id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="w-[80%] sm:w-[90%]  lg:w-full"
            >
              <Card className="h-[342px] shadow-lg">
                <CardContent className="flex flex-col gap-6 p-0">
                  <img
                    src={popular.course_image_url}
                    alt=""
                    className="w-full h-[158px] object-cover"
                  />
                  <div className="px-4 flex flex-col gap-3">
                    <CardDescription className="font-bold">
                      {popular.course_name}
                    </CardDescription>
                    <CardDescription>{popular.instructor_name}</CardDescription>
                    <CardDescription className="flex items-center gap-5">
                      {popular.rating}{" "}
                      <div>
                        <StarRatings
                          rating={popular.rating}
                          starRatedColor="gold"
                          numberOfStars={5}
                          name="rating"
                          starDimension="24px"
                          starSpacing="2px"
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
          No popular courses Found!!!
        </div>
      )}
    </div>
  );
};

export default PopularCourses;
