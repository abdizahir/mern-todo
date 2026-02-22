import { useSelector } from "react-redux";

const DragHint = () => {
    const theme = useSelector((state) => state.theme.mode);
    return(
        <footer className="relative -top-22 text-center text-sm">
            <p className={`${theme === 'dark' ? "text-purple-300" : "text-gray-600"} font-light`}>Drag and drop to reorder list</p>
        </footer>
    );
}

export default DragHint;