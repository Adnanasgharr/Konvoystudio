"use client";
import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import Button from "@/components/ui/Button"; // adjust path as needed

export default function BookCallButton() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "discovery-call" });
      
      // 🛠️ CRITICAL STEP: Explicitly initialize the embed handler instance 
      // This forces Cal.com to bind safely to whatever origin (IP or Localhost) you are using.
      cal("init", { namespace: "discovery-call" });

      cal("ui", {
        theme: "dark",
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  const handleBookCall = async (e) => {
    // Prevent any default bubbling behaviors that might conflict with layout wraps
    if (e && typeof e.preventDefault === "function") {
      e.preventDefault();
    }

    try {
      const cal = await getCalApi({ namespace: "discovery-call" });
      cal("modal", {
        calLink: "konvoy-studio/discovery-call",
        config: {
          layout: "month_view",
          theme: "dark"
        }
      });
    } catch (error) {
      console.error("Cal.com failed to initialize on this network origin:", error);
    }
  };

  return (
    <Button
      text="Book a Call"
      onClick={handleBookCall}
    />
  );
}