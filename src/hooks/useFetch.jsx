import { useState, useEffect } from "react";

export default function useFetch(url) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    console.log("요청 URL 확인:", url);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("HTTP 에러! 상태 코드: " + res.status);
        return res.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("⛔ 에러 내용:", err);
        setError(err);
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
}
