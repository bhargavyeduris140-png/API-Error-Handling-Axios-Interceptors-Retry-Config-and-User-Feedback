import axios from "axios";

// A single, shared Axios instance. Base URL comes from client/.env.development.
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Attach the auth token to every outgoing request when one is available.
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Handle authentication and server failures in one shared place.
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      window.location.href = "/login";
    } else if (status >= 500) {
      window.alert("A server error occurred. Please try again later.");
    }

    // Leave other errors (such as 400, 404, and 409) to the calling component.
    return Promise.reject(error);
  }
);

export default apiClient;
