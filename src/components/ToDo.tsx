import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoriesState, IToDo, toDoState } from "../atoms";

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
    const li = event.target.parentElement;
    console.log(li);
    parsedTodo = parsedTodo.filter(
      (todo: any) => parseInt(todo.id) !== parseInt(li.id)
    );
    li.remove();
    localStorage.removeItem("Todooos");
    localStorage.setItem("Todooos", JSON.stringify(parsedTodo));
  };

  return (
    <li id={String(id)}>
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
      <button onClick={onClick}>Delete</button>
      {
        //Categories.Doing이 아닐 때, &&다음을 수행함.
        //원래 function에 인자를 넘기기 위해서는 onClick={()=>onClick("DOING")}이런 식으로 해야함.
        //바로 onClick={onClick}을 넣기 위해 name을 설정하고 event : React.~~Event<~~Element>를 사용함
      }
    </li>
  );
}

export default ToDo;

//체크박스를 만들어서 삭제 후, 새로고침할 수 있도록 하자.
