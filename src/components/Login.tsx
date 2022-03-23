import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { usernameState } from "../atoms";
import { motion } from "framer-motion";
import { useState } from "react";

const LoginBox = styled.div`
  border: none;
  width: 500px;
  height: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  svg {
    width: 20px;
  }
`;
const LoginForm = styled.form`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  button {
    background-color: rgba(255, 255, 255, 0.5);
    border: none;
    border-top: 1px solid black;
    height: 30px;
    cursor: pointer;
    border-radius: 5px;
    margin-top: 2px;
    color: rgba(0, 0, 0, 0.7);
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      width: 15px;
      color: white;
    }
  }
  input {
    background-color: rgba(0, 0, 0, 0.7);
  }
`;

interface IForm {
  username: string;
}
const btnVariants = {
  normal: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  hover: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
};

function Login() {
  const setLoginUser = useSetRecoilState(usernameState);
  const { handleSubmit, register } = useForm<IForm>();
  const onValid = (data: any) => {
    setLoginUser(data);
    window.localStorage.setItem("login", JSON.stringify(data));
  };
  const [loginHover, setLoginHover] = useState(false);

  const toggleLoginHover = () => {
    setLoginHover((prev) => !prev);
  };

  return (
    <>
      <LoginBox>
        <motion.svg
          style={{ marginBottom: "10px" }}
          initial={{ fillOpacity: 0 }}
          animate={{ fillOpacity: 1 }}
          transition={{ type: "linear", duration: 1 }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="white"
            d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM164.1 325.5C158.3 318.8 148.2 318.1 141.5 323.9C134.8 329.7 134.1 339.8 139.9 346.5C162.1 372.1 200.9 400 255.1 400C311.1 400 349.8 372.1 372.1 346.5C377.9 339.8 377.2 329.7 370.5 323.9C363.8 318.1 353.7 318.8 347.9 325.5C329.9 346.2 299.4 368 255.1 368C212.6 368 182 346.2 164.1 325.5H164.1zM176.4 176C158.7 176 144.4 190.3 144.4 208C144.4 225.7 158.7 240 176.4 240C194 240 208.4 225.7 208.4 208C208.4 190.3 194 176 176.4 176zM336.4 240C354 240 368.4 225.7 368.4 208C368.4 190.3 354 176 336.4 176C318.7 176 304.4 190.3 304.4 208C304.4 225.7 318.7 240 336.4 240z"
          />
        </motion.svg>
        <span>What's Your Name?</span>
        <LoginForm onSubmit={handleSubmit(onValid)}>
          <motion.input {...register("username")} type="text" />
          <motion.button
            variants={btnVariants}
            initial={"normal"}
            whileHover={"hover"}
            onHoverStart={toggleLoginHover}
            onHoverEnd={toggleLoginHover}
          >
            {loginHover ? (
              <motion.svg
                layoutId="submit"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="white"
                  d="M344.7 238.5l-144.1-136C193.7 95.97 183.4 94.17 174.6 97.95C165.8 101.8 160.1 110.4 160.1 120V192H32.02C14.33 192 0 206.3 0 224v64c0 17.68 14.33 32 32.02 32h128.1v72c0 9.578 5.707 18.25 14.51 22.05c8.803 3.781 19.03 1.984 26-4.594l144.1-136C354.3 264.4 354.3 247.6 344.7 238.5zM416 32h-64c-17.67 0-32 14.33-32 32s14.33 32 32 32h64c17.67 0 32 14.33 32 32v256c0 17.67-14.33 32-32 32h-64c-17.67 0-32 14.33-32 32s14.33 32 32 32h64c53.02 0 96-42.98 96-96V128C512 74.98 469 32 416 32z"
                />
              </motion.svg>
            ) : (
              <motion.span layoutId="submit">입장</motion.span>
            )}
          </motion.button>
        </LoginForm>
      </LoginBox>
    </>
  );
}

export default Login;
