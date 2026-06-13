import io from "socket.io-client";
import { BASE_URL } from "../api/apiservice";

const socket = io(BASE_URL, {
  withCredentials: true,
  transports: ["websocket", "polling"], // optional, improves compatibility
});

export default socket;
