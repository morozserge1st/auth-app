const API_URL = 'http://localhost:1337';

const fetchAPI = async <Res, Body>(
  method: string,
  url: string,
  body?: Body,
  token?: string,
): Promise<Res> => {
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${url}`, options);

  const json = await res.json();

  if (!res.ok) {
    console.error(json?.message);
    throw new Error(json?.message);
  }

  return json;
};

export const fetchPOST = async <Res, Body>(
  url: string,
  body: Body,
  token?: string,
): Promise<Res> => {
  return await fetchAPI('POST', url, body, token);
};

export const fetchGET = async <Res>(
  url: string,
  token?: string,
): Promise<Res> => {
  return await fetchAPI('GET', url, null, token);
};
