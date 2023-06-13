import {
  createStyles,
  Header,
  Container,
  Group,
  Burger,
  Paper,
  Transition,
  rem,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setIsLoggedIn } from "../store/userSlice";
import { setLogin, setRegister } from "../store/popupSlice";

const HEADER_HEIGHT = rem(60);

const useStyles = createStyles((theme) => ({
  root: {
    position: "relative",
    zIndex: 1,
  },

  dropdown: {
    position: "absolute",
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: "hidden",

    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      cursor: "pointer",
    },

    [theme.fn.smallerThan("sm")]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

export default function Navbar() {
  const user = useSelector((state) => state.user);
  const [opened, { toggle, close }] = useDisclosure(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { classes, cx } = useStyles();

  return (
    <Header height={HEADER_HEIGHT} className={classes.root}>
      <Container className={classes.header}>
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <Text
            fw={700}
            className={cx(classes.link)}
            onClick={() => navigate("/")}
          >
            Lyriks
          </Text>
        </Link>
        <Group spacing={5} className={classes.links}>
          {user.isLoggedIn ? (
            <>
              <Link
                className={cx(classes.link)}
                to={"/likes"}
                onClick={() => {
                  close();
                }}
              >
                My Likes
              </Link>
              <Link
                className={cx(classes.link)}
                to={"/playlists"}
                onClick={() => {
                  close();
                }}
              >
                My Playlists
              </Link>
              <Text
                className={cx(classes.link)}
                onClick={() => {
                  dispatch(setIsLoggedIn(false));
                  localStorage.clear("token");
                  close();
                }}
              >
                Logout
              </Text>
            </>
          ) : (
            <>
              <Text
                className={cx(classes.link)}
                onClick={() => {
                  dispatch(setLogin(false));
                  dispatch(setRegister(true));
                  close();
                }}
              >
                Register
              </Text>
              <Text
                className={cx(classes.link)}
                onClick={() => {
                  dispatch(setLogin(true));
                  dispatch(setRegister(false));
                  close();
                }}
              >
                Login
              </Text>
            </>
          )}
        </Group>

        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
        />

        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {user.isLoggedIn ? (
                <>
                  <Link
                    to={"/likes"}
                    className={cx(classes.link)}
                    onClick={() => {
                      close();
                    }}
                  >
                    My Likes
                  </Link>
                  <Link
                    className={cx(classes.link)}
                    to={"/playlists"}
                    onClick={() => {
                      close();
                    }}
                  >
                    My Playlists
                  </Link>
                  <Text
                    className={cx(classes.link)}
                    onClick={() => {
                      dispatch(setIsLoggedIn(false));
                      localStorage.clear("token");
                      close();
                    }}
                  >
                    Logout
                  </Text>
                </>
              ) : (
                <>
                  <Link
                    className={cx(classes.link)}
                    onClick={() => {
                      dispatch(setLogin(false));
                      dispatch(setRegister(true));
                      close();
                    }}
                  >
                    Register
                  </Link>
                  <Link
                    className={cx(classes.link)}
                    onClick={() => {
                      dispatch(setLogin(true));
                      dispatch(setRegister(false));
                      close();
                    }}
                  >
                    Login
                  </Link>
                </>
              )}
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  );
}
