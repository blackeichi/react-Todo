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

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(150deg, #5f0a87, #a4508b);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CateForm = styled.form`
  margin-bottom: 50px;
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
  const [login, setLogin] = useState(false);

  return (
    <Wrapper>
      {getUsername === null ? (
        <Login />
      ) : (
        <>
          <CateForm>
            <h1>Crate new category</h1>
            <form onSubmit={handleSubmit(onValid)}>
              <input
                {...register("Addcategories")}
                placeholder="Create category"
              />
              <button>Add</button>
            </form>
          </CateForm>
          <h1>To Dos</h1>
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
          <CreateToDo />
          {toDos?.map((toDo) => (
            <ToDo key={toDo.id} {...toDo} />
          ))}
        </>
      )}
    </Wrapper>
  );
}

export default ToDoList;
