import React from "react";
import { useParams } from "react-router";
import { PHOTO_GET } from "../../api";
import useFetch from "../../Hooks/useFetch";
import Error from "../Helper/Error";
import Head from "../Helper/Head";
import Loading from "../Helper/Loading";
import PhotoContent from "./PhotoContent";

const Photo = () => {
  const { id } = useParams();
  const { data, loading, error, request } = useFetch();

  React.useEffect(() => {
    const { url, options } = PHOTO_GET(id);
    request(url, options);
  }, [id, request]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (!data) return null;
  return (
    <section className="container mainContainer">
      <Head title={data.photo.title} description="Foto do animal" />
      <PhotoContent single={true} data={data} />
    </section>
  );
};

export default Photo;