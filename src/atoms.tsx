import { atom, selector } from "recoil";

const getTodo = window.localStorage.getItem("Todooos");
const parsedTodo = JSON.parse(getTodo as any);
const savedCategory = localStorage.getItem("Cate-text");
const parsedCategory = JSON.parse(savedCategory as any);

export interface IToDo {
  text: string;
  id: number;
  category: string;
}
export interface ICate {
  text: string;
  id: number;
}

export const categoryState = atom({
  key: "category",
  default: "TO_DO",
});

export const categoriesState = atom<ICate[]>({
  key: "Addcategories",
  default: parsedCategory === null ? [] : parsedCategory,
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: parsedTodo === null ? [] : parsedTodo,
});
//

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    //toDoState atom에서 값을 가져옴
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
    //filter안의 조건에 맞는 내용만 남김
    //같은 것의 각기 다른 결과의 filter값을 return할 때, 값을 가져올려면 배열을 열고 각각 순서대로 이름을 지정하면 된다.
    /*  ex) 
        toDos.filter((toDo) => toDo.category === "TO_DO"),
        toDos.filter((toDo) => toDo.category === "DOING"),
        toDos.filter((toDo) => toDo.category === "DONE"),
        const [toDo, doing, done] = useRecoilValue(toDoSelector); */
  },
});
//selector를 사용하여, 카테고리별로 분류할 수 있음. atom의 output의 형태를 변형하는 것
