"use client";

import { useEffect, type ReactNode } from "react";
import { getCalApi } from "@calcom/embed-react";
import { CAL_LINK } from "@/lib/site";

/**
 * Renders a button that opens the Cal.com booking popup.
 *
 * Usage:
 *   <CalBookingButton className="btn btn-primary">
 *     Book a build call
 *   </CalBookingButton>
 *
 * To change the booking link, update CAL_LINK in lib/site.ts.
 */
export function CalBookingButton({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "build-call" });
      cal("ui", {
        theme: "dark",
        styles: { branding: { brandColor: "#0D90FF" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <button
      type="button"
      data-cal-namespace="build-call"
      data-cal-link={CAL_LINK}
      data-cal-config='{"layout":"month_view"}'
      className={className}
    >
      {children}
    </button>
  );
}
