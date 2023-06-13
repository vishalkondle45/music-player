import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
} from "@mantine/core";
import { useDispatch } from "react-redux";
import { setLogin, setRegister } from "../store/popupSlice";

export default function Register() {
  const dispatch = useDispatch();
  return (
    <>
      <Container size={420}>
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          Welcome
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Do you have an account already?{" "}
          <Anchor
            size="sm"
            component="button"
            onClick={() => {
              dispatch(setLogin(true));
              dispatch(setRegister(false));
            }}
          >
            Sign in
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput label="Email" placeholder="you@mantine.dev" required />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
          />
          <Button fullWidth mt="xl">
            Sign in
          </Button>
        </Paper>
      </Container>
    </>
  );
}
