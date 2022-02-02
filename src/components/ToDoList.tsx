import React from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  Categories,
  categoryState,
  categoriesState,
  toDoSelector,
} from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

interface IForm {
  Addcategories: string;
}

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const AddCategories = useRecoilValue(categoriesState);
  const setAddCategories = useSetRecoilState(categoriesState);
  const [category, setCategory] = useRecoilState(categoryState);
  const { handleSubmit, register, setValue } = useForm<IForm>();
  const onValid = ({ Addcategories }: IForm) => {
    setAddCategories((oldcate) => [{ text: Addcategories }, ...oldcate]);
    setValue("Addcategories", "");
  };
  const Catetext = [] as any;
  AddCategories?.map((categoryee) => Catetext.push(categoryee.text));
  localStorage.setItem("Catetext", JSON.stringify(Catetext));
  const savedCategory = localStorage.getItem("Catetext") as any;
  if (savedCategory !== null) {
    const parsedCategory = JSON.parse(savedCategory);
  }
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  return (
    <div>
      <h1>Crate new category</h1>
      <form onSubmit={handleSubmit(onValid)}>
        <input {...register("Addcategories")} placeholder="Create category" />
        <button>Add</button>
      </form>
      <h1>To Dos</h1>
      <hr />
      <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
        {JSON.parse(savedCategory)?.map((addcate: string | undefined) => (
          <option value={addcate}>{addcate}</option>
        ))}
      </select>
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}

export default ToDoList;
