const baseUrl = process.env.REACT_APP_API_URL;

// TODO: Añadir tipado

export const fetchWithoutToken = (endpoint: string, data: any, method = 'GET'): Promise<any> => {
    const url = `${baseUrl}/${endpoint}`;

    if (method === 'GET') {
        return fetch(url);
    }

    return fetch(url, {
        method,
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
    });
};

export const fetchWithToken = (endpoint: string, data: any = {}, method = 'GET'): Promise<any> => {
    const url = `${baseUrl}/${endpoint}`;
    const token = localStorage.getItem('token') || '';

    if (method === 'GET') {
        return fetch(url, {
            method,
            headers: {
                'x-token': token,
            },
        });
    }

    return fetch(url, {
        method,
        headers: {
            'Content-type': 'application/json',
            'x-token': token,
        },
        body: JSON.stringify(data),
    });
};

export const fetchWithTokenFormData = (endpoint: string, data: any = {}): Promise<any> => {
    const url = `${baseUrl}/${endpoint}`;
    const token = localStorage.getItem('token') || '';

    return fetch(url, {
        method: 'POST',
        headers: {
            'x-token': token,
        },
        body: data,
    });
};
