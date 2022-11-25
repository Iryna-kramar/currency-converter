export const myHeaders = new Headers();
myHeaders.append("apikey", "0o0C8eIONyzT0O4W8JZM0qgCKT8nvQRc");

export const requestOptions = {
  method: "GET",
  redirect: "follow",
  headers: myHeaders,
};

export const fetchData = async (url, options) => {
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};
