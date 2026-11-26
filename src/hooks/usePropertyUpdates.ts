"use client";

import { useEffect } from "react";
import { cable } from "@/lib/cable";
import type { PropertyUpdateMessage, Property } from "@/types";

const usePropertyUpdates = (
  onPropertyUpdated: (property: Property) => void,
) => {
  useEffect(() => {
    const subscription = cable.subscriptions.create(
      { channel: "PropertyChannel" },
      {
        connected() {
            console.info("✅ Connected to PropertyChannel");
        },

        rejected() {
            console.error("❌ PropertyChannel subscription rejected");
        },

        received(message: PropertyUpdateMessage) {
          if (message?.event === "property_updated" && message.property) {
            onPropertyUpdated(message.property);
          }
        },
      },
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [onPropertyUpdated]);
}

export default usePropertyUpdates;
