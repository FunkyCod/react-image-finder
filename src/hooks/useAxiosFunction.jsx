import { useState, useEffect } from 'react';

const useAxiosFunction = () => {
  const [errorFetch, setErrorFetch] = useState('');
  const [loading, setloading] = useState(false);
  const [result, setResult] = useState([]);
  const [controller, setController] = useState();

  const axiosFetch = async (configObj) => {
    const { axiosInstance, method, url, requestConfig = {} } = configObj;
    try {
      setloading(true);
      const ctrl = new AbortController();
      setController(ctrl);
      const response = await axiosInstance[method.toLowerCase()](url, {
        ...requestConfig,
        signal: ctrl.signal,
      });
      // console.log(response);
      const data = await response.data;
      // console.log("response", data);
      setResult(data);
    } catch (error) {
      setErrorFetch(error.message);
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log(error.message);
      }
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    // console.log(controller);
    // useEffect cleanup function
    return () => controller && controller.abort();
  }, [controller]);
  return { result, errorFetch, loading, axiosFetch };
};

export default useAxiosFunction;
