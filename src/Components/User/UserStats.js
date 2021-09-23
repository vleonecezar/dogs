import React from "react";
import { STATS_GET } from "../../api";
import useFetch from "../../Hooks/useFetch";
import Error from "../Helper/Error";
import Head from "../Helper/Head";
import Loading from "../Helper/Loading";
const UserStatsGraphs = React.lazy(() => import("./UserStatsGraphs"));

const UserStats = () => {
  const { data, error, loading, request } = useFetch();
  console.log(data);

  React.useEffect(() => {
    async function getData() {
      const token = localStorage.getItem("token");
      const { url, options } = STATS_GET(token);
      await request(url, options);
    }
    getData();
  }, [request]);

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  if (!data) return null;
  return (
    <React.Suspense fallback={<></>}>
      <Head title="Estatísticas" description="Página de estatísticas" />
      <UserStatsGraphs data={data} />
    </React.Suspense>
  );
};

export default UserStats;
