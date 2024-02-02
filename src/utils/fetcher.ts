export const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .catch((err) => console.log(err));
