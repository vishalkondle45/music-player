import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Albumss from "../components/Albums";
import { Grid } from "@mantine/core";
import axiosInstance from "../config/axios";
import { useDispatch } from "react-redux";
import { logout, setIsLoggedIn, setUser } from "../store/userSlice";
// import Songs from "../pages/Songs";

const Albums = () => {
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
        })
        .catch((error) => {
          dispatch(logout());
        });
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
          <h1>Albums</h1>
          <Albumss />
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default Albums;
