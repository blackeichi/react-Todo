import { motion } from "framer-motion";
import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoriesState, IToDo, toDoState } from "../atoms";

const getToDo = window.localStorage.getItem("Todooos");
let parsedTodo = JSON.parse(getToDo as any);

const Trashbin = styled(motion.div)`
  height: 30px;
  width: 30px;
  margin-left: 10px;
  cursor: pointer;
  background-image: url("https://img.freepik.com/free-vector/trashcan-icon-pixel-art_505135-90.jpg");
  background-size: cover;
`;
const btnVariants = {
  hover: {
    backgroundColor: "rgba(255, 255, 255, 0.6)",
  },
};
function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const categories = useRecoilValue(categoriesState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setToDos((oldToDos) => {
      const {
        currentTarget: { value },
      } = event;
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      //findindex = 안에서의 조건(반드시 function으로 표현해야함)을 만족하는 값의 index를 찾아줌
      //oldToDos에서 배열 값안에서 props로 들어온 id와 같은것을 찾아서 targetIndex에 저장함. ToDo.tsx는 {}...todo}값을 props로 받고 있음.
      const newToDo = { text, id, category: value as any };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
      //setToDos에 target이 되는 index값을 빼고, newToDo를 포함한 새로운 배열을 return함
    });
  };
  const getToDos = useRecoilValue(toDoState);
  window.localStorage.setItem("Todooos", JSON.stringify(getToDos));
  const onClick = (event: any) => {
    const div = event.target.parentElement;
    const li = div.parentElement;
    parsedTodo = parsedTodo.filter(
      (todo: any) => parseInt(todo.id) !== parseInt(li.id)
    );
    localStorage.removeItem("Todooos");
    localStorage.setItem("Todooos", JSON.stringify(parsedTodo));
    console.log(parsedTodo);
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      console.log(targetIndex);
      if (targetIndex === 0) {
        return [...oldToDos.slice(targetIndex + 1)];
      } else {
        return [
          ...oldToDos.slice(0, targetIndex),
          ...oldToDos.slice(targetIndex + 1),
        ];
      }
    });
  };
  return (
    <li
      id={String(id)}
      style={{
        width: "100%",
        display: "flex",
      }}
    >
      <div
        style={{
          border: "none",
          width: "90%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "40px",
        }}
      >
        <span style={{ marginRight: "10px" }}>{text}</span>
        <select value={category} onInput={onInput}>
          {
            //ToDoList에서 받아온 todo를 { text, category, id } 로 받음
          }
          <option value={"TO_DO"}>To Do</option>
          <option value={"DOING"}>Doing</option>
          <option value={"DONE"}>Done</option>
          {categories?.map((cate: any) => (
            <option key={cate.id} value={cate.text}>
              {cate.text}
            </option>
          ))}
        </select>
        <Trashbin
          variants={btnVariants}
          whileHover={"hover"}
          onClick={onClick}
        ></Trashbin>
        {
          //Categories.Doing이 아닐 때, &&다음을 수행함.
          //원래 function에 인자를 넘기기 위해서는 onClick={()=>onClick("DOING")}이런 식으로 해야함.
          //바로 onClick={onClick}을 넣기 위해 name을 설정하고 event : React.~~Event<~~Element>를 사용함
        }
      </div>
    </li>
  );
}

export default ToDo;
