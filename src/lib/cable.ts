import { createConsumer } from "@rails/actioncable";

const cableUrl =
  process.env.NEXT_PUBLIC_CABLE_URL ??
  "ws://localhost:4000/cable";

export const cable = createConsumer(cableUrl);
