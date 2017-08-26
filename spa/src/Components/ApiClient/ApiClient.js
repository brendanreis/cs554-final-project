async function sendRequest(url, method, body) {
    try {
        console.log(`Sending request "${method}" to API server at api/${url}`);
        const res = await fetch(`http://localhost:3000/api/${url}`, {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: body
        });
        const resJson = await res.json();
        console.log(`Request response: ${JSON.stringify(resJson)}`);
        return resJson;
    } catch(e) {
        console.error(e)
    }
}

const ApiClient = { sendRequest };

export default ApiClient;