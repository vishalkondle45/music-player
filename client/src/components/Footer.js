import {
  createStyles,
  Container,
  rem,
  Slider,
  ActionIcon,
  Center,
  Badge,
  Grid,
  Image,
  Tooltip,
} from "@mantine/core";
import { IconRepeatOff } from "@tabler/icons-react";
import {
  IconArrowsShuffle,
  IconHeart,
  IconMusic,
  IconPlayerPause,
  IconPlayerPlay,
  IconPlayerSkipBack,
  IconPlayerSkipForward,
  IconPlaylistAdd,
  IconRepeat,
} from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsPlaying } from "../store/currentSongSlice";
import { useHotkeys } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: rem(120),
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    position: "fixed",
    left: 0,
    bottom: 0,
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column",
    },
  },

  links: {
    [theme.fn.smallerThan("xs")]: {
      marginTop: theme.spacing.md,
    },
  },
}));

export default function Footer() {
  const [state, setState] = useState(false);
  const dispatch = useDispatch();
  const { classes } = useStyles();
  const { currentSong, currentSongTitle, currentSongImage } = useSelector(
    (state) => state.currentSong
  );
  const currentSongRef = useRef();
  const playCurrentSong = () => {
    setTimeout(() => {
      if (currentSongRef.current?.paused) {
        currentSongRef.current.play();
        dispatch(setIsPlaying(true));
      } else {
        currentSongRef.current.pause();
        dispatch(setIsPlaying(false));
      }
    }, 100);
  };
  const loopIt = () => {
    if (currentSongRef.current.loop) {
      currentSongRef.current.loop = false;
    } else {
      currentSongRef.current.loop = true;
    }
  };
  function fmtMSS(s) {
    let S = Number(s);
    return (S - (S %= 60)) / 60 + (10 < S ? ":" : ":0") + Math.trunc(S);
  }

  useHotkeys([["space", () => playCurrentSong()]]);

  setTimeout(() => {
    setState((state) => !state);
    if (currentSongRef.current.ended) {
      dispatch(setIsPlaying(false));
    }
  }, 500);

  useEffect(() => {
    setTimeout(() => {
      currentSongRef.current.play();
      dispatch(setIsPlaying(true));
    }, 100);
  }, [currentSong, dispatch]);

  return (
    <div className={classes.footer} style={{ width: "100%" }}>
      <Container size={"md"}>
        {false && state}
        {true && (
          <>
            <audio
              src={currentSong}
              controls
              ref={currentSongRef}
              style={{ display: "none" }}
              preload="metadata"
            ></audio>
          </>
        )}
        <Grid>
          <Grid.Col span={1}>
            <Image src={currentSongImage} p={4}></Image>
          </Grid.Col>
          <Grid.Col span={11}>
            <Slider
              value={currentSongRef.current?.currentTime || 0}
              onChange={(data) => (currentSongRef.current.currentTime = data)}
              thumbChildren={<IconMusic size="1rem" />}
              thumbSize={20}
              mt={6}
              label={null}
              styles={{
                thumb: {
                  borderWidth: rem(2),
                  padding: rem(3),
                },
              }}
              max={currentSongRef.current?.duration}
              min={0}
            />
            <Center>
              <Badge
                variant="dot"
                style={{ marginLeft: "-150px", marginRight: "50px" }}
              >
                {currentSongTitle}
              </Badge>
              <Badge variant="outline" size="lg">
                {fmtMSS(currentSongRef.current?.currentTime)} /{" "}
                {fmtMSS(currentSongRef.current?.duration)}
              </Badge>
              <ActionIcon ml={32}>
                {currentSongRef.current?.loop ? (
                  <Tooltip label="Repeat is On">
                    <IconRepeat onClick={loopIt} size="1.5rem" />
                  </Tooltip>
                ) : (
                  <Tooltip label="Repeat is Off">
                    <IconRepeatOff onClick={loopIt} size="1.5rem" />
                  </Tooltip>
                )}
              </ActionIcon>
              <ActionIcon ml={32}>
                <Tooltip label="Previous">
                  <IconPlayerSkipBack size="1.5rem" />
                </Tooltip>
              </ActionIcon>
              <ActionIcon
                ml={32}
                radius="xl"
                variant="filled"
                color="blue"
                size="lg"
                onClick={playCurrentSong}
              >
                {currentSongRef.current?.paused ? (
                  <Tooltip label="Play">
                    <IconPlayerPlay size="1.5rem" />
                  </Tooltip>
                ) : (
                  <Tooltip label="Pause">
                    <IconPlayerPause size="1.5rem" />
                  </Tooltip>
                )}
              </ActionIcon>
              <ActionIcon ml={32}>
                <Tooltip label="Next">
                  <IconPlayerSkipForward size="1.5rem" />
                </Tooltip>
              </ActionIcon>
              <ActionIcon ml={32}>
                <Tooltip label="Shuffle">
                  <IconArrowsShuffle size="1.5rem" />
                </Tooltip>
              </ActionIcon>
              <ActionIcon ml={50}>
                <Tooltip label="Add to My Likes">
                  <IconHeart size="1.5rem" />
                </Tooltip>
              </ActionIcon>
              <ActionIcon ml={10}>
                <Tooltip label="Add to Playlist">
                  <IconPlaylistAdd />
                </Tooltip>
              </ActionIcon>
            </Center>
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
}
