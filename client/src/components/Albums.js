import React, { useEffect, useState } from "react";
import Album from "../components/Album";
import axiosInstance from "../config/axios";
import { SimpleGrid } from "@mantine/core";

const Songs = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const getAlbums = async () => {
      const { data } = await axiosInstance.get("/album");
      setAlbums(data.data);
    };
    getAlbums();
  }, []);

  return (
    <div>
      <SimpleGrid cols={4} pr={12}>
        {albums.map((album) => (
          <>
            <Album album={album} key={album._id} />
            {/* <Album album={album} key={album._id} /> */}
          </>
        ))}
      </SimpleGrid>
    </div>
  );
};

export default Songs;
