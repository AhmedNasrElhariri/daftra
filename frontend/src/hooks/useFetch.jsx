import axios from "axios";
import { useEffect, useState } from "react";
import { baseURL } from "../utils/constants";

const useFetch = (url) => {
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    current_page: 1,
    last_page: 1,
    per_page: 10,
    from: null,
    to: null,
    links: {},
  });

  useEffect(() => {
    setLoading(true);

    axios
      .get(`${baseURL}/${url}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const responseData = res.data.data;

        const items = responseData.items || responseData.data || [];
        console.log(items);

        setData(items);

        setPagination({
          total: responseData.meta?.total || 0,
          current_page: responseData.meta?.current_page || 1,
          last_page: responseData.meta?.last_page || 1,
          per_page: responseData.meta?.per_page || 10,
          from: responseData.meta?.from ?? null,
          to: responseData.meta?.to ?? null,
          links: {
            prev: responseData.meta?.prev || null,
            next: responseData.meta?.next || null,
          },
        });
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [url, token]);

  return { data, loading, pagination };
};

export default useFetch;
