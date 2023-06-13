import { TextInput, Button, Group, Box, Textarea, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import axiosInstance from "../config/axios";
import { useEffect, useState } from "react";

export default function NewSong() {
  const languages = [
    "Telugu",
    "Hindi",
    "Tamil",
    "Kannada",
    "English",
    "Malayalam",
  ];
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const getAlbums = async () => {
      const { data } = await axiosInstance.get("/album/list");
      setAlbums(data.data);
    };
    getAlbums();
  }, []);

  const form = useForm({
    initialValues: {
      title: "",
      album: "",
      artist: "",
      link: "",
      language: "Telugu",
    },
  });

  const handleSubmit = async (values) => {
    const { data } = axiosInstance.post("/song", values);
    console.log(data);
  };

  return (
    <Box maw={300} mx="auto" my={12}>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <TextInput
          withAsterisk
          label="Title"
          placeholder="Title of the song"
          {...form.getInputProps("title")}
        />
        <TextInput
          withAsterisk
          label="Artist"
          placeholder="Artist of the song"
          {...form.getInputProps("artist")}
        />
        <Select
          withAsterisk
          label="Album"
          placeholder="Pick one"
          data={albums}
          searchable
          nothingFound="No Albums Found"
          {...form.getInputProps("album")}
        />
        <Textarea
          withAsterisk
          label="Link"
          placeholder="Link of the song"
          {...form.getInputProps("link")}
        />
        <Select
          withAsterisk
          label="Language"
          data={languages}
          placeholder="Link of the song"
          {...form.getInputProps("language")}
        />
        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}
