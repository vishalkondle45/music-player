import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import axiosInstance from "../config/axios";
import { useDispatch } from "react-redux";
import { setLogin, setRegister } from "../store/popupSlice";

export default function Login() {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const handleSubmit = async (values) => {
    const { data } = await axiosInstance.post("/user/login", values);
    const { ok, data: Data, error } = data;
    if (error) {
      localStorage.clear("token");
    }
    if (ok) {
      localStorage.setItem("token", Data.token);
    }
    dispatch(setLogin(false));
  };

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
          Welcome back!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Do not have an account yet?{" "}
          <Anchor
            size="sm"
            component="button"
            onClick={() => {
              dispatch(setLogin(false));
              dispatch(setRegister(true));
            }}
          >
            Create account
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <TextInput
              withAsterisk
              label="Email"
              placeholder="your@email.com"
              {...form.getInputProps("email")}
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              withAsterisk
              mt="md"
              {...form.getInputProps("password")}
            />
            <Group position="apart" mt="lg">
              <Anchor component="button" size="sm">
                Forgot password?
              </Anchor>
            </Group>
            <Group position="right" mt="md">
              <Button type="submit">Submit</Button>
            </Group>
          </form>
        </Paper>
      </Container>
    </>
  );
}
