import { useSelector, useDispatch } from "react-redux";
import { setFilter } from "../store/todoSlice";

const FilterTabs = () => {
    const theme = useSelector((state) => state.theme.mode);
    const filter = useSelector((state) => state.todos.filter) ;
    const dispatch = useDispatch();

    const btnClass = (name) =>
      `px-3 py-1 rounded cursor-pointer ${filter === name ? "font-bold text-blue-500" : "text-purple-300"} ${theme === 'dark' ? 'hover:text-white' : 'hover:text-black'}`;
    return (
        <section className="mx-6 sm:m-auto sm:w-135.25 h relative -top-26">
             <div className={`mt-5 h-12 sm:w-135.25 sm:mx-auto p-5 rounded-lg text-preset-2-bold flex items-center justify-center gap-4 font-bold ${theme === 'dark' ? 'bg-navy-900' : 'bg-white shadow-lg'}`}>
                    <button className={btnClass('all')} onClick={() => dispatch(setFilter('all'))}>All</button>
                    <button className={btnClass('active')} onClick={() => dispatch(setFilter('active'))}>Active</button>
                    <button className={btnClass('completed')} onClick={() => dispatch(setFilter('completed'))}>Completed</button>
                </div>
        </section>
    );
}

export default FilterTabs;