import { useEffect } from "react";

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
  useEffect(() => {
    // Load Cal.com embed script
    const script = document.createElement("script");
    script.src = "https://app.cal.com/embed/embed.js";
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      // Initialize Cal.com inline embed
      // @ts-ignore - Cal is loaded from external script
      if (window.Cal) {
        // @ts-ignore
        window.Cal("init", eventSlug, { origin: "https://app.cal.com" });

        // Convert uppercase view to lowercase for Cal.com API
        const calView = view.toLowerCase();

        // @ts-ignore
        window.Cal.ns[eventSlug]("inline", {
          elementOrSelector: `#my-cal-inline-${eventSlug}`,
          config: { layout: calView },
          calLink: `${username}/${eventSlug}`,
        });

        // @ts-ignore
        window.Cal.ns[eventSlug]("ui", {
          hideEventTypeDetails: false,
          layout: calView,
        });
      }
    };

    return () => {
      // Cleanup script on unmount
      document.head.removeChild(script);
    };
  }, [username, eventSlug, view]);

  return (
    <div
      id={`my-cal-inline-${eventSlug}`}
      className="w-full"
      style={{
        minHeight: "700px",
        height: "700px",
      }}
    />
  );
};

export default CalComBooker;
