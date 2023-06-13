import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import { Grid } from "@mantine/core";
import axiosInstance from "../config/axios";
import { useDispatch } from "react-redux";
import { logout, setIsLoggedIn, setUser } from "../store/userSlice";
import Songs from "../pages/Songs";
import { setLikes } from "../store/userSlice";

const Home = ({ setLogin, setRegister }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  useEffect(() => {
    const isTokenValid = async () => {
      const token = localStorage.getItem("token");
      await axiosInstance
        .post("/user/protected", null, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          dispatch(setUser(res.data.user.user));
          dispatch(setIsLoggedIn(true));
          likes();
        })
        .catch((error) => {
          dispatch(logout());
        });
    };
    const likes = async () => {
      const { data } = await axiosInstance
        .get("/user/myLikes")
        .catch((error) => {
          dispatch(logout());
        });
      dispatch(setLikes(data?.data));
    };
    isTokenValid();
  }, [token, dispatch]);

  return (
    <div>
      <Grid gutter="xs">
        <Grid.Col span={2}>
          <Sidebar />
        </Grid.Col>
        <Grid.Col span={10}>
          <Songs setRegister={setRegister} setLogin={setLogin} />
        </Grid.Col>
      </Grid>
      {/* <NewSong /> */}
    </div>
  );
};

export default Home;
