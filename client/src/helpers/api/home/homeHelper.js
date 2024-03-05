import axios from "axios";

export const fetchExchangeRate = async (iHave, iWant) => {
    try {
        const response = await axios.post("http://localhost:8081/exchangerate", {
            currencyFrom: iHave,
            currencyTo: iWant
        }, {
            headers: {
                "x-access-token" : localStorage.getItem("token"),
            }
        });
        return response;
    } catch(error) {
        console.error(error);
    }
}

export const doRegisterTransaction = async (userId, iHave, fromAmt, iWant, toAmt) => {
    try {
        const response = await axios.post("http://localhost:8081/registerTransaction",
        {
            userId: userId,
            currencyFrom: iHave,
            valueFrom: parseFloat(fromAmt),
            currencyTo: iWant,
            valueTo: parseFloat(toAmt),
        },
        {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        });
        return response;
    } catch (error) {
        console.error(error);
    }
}

export const fetchIsSessionActive = async () => {
    try {
        const response = await axios.get("http://localhost:8081");
        return response;
    } catch (error) {
        console.error(error);
    }
}