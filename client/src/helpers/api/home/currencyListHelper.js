import axios from "axios";

export const fetchCurrencyList = async () => {
    try {
        const response = await axios.post("http://localhost:8081/currencyList", {
            headers: {
                "x-access-token" : localStorage.getItem("token"),
            }
        });
        return response;
    } catch (error) {
        console.error(error);
    }
}