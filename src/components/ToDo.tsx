import React from "react";
import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setToDos((oldToDos) => {
      const {
        currentTarget: { name },
      } = event;
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      //findindex = 안에서의 조건(반드시 function으로 표현해야함)을 만족하는 값의 index를 찾아줌
      //oldToDos에서 배열 값안에서 props로 들어온 id와 같은것을 찾아서 targetIndex에 저장함. ToDo.tsx는 {}...todo}값을 props로 받고 있음.
      const newToDo = { text, id, category: name as any };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
      //setToDos에 target이 되는 index값을 빼고, newToDo를 포함한 새로운 배열을 return함
    });
  };
  return (
    <li>
      <span>{text}</span>
      {category !== Categories.DOING && (
        //Categories.Doing이 아닐 때, &&다음을 수행함.
        <button name={Categories.DOING} onClick={onClick}>
          Doing
        </button>
        //원래 function에 인자를 넘기기 위해서는 onClick={()=>onClick("DOING")}이런 식으로 해야함.
        //바로 onClick={onClick}을 넣기 위해 name을 설정하고 event : React.~~Event<~~Element>를 사용함
      )}
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO} onClick={onClick}>
          To Do
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={onClick}>
          Done
        </button>
      )}
    </li>
  );
}

export default ToDo;
