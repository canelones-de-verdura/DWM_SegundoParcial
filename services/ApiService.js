import { url } from "./url";

const ApiService = {
    get: async (resource) => {
        const api_response = resource ? await fetch(`${url}/${resource}`) : await fetch(`${url}`);

        console.log(`GET: ${api_response.status}, ${api_response.statusText}`);

        const response = { code: api_response.status, data: null };

        if (api_response.ok)
            response.data = await api_response.json();

        return response;
    },

    post: async (data) => {
        const request = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };

        const api_response = await fetch(url, request);

        console.log(`POST: ${api_response.status}, ${api_response.statusText}`);

        const response = { code: api_response.status, data: null };

        if (api_response.ok)
            response.data = await api_response.json();

        return response;
    },

    delete: async (resource) => {
        const request = {
            method: "DELETE",
        };

        const api_response = await fetch(`${url}/${resource}`, request);

        console.log(`DELETE: ${api_response.status}, ${api_response.statusText}`);

        const response = { code: api_response.status, data: null };

        if (api_response.ok)
            response.data = await api_response.json();

        return response;
    },

    put: async (resource, data) => {
        const request = {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };

        const api_response = await fetch(`${url}/${resource}`, request);

        console.log(`PUT: ${api_response.status}, ${api_response.statusText}`);

        const response = { code: api_response.status, data: null };

        if (api_response.ok)
            response.data = await api_response.json();

        return response;
    },

};

export default ApiService;
