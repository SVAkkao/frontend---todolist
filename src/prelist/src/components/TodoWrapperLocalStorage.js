import React, {useState, useEffect} from 'react'
import { TodoForm } from './TodoForm'
import { v4 as uuidv4 } from 'uuid';
import { Todo } from './Todo';
import { EditTodoForm } from './EditTodoForm';

uuidv4();

export const TodoWrapperLocalStorage = () => {
    const [todos, setTodos] = useState([])

    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
        setTodos(savedTodos);
    }, []);

    const addTodo = todo => {
        const newTodos = [...todos, {id: uuidv4(), task: todo, completed: false, isEditing: false}];
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }

    const toggleComplete = id => {
        const newTodos = todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo);
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }

    const deleteTodo = id => {
        const newTodos = todos.filter(todo => todo.id !== id);
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }

    const editTodo = id => {
        setTodos(todos.map(todo => todo.id === id ? {...todo, isEditing: !todo.isEditing} : todo))
    }

    const editTask = (task, id) => {
        const newTodos = todos.map(todo => todo.id === id ? {...todo, task, isEditing: !todo.isEditing} : todo);
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }
    const generateTravelList = () => {
        const travelList = [
          { id: uuidv4(), task: "護照", completed: false, isEditing: false },
          { id: uuidv4(), task: "機票", completed: false, isEditing: false },
          { id: uuidv4(), task: "旅遊保險", completed: false, isEditing: false },
          { id: uuidv4(), task: "備用現金", completed: false, isEditing: false },
          { id: uuidv4(), task: "換好外幣", completed: false, isEditing: false },

            
        ];
        setTodos([...todos, ...travelList]);
      };
      const TravelButton = ({ generateTravelList, className }) => (
        <button onClick={generateTravelList} className={className}>生成出國所需清單</button>
      );
      return (
  <div className="TodoWrapper">
    <h1>行前清單</h1>
    <TodoForm addTodo={addTodo} />
    <TravelButton generateTravelList={generateTravelList} className="TravelButton" />
    {/* display todos */}
    {todos.map((todo) =>
      todo.isEditing ? (
        <EditTodoForm editTodo={editTask} task={todo} />
      ) : (
        <Todo
          key={todo.id}
          task={todo}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
          toggleComplete={toggleComplete}
        />
      )
    )}
  </div>
);
    };


