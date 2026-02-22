import { useSelector } from "react-redux";
import BackgroundHeader from "../components/BackgroundHeader";
import FilterTabs from "../components/FilterTabs";
import TodoCard from "../components/TodoCard";
import TodoInput from "../components/TodoInput";
import DragHint from "../components/DragHint";

const TodoPage = () => {
  const theme = useSelector((state) => state.theme.mode);
  const bgTheme = theme === 'dark' ? "bg-navy-950" : "bg-purple-300";
  return (
    <main className={`h-screen ${bgTheme}`}>
      <BackgroundHeader />
      <TodoInput />
      <TodoCard />
      <FilterTabs />
      <DragHint />
    </main>
  );
};

export default TodoPage;
