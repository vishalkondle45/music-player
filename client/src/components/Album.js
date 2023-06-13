import { Card, Image, Text, Group, Badge } from "@mantine/core";

export default function Album({ album }) {
  return (
    <Card shadow="sm" padding="xs" radius="md" withBorder>
      <Card.Section>
        <Image src={album.image} style={{ width: "100%" }} alt="Album Poster" />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={700} truncate>
          {album.title}
        </Text>
        <Badge variant="filled">{album.language}</Badge>
      </Group>

      <Text
        size="sm"
        color="dimmed"
        style={{ marginTop: "-10px", marginBottom: "5px" }}
        truncate
      >
        {album.music}
      </Text>
    </Card>
  );
}
