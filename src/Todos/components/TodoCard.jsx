import React, {  useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import { useSelector, useDispatch } from "react-redux";
import { fetchTodos, deleteTodo, toggleTodo, clearCompletedTodos, reorderTodos } from "../store/todoSlice";

const TodoCard = () => {
  const theme = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();

  const {allTodos: todos, filter, isLoading} = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(fetchTodos(filter));
  }, [dispatch, filter]);

  const handleDelete = (id) => dispatch(deleteTodo(id));
  const handleToggle = (item) => {
    dispatch(toggleTodo({id: item._id, completed: !item.completed}));
  }

const checkClass =
    "bg-[linear-gradient(to_right,#55DDFF,#C058F3),linear-gradient(to_bottom,#3710BD,#A42395)]";
  const circleClass =
    theme === "dark" ? "border border-purple-800" : "border border-purple-300";
  const completeClass = "line-through text-purple-700";

  const onDragEnd = (result) => {
    if (!result.destination) return;
    if (result.destination.index === result.source.index) return;

    dispatch(
      reorderTodos({
        sourceIndex: result.source.index,
        destinationIndex: result.destination.index,
      })
    );
  };


  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="todo">
          {(provided) => (
            <ul
              className={`rounded-lg rounded-bl-none rounded-br-none sm:w-135.25 sm:m-auto ${theme === "dark" ? "bg-navy-900" : "bg-white"} mx-6 relative -top-26`}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {isLoading ? (
                <li className="h-24 flex items-center justify-center">
                <div
                  className={`w-6 h-6 rounded-full border-2 border-t-transparent animate-spin ${
                    theme === "dark" ? "border-purple-300" : "border-purple-700"
                  }`}
                />
              </li>
              ) : (
                todos.map((item, index) => (
                <Draggable
                  key={item._id}
                  draggableId={String(item._id)}
                  index={index}
                >
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="text-preset-3 h-12"
                    >
                      <div className="relative py-5 flex items-center justify-between px-5">
                        <span
                          className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full cursor-pointer hover:border-blue-500 ${item.completed ? checkClass : circleClass}`}
                          onClick={() => handleToggle(item)}
                        >
                          {item.completed && (
                            <img
                              src="images/icon-check.svg"
                              className="absolute left-1.75 top-1/2 -translate-y-1/2 w-1.75 h-1.25 rounded-full"
                            />
                          )}
                        </span>

                        <span
                          className={`ml-8 ${item.completed ? completeClass : "text-purple-700"}`}
                        >
                          {item.text}
                        </span>
                        <button
                          className="pr-3"
                          onClick={() => handleDelete(item._id)}
                        >
                          <img
                            src="images/icon-cross.svg"
                            className="w-[11.79px] h-[11.79px]"
                          />
                        </button>
                      </div>
                      <hr
                        className={`border-0 h-px ${theme === "dark" ? "bg-purple-800" : "bg-purple-300"} w-full`}
                      />
                    </li>
                  )}
                </Draggable>
              ))
              )}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>

      <section
        className={`rounded-lg rounded-tl-none rounded-tr-none sm:w-135.25 sm:m-auto ${theme === "dark" ? "bg-navy-900" : "bg-white"} mx-6 relative -top-26`}
      >
        <div
          className={`p-5 text-preset-3 text-purple-600 flex items-center justify-between`}
        >
          <span className="">
            <span className="font-bold">{todos.length}</span> items left
          </span>
          <button onClick={() => dispatch(clearCompletedTodos())}>
            <span className="">Clear Completed</span>
          </button>
        </div>
      </section>
    </>
  );
};

export default TodoCard;
