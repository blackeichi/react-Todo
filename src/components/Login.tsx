import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { usernameState } from "../atoms";

const LoginBox = styled.div`
  width: 500px;
  height: 30%;
  background-color: rgba(255, 255, 255, 0.6);
`;
const LoginForm = styled.form``;

interface IForm {
  username: string;
}

function Login() {
  const setLoginUser = useSetRecoilState(usernameState);
  const { handleSubmit, register } = useForm<IForm>();
  const onValid = (data: any) => {
    setLoginUser(data);
    window.localStorage.setItem("login", JSON.stringify(data));
  };
  return (
    <>
      <LoginBox>
        <span>What's Your Name?</span>
        <LoginForm onSubmit={handleSubmit(onValid)}>
          <input {...register("username")} type="text" />
          <button>Login</button>
        </LoginForm>
      </LoginBox>
    </>
  );
}

export default Login;
