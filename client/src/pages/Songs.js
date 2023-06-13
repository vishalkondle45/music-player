import React, { useEffect } from "react";
import Song from "../components/Song";
import axiosInstance from "../config/axios";
import { Container, SimpleGrid, TextInput } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { setAlbumList, setSongsList } from "../store/listSlice";
import { IconSearch } from "@tabler/icons-react";
import { setSongSearch } from "../store/searchSlice";

const Songs = ({ setLogin, setRegister }) => {
  const dispatch = useDispatch();
  const { songsList, albumList } = useSelector((state) => state.list);
  const { songSearch } = useSelector((state) => state.search);

  useEffect(() => {
    const getSongs = async () => {
      const { data } = await axiosInstance.get("/song");
      dispatch(setSongsList(data.data));
    };
    getSongs();
    const getAlbums = async () => {
      const { data } = await axiosInstance.get("/album");
      dispatch(setAlbumList(data.data));
    };
    getAlbums();
  }, [dispatch]);

  document.addEventListener(
    "play",
    function (e) {
      var audios = document.getElementsByTagName("audio");
      for (var i = 0, len = audios.length; i < len; i++) {
        if (audios[i] !== e.target) {
          audios[i].pause();
        }
      }
    },
    true
  );

  return (
    <div>
      <Container size={"xs"} p={16}>
        <TextInput
          value={songSearch}
          onChange={(event) =>
            dispatch(setSongSearch(event.currentTarget.value))
          }
          icon={<IconSearch size="1rem" />}
          placeholder="Search Song, Album, Artist, Language, Music Director..."
          width={60}
        />
      </Container>
      <SimpleGrid cols={5} pr={12}>
        {songSearch
          ? songsList.map((song) => {
              return (
                <>
                  {(song.title
                    .toLowerCase()
                    .includes(songSearch.toLowerCase()) ||
                    song.artist
                      .toLowerCase()
                      .includes(songSearch.toLowerCase()) ||
                    song.albums[0].title
                      .toLowerCase()
                      .includes(songSearch.toLowerCase()) ||
                    song.albums[0].music
                      .toLowerCase()
                      .includes(songSearch.toLowerCase()) ||
                    song.albums[0].language
                      .toLowerCase()
                      .includes(songSearch.toLowerCase())) && (
                    <Song
                      song={song}
                      songs={songsList}
                      albums={albumList}
                      key={song._id}
                      setRegister={setRegister}
                      setLogin={setLogin}
                    />
                  )}
                </>
              );
            })
          : songsList.map((song) => (
              <>
                <Song
                  song={song}
                  songs={songsList}
                  albums={albumList}
                  key={song._id}
                  setRegister={setRegister}
                  setLogin={setLogin}
                />
              </>
            ))}
      </SimpleGrid>
    </div>
  );
};

export default Songs;
