import axios from "axios"

export const fetchWalletData = async (userId) => {
    try {
        const response = await axios.post("http://localhost:8081/wallet", {userId: userId}, {
            headers: {
              "x-access-token": localStorage.getItem("token")
            },
          });
        return response;
    } catch (error) {
        console.error(error);
    }
};