"use client";

import { useEffect } from "react";
import { cable } from "@/lib/cable";
import type { Property } from "@/lib/api";

type PropertyUpdateMessage = {
  event: "property_updated";
  property: Property;
};

export function usePropertyUpdates(
  onPropertyUpdated: (property: Property) => void,
) {
  useEffect(() => {
    const subscription = cable.subscriptions.create(
      { channel: "PropertyChannel" },
      {
        connected() {
            console.log("✅ Connected to PropertyChannel");
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
