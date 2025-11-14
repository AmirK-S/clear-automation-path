import { useEffect } from "react";

interface CalComBookerProps {
  username: string;
  eventSlug: string;
  view?: "MONTH_VIEW" | "WEEK_VIEW" | "COLUMN_VIEW";
  onSuccess?: () => void;
}

declare global {
  interface Window {
    Cal: any;
  }
}

const CalComBooker = ({
  username,
  eventSlug,
  view = "MONTH_VIEW",
  onSuccess
}: CalComBookerProps) => {
  useEffect(() => {
    const calView = view.toLowerCase();

    const initCal = () => {
      if (window.Cal) {
        window.Cal("init", eventSlug, { origin: "https://app.cal.com" });

        window.Cal.ns[eventSlug]("inline", {
          elementOrSelector: `#my-cal-inline-${eventSlug}`,
          config: { layout: calView },
          calLink: `${username}/${eventSlug}`,
        });

        window.Cal.ns[eventSlug]("ui", {
          hideEventTypeDetails: false,
          layout: calView,
        });
      }
    };

    // Check if Cal is already loaded
    if (window.Cal) {
      initCal();
    } else {
      // Check if script already exists
      const existingScript = document.querySelector('script[src="https://app.cal.com/embed/embed.js"]');

      if (existingScript) {
        // Script exists, wait for it to load
        existingScript.addEventListener('load', initCal);
      } else {
        // Load the script
        const script = document.createElement("script");
        script.src = "https://app.cal.com/embed/embed.js";
        script.async = true;
        script.onload = initCal;
        document.head.appendChild(script);
      }
    }
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
