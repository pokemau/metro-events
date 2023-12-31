import { EventReviewParamsType } from "@/utils/Intefaces";

interface EventReviewProps {
  EventReview: EventReviewParamsType;
}

const EventReview: React.FC<EventReviewProps> = ({ EventReview }) => {
  return (
    <div className="bg-[#e9e9e9] mb-1 p-2 rounded-md">
      <div className="flex gap-2 items-center">
        <h1>{EventReview.ReviewPoster}</h1>
        <p className="text-gray-500 text-sm">
          {EventReview.ReviewDatePosted.toDate().toDateString()}
        </p>
      </div>
      <p>{EventReview.ReviewContent}</p>
    </div>
  );
};

export default EventReview;
