import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { Modal, rem } from "@mantine/core";
import NewSongPage from "./pages/NewSong";
import Albums from "./pages/Albums";
import Footer from "./components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setRegister } from "./store/popupSlice";

function App() {
  const { currentSong } = useSelector((state) => state.currentSong);
  const { register, login } = useSelector((state) => state.popup);
  const dispatch = useDispatch();

  return (
    <>
      <Navbar />
      {login && (
        <Modal
          opened={login}
          onClose={() => dispatch(setLogin(false))}
          centered
          overlayProps={{
            opacity: 0.55,
            blur: 10,
          }}
        >
          <Login />
        </Modal>
      )}
      {register && (
        <Modal
          opened={register}
          onClose={() => dispatch(setRegister(false))}
          centered
          overlayProps={{
            opacity: 0.55,
            blur: 10,
          }}
        >
          <Register />
        </Modal>
      )}
      <div
        style={{
          position: "fixed",
          top: rem(60),
          bottom: 0,
          left: 0,
          right: 0,
          overflowY: "auto",
          // marginBottom: `${currentSong} ? 80px : 0px`,
          marginBottom: `80px`,
          overflowX: "hidden",
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/newSong" element={<NewSongPage />} />
          <Route path="/albums" element={<Albums />} />
          <Route path="/playlists" element={<Home />} />
        </Routes>
      </div>
      {currentSong && <Footer />}
    </>
  );
}

export default App;
