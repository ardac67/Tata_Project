import React from "react";
import { useQuery } from "@tanstack/react-query";
import Cookies from "universal-cookie";
import fetchRatings from "../ViewProfileComponents/fetchRatings";

function calculateAverageRating(ratings) {
  var totalRating = 0;
  for (var i = 0; i < ratings.length; i++) {
    totalRating += ratings[i].rating;
  }

  return (totalRating / ratings.length).toFixed(2);
}

function FetchRatingsComponent({ user_id }) {
  const cookies = new Cookies(null, { path: "/" });
  const token = cookies.get("token");

  // Fetch ratings for the specific user_id
  const { data: ratings, isLoading } = useQuery(
    ["ratings", user_id, token],
    fetchRatings
  );

  if (isLoading) {
    return <div>Loading ratings...</div>;
  }

  // Display the ratings as needed
  return ratings && ratings.rating.length > 0
    ? calculateAverageRating(ratings.rating)
    : "N/A";
}

// Utility function to calculate average rating
export default FetchRatingsComponent;
