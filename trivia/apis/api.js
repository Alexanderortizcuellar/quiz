import axios from "axios";

function getQuestion() {
    return new Promise((resolve, reject) => {
        axios.get("http://127.0.0.1:8000/question?lang=en")
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            })
    })
}

export default getQuestion
