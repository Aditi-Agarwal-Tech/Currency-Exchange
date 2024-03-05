import axios from "axios"

export const fetchTransactionData = async (userId) => {
    try {
        const response = await axios.post("http://localhost:8081/transactions", {userId: userId}, {
            headers: {
              "x-access-token": localStorage.getItem("token")
            },
          });
        return response;
    } catch (error) {
        console.error(error);
    }
};
