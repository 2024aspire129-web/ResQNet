// import io from "socket.io-client";

// const socket = io("http://localhost:3000");

// export default socket;


import io from "socket.io-client";
import { BASE_URL } from "../api/apiservice";

const socket = io(BASE_URL, {
  withCredentials: true,
  transports: ["websocket", "polling"], // optional, improves compatibility
});

export default socket;
