import React from "react";
import { useQuery } from "@tanstack/react-query";
import Cookies from "universal-cookie";
import fetchRatings from "../ViewProfileComponents/fetchRatings";

function FetchRatingsComponent({ user_id }) {
  const cookies = new Cookies(null, { path: "/" });
  const token = cookies.get("token");

  // Fetch ratings for the specific user_id
  const { data: ratings, isLoading } = useQuery(['ratings', user_id, token], fetchRatings);

  if (isLoading) {
    return <div>Loading ratings...</div>;
  }

  console.log("userid:", user_id);
  console.log("ratings:", ratings);

  // Display the ratings as needed
  return (
    <>
      {ratings && ratings.length > 0 ? calculateAverageRating(ratings) : "N/A"}
    </>
  );
}

// Utility function to calculate average rating
function calculateAverageRating(ratings) {
  const totalRating = ratings.reduce((sum, rating) => sum + rating.value, 0);
  return (totalRating / ratings.length).toFixed(2);
}

export default FetchRatingsComponent;
