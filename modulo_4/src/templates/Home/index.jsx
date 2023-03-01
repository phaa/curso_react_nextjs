import { useEffect, useState } from 'react';

export const useFetch = (url, options) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('Effect', new Date().toLocaleString());

    setLoading(true);

    const fetchData = async () => {
      await new Promise((r) => setTimeout(r, 3000));

      try {
        const response = await fetch(url, options);
        const jsonResult = response.json();
        setResult(jsonResult);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    fetchData();
  }, [url, options]);

  return [result, loading];
};

const Home = () => {
  const [result, loading] = useFetch(
    'https://jsonplaceholder.typicode.com/posts',
  );

  if (loading) {
    return <p>Loading</p>;
  }

  if (!loading && result) {
    console.log(result);
  }

  return <h1>Oi</h1>;
};

export default Home;
