import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoriesState, IToDo, toDoState } from "../atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const getToDo = window.localStorage.getItem("Todooos");
let parsedTodo = JSON.parse(getToDo as any);

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
    const svg = event.target.parentElement;
    const li = svg.parentElement;
    console.log(li.id);
    parsedTodo = parsedTodo.filter(
      (todo: any) => parseInt(todo.id) !== parseInt(li.id)
    );
    li.remove();
    localStorage.removeItem("Todooos");
    localStorage.setItem("Todooos", JSON.stringify(parsedTodo));
    console.log(parsedTodo);
    /*     setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      console.log(typeof targetIndex);
      if (targetIndex === 0) {
        return [];
      } else {
        return [
          ...oldToDos.slice(0, targetIndex),
          ...oldToDos.slice(targetIndex + 1),
        ];
      }
    }); */
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
        {" "}
        <span>{text}</span>
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
        <svg
          onClick={onClick}
          style={{ height: "22px", marginLeft: "10px", cursor: "pointer" }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path
            fill="#A96EAD"
            d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z"
          />
        </svg>
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
