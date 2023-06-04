import { useAuth } from "../../utils/Auth";
import { Heart } from "../../assets/icons/Icons";
import { useEffect, useState } from "react";
import { useGetUserQuery, useLikeMutation } from "../../store/modules/apiSlice";
import PropTypes from "prop-types";

export default function HeartLike({ setAuthModalIsOpen, venueID }) {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const currentVenue = venueID;

  const { data } = useGetUserQuery(user?.id);
  const [like] = useLikeMutation();

  useEffect(() => {
    if (data) {
      data?.liked_venues?.map((like) => {
        if (like === currentVenue) {
          setIsLiked(true);
        }
      });
    }
  }, [data, currentVenue]);

  if (!user) {
    return (
      <>
        <Heart
          className="h-7 w-7 fill-gray-100/30 stroke-gray-100 duration-100 hover:scale-110"
          // stroke="white"
          onClick={() => setAuthModalIsOpen(true)}
        />
      </>
    );
  }

  return (
    <Heart
      className={`h-7 w-7 ${
        isLiked
          ? "fill-red-500 stroke-red-500"
          : "fill-gray-100/30 stroke-white"
      } drop-shadow-xl duration-100 hover:scale-110`}
      onClick={() => {
        setIsLiked(!isLiked);
        like({
          user_id: user.id,
          venue_id: venueID,
          usersLikedVenues: data?.liked_venues,
        });
      }}
    />
  );
}

HeartLike.propTypes = {
  setAuthModalIsOpen: PropTypes.func.isRequired,
  venueID: PropTypes.string.isRequired,
};
