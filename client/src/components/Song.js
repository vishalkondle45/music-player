import {
  Card,
  Image,
  Text,
  Group,
  ActionIcon,
  Loader,
  Tooltip,
  Box,
  LoadingOverlay,
} from "@mantine/core";
import {
  IconDots,
  IconHeart,
  IconHeartFilled,
  IconPlaylistAdd,
} from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentSong,
  setCurrentSongImage,
  setCurrentSongTitle,
} from "../store/currentSongSlice";
import { IconPlayerPlayFilled } from "@tabler/icons-react";
import { setLogin } from "../store/popupSlice";
import axiosInstance from "../config/axios";
import { setLikes } from "../store/userSlice";
import { useDisclosure } from "@mantine/hooks";

export default function Song({ song, albums }) {
  const dispatch = useDispatch();
  const { currentSong, isPlaying } = useSelector((state) => state.currentSong);
  const { isLoggedIn, likes } = useSelector((state) => state.user);
  const token = localStorage.getItem("token");
  const [visible, { open, close }] = useDisclosure(false);
  const like = async () => {
    open();
    const { data } = await axiosInstance.put(
      "/user/addSongToLikes",
      {
        _id: song._id,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch(setLikes(data.data.likes));
    close();
  };
  const removeLike = async () => {
    open();
    const { data } = await axiosInstance.put(
      "/user/removeSongFromLikes",
      {
        _id: song._id,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch(setLikes(data.data.likes));
    close();
  };
  return (
    <Card shadow="sm" padding="xs" radius="md" withBorder>
      <Card.Section>
        <Image
          src={
            albums.find((album) => album._id === song.album)?.image || (
              <Loader />
            )
          }
          style={{ width: "100%" }}
          withPlaceholder
          placeholder={<Loader />}
        />
      </Card.Section>
      <Group position="apart" mt="md" mb="xs">
        <Box w={110}>
          <Box title={song.artist} w={130}>
            <Text weight={700} size="sm" truncate>
              {song.title}
            </Text>
          </Box>
        </Box>
        <Group>
          <LoadingOverlay visible={visible} overlayBlur={2} />
          {likes?.includes(song._id) ? (
            <ActionIcon
              variant="transparent"
              color="pink"
              onClick={() => {
                if (isLoggedIn) removeLike();
                else dispatch(setLogin(true));
              }}
            >
              <IconHeartFilled />
            </ActionIcon>
          ) : (
            <ActionIcon
              variant="transparent"
              color="pink"
              onClick={() => {
                if (isLoggedIn) like();
                else dispatch(setLogin(true));
              }}
            >
              <IconHeart />
            </ActionIcon>
          )}
          <ActionIcon variant="transparent" color="dark">
            <IconPlaylistAdd />
          </ActionIcon>
        </Group>
      </Group>
      <Group position="apart">
        <Box title={song.artist} w={155}>
          <Text size="sm" color="dimmed" truncate>
            {song.artist}
          </Text>
        </Box>
        <div>
          {currentSong === song.link ? (
            <Text>
              {isPlaying ? (
                <ActionIcon variant="transparent" color="blue" disabled>
                  <Loader variant="bars" size={"xs"} />
                </ActionIcon>
              ) : (
                <ActionIcon variant="transparent" color="blue">
                  <IconDots />
                </ActionIcon>
              )}
            </Text>
          ) : (
            <ActionIcon
              variant="transparent"
              color="blue"
              onClick={() => {
                if (isLoggedIn) {
                  dispatch(setCurrentSong(song.link));
                  dispatch(setCurrentSongTitle(song.title));
                  dispatch(
                    setCurrentSongImage(
                      albums.find((album) => album._id === song.album)?.image
                    )
                  );
                } else {
                  dispatch(setLogin(true));
                }
              }}
            >
              <IconPlayerPlayFilled />
            </ActionIcon>
          )}
        </div>
      </Group>

      {/* <audio controls src={song.link} style={{ width: "100%" }}></audio> */}
    </Card>
  );
}
