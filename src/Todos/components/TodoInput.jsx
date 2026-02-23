import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../store/todoSlice";
import { useState } from "react";

const TodoInput = () => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);

  const handleAdd = async () => {
    const text = inputValue.trim();
    if (!text) return;
    try {
      await dispatch(addTodo(text)).unwrap();
      setInputValue("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAdd();
  };

  return (
    <section className="mx-6 mt-4">
      <article id="input" className="relative mb-6 sm:w-135.25 sm:mx-auto">
        <input
          type="text"
          aria-label="add todo"
          placeholder="Create a new todo…"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className={`w-full py-3 pl-12 pr-5 text-gray-600 ${
            theme === "dark" ? "bg-navy-900" : "bg-white"
          } text-prest1 outline-none focus:ring-2 focus:ring-[#C058F3] rounded-md`}
        />
        <span
          className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border ${
            theme === "dark" ? "border-purple-800" : "border-purple-300"
          }`}
        ></span>
      </article>
    </section>
  );
};

export default TodoInput;