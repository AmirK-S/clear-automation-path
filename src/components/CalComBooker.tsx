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
}: CalComBookerProps) => {
  useEffect(() => {
    const calView = view.toLowerCase();

    // Use Cal.com's loader function pattern
    (function (C: any, A: string, L: string) {
      let p = function (a: any, ar: any) {
        a.q.push(ar);
      };
      let d = C.document;
      C.Cal =
        C.Cal ||
        function () {
          let cal = C.Cal;
          let ar = arguments;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api = function () {
              p(api, arguments);
            };
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else p(cal, ar);
            return;
          }
          p(cal, ar);
        };
    })(window, "https://app.cal.com/embed/embed.js", "init");

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
  }, [username, eventSlug, view]);

  return (
    <div
      id={`my-cal-inline-${eventSlug}`}
      className="w-full"
      style={{
        width: "100%",
        height: "100%",
        minHeight: "700px",
        overflow: "scroll",
      }}
    />
  );
};

export default CalComBooker;
