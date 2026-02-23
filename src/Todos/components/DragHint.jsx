import { useSelector } from "react-redux";

const DragHint = () => {
  const theme = useSelector((state) => state.theme.mode);

  return (
    <footer className="mt-4 text-center text-sm pb-4">
      <p
        className={`${
          theme === "dark" ? "text-purple-300" : "text-gray-600"
        } font-light`}
      >
        Drag and drop to reorder list
      </p>
    </footer>
  );
};

export default DragHint;