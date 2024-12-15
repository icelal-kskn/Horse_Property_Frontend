import jwtDecode from "jwt-decode";

/**
 * Checks if the token is valid by decoding it and comparing its expiration time.
 * @returns {boolean} - Returns true if the token is valid, false otherwise.
 */
function isTokenValid() {
  const token = localStorage.getItem("token");

  if (!token) {
    console.warn("No token found in localStorage.");
    return false;
  }

  try {
    const decodedToken = jwtDecode(token); // Decode the JWT
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    if (decodedToken.exp > currentTime) {
      return true; // Token is valid
    } else {
      console.warn("Token has expired.");
      return false; // Token has expired
    }
  } catch (error) {
    console.error("Failed to decode token:", error);
    return false; // Token is invalid or malformed
  }
}

export default isTokenValid;



