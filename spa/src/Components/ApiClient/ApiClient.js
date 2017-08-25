async function sendRequest(url, method) {
    try {
        console.log("Sending request to API server");
        const res = await fetch(`api/${url}`, {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        return await res.json();
    } catch(e) {
        console.error(e)
    }
}

const ApiClient = { sendRequest };

export default ApiClient;