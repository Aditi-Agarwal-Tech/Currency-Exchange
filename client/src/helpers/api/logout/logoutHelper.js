import axios from "axios";

export const logoutHelper = async() => {
    try {
        const response = await axios.post("http://localhost:8081/logout");
        return response;
    } catch (error) {
        console.error(error);
    }
}