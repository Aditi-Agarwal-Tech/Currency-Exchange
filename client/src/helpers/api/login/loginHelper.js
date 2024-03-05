import axios from "axios"

const loginHelper = async (email, password) => {
    try {
        const response = await axios.post("http://localhost:8081/login", {
            email: email,
            password: password,
          });
        return response;
    } catch (error) {
        console.error(error);
    }
}

export default loginHelper;