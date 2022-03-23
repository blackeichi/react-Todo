import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  categoryState,
  categoriesState,
  toDoSelector,
  usernameState,
} from "../atoms";
import CreateToDo from "./CreateToDo";
import Login from "./Login";
import ToDo from "./ToDo";
import { motion } from "framer-motion";

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(150deg, #5f0a87, #a4508b);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ToDoPaper = styled.div`
  color: black;
  width: 400px;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const CateForm = styled.div`
  border: none;
  margin-bottom: 50px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Catebutton = styled(motion.button)`
  position: absolute;
  top: 22px;
  right: 0;
`;

let Catetext = [] as any;

interface IForm {
  Addcategories: string;
}

function ToDoList() {
  const getUsername = useRecoilValue(usernameState);
  const savedCategory = localStorage.getItem("Cate-text");
  const parsedCategory = JSON.parse(savedCategory as any);
  Catetext = parsedCategory === null ? [] : parsedCategory;
  const setLocalCategory = () =>
    localStorage.setItem("Cate-text", JSON.stringify(Catetext));
  const toDos = useRecoilValue(toDoSelector);
  const AddCategories = useRecoilValue(categoriesState);
  const setAddCategories = useSetRecoilState(categoriesState);
  const [category, setCategory] = useRecoilState(categoryState);
  //== useRecoilValue와 useSetRecoilState을 같이 쓰는 것과 같다.
  const { handleSubmit, register, setValue } = useForm<IForm>();
  const onValid = ({ Addcategories }: IForm) => {
    setAddCategories((oldcate) => [
      { text: Addcategories, id: Date.now() },
      ...oldcate,
    ]);
    //이전데이터 + Addcategories를 한다.
    setValue("Addcategories", "");
    //값 초기화
    const newCate = {
      text: Addcategories,
      id: Date.now(),
    };
    Catetext.push(newCate);
    setLocalCategory();
  };
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
    //선택한 select option값에따라 atom의 category값이 변하고, selector를 이용하여 atom의 category값과 todo.category의 값이 같은 것만 출력됨
  };
  //------------------------------------------------------------
  const onClick = () => {
    window.localStorage.setItem("login", null as any);
    window.location.reload();
  };
  //----------------------------------
  const [clickAdd, setClick] = useState(false);
  const toggleClick = () => {
    setClick(true);
  };
  return (
    <>
      <Wrapper>
        {getUsername === null ? (
          <Login />
        ) : (
          <>
            <div
              style={{
                fontSize: "25px",
                fontWeight: "700",
                border: "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                width: "300px",
                marginBottom: "30px",
              }}
            >
              <span>Welcome! "{getUsername.username}"</span>
              <motion.button
                style={{
                  height: "30px",
                  border: "none",
                  backgroundColor: "inherit",
                  color: "#A0AFFF",
                  fontWeight: "300",
                }}
                onClick={onClick}
                whileHover={{ scale: 1.2, fontWeight: "800" }}
              >
                Log Out
              </motion.button>
            </div>

            <CateForm>
              <motion.button
                onClick={toggleClick}
                animate={{
                  x: clickAdd ? 70 : 0,
                  display: clickAdd ? "none" : "block",
                }}
                exit={{ display: clickAdd ? "none" : "flex" }}
                transition={{ type: "just" }}
                style={{
                  position: "absolute",
                  top: "22px",
                  width: "30px",
                }}
              >
                +
              </motion.button>
              <h1>Crate new category</h1>
              <form>
                <motion.input
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: clickAdd ? 1 : 0 }}
                  onSubmit={handleSubmit(onValid)}
                  {...register("Addcategories")}
                />
                <Catebutton
                  initial={{ scaleX: 0 }}
                  animate={{ x: clickAdd ? 0 : -70, scaleX: clickAdd ? 1 : 0 }}
                >
                  Add
                </Catebutton>
              </form>
            </CateForm>
            <div style={{ border: "none", margin: 0, display: "flex" }}>
              <h1 style={{ marginRight: "10px" }}>Create new schedule </h1>
              <select value={category} onInput={onInput}>
                <option value={"TO_DO"}>To Do</option>
                <option value={"DOING"}>Doing</option>
                <option value={"DONE"}>Done</option>
                {AddCategories?.map((addcate) => (
                  <option key={addcate.id} value={addcate.text}>
                    {addcate.text}
                  </option>
                ))}
              </select>
            </div>
            <CreateToDo />
            <ToDoPaper>
              <h1 style={{ marginBottom: "20px" }}>{category} List</h1>
              {toDos?.map((toDo) => (
                <ToDo key={toDo.id} {...toDo} />
              ))}
            </ToDoPaper>
          </>
        )}
      </Wrapper>
    </>
  );
}

export default ToDoList;
