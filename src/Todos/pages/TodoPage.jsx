
import BackgroundHeader from "../components/BackgroundHeader";
import FilterTabs from "../components/FilterTabs";
import TodoCard from "../components/TodoCard";
import TodoInput from "../components/TodoInput";
import DragHint from "../components/DragHint";

const TodoPage = () => {
  return (
    <>
      <BackgroundHeader />
      <TodoInput />
      <TodoCard />
      <FilterTabs />
      <DragHint />
    </>
  );
};

export default TodoPage;
