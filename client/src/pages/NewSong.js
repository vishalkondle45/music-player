import React, { useEffect } from "react";
import { Grid } from "@mantine/core";
import axiosInstance from "../config/axios";
import { useDispatch } from "react-redux";
import { logout, setIsLoggedIn, setUser } from "../store/userSlice";
import NewSong from "../components/NewSong";

const NewSongPage = () => {
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
        <Grid.Col span={12}>
          <NewSong />
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default NewSongPage;
