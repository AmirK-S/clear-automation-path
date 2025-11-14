import { BookerEmbed } from "@calcom/atoms";

interface CalComBookerProps {
  username: string;
  eventSlug: string;
  view?: "MONTH_VIEW" | "WEEK_VIEW" | "COLUMN_VIEW";
  onSuccess?: () => void;
}

const CalComBooker = ({
  username,
  eventSlug,
  view = "MONTH_VIEW",
  onSuccess
}: CalComBookerProps) => {
  return (
    <>
      <BookerEmbed
        eventSlug={eventSlug}
        username={username}
        view={view}
        customClassNames={{
          bookerContainer: "border-subtle border",
        }}
        onCreateBookingSuccess={() => {
          console.log("Booking created successfully");
          if (onSuccess) {
            onSuccess();
          }
        }}
      />
    </>
  );
};

export default CalComBooker;
