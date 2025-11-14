import { BookerEmbed } from "@calcom/atoms";

interface CalComBookerProps {
  username: string;
  eventSlug: string;
  view?: "month_view" | "week_view" | "column_view";
  onSuccess?: () => void;
}

const CalComBooker = ({
  username,
  eventSlug,
  view = "month_view",
  onSuccess
}: CalComBookerProps) => {
  return (
    <div className="w-full">
      <BookerEmbed
        eventSlug={eventSlug}
        username={username}
        view={view}
        onCreateBookingSuccess={() => {
          console.log("Booking created successfully");
          if (onSuccess) {
            onSuccess();
          }
        }}
      />
    </div>
  );
};

export default CalComBooker;
