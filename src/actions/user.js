import axios from "axios";

export const registration = async (email, password) => {
  try {
    const response = await axios.post(
      `http://localhost:4000/api/auth/registration`,
      {
        email,
        password,
      }
    );
    console.log(response.data.message);
  } catch (e) {
    alert(e.response.data.message);
  }
};
