import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import "./Todo.css";
import axios from 'axios';

const LOCAL_STORAGE_KEY = "react-todo-list-task";

const Todo = () => {
  const [todos, setTodos] = useState([]);

  const getData = () =>{
    axios.get("http://localhost:8080/")
    .then((res)=>{
      setTodos(res.data);
    }).catch((err)=>{
      console.log(err);
    })
  }

  useEffect(() => {
    getData()
  }, []);

  //create add todo arrow function
  const addTodo = (todo) => {
    console.log(todo.text)
    axios.post("http://localhost:8080/create",{
      text:todo.text
    })
    .then((res)=>{
      getData();
    }).catch((err)=>{
      console.log(err);
    })
  };

  //Create delete todo function
  const removeTodo = (id) => {
    axios.delete(`http://localhost:8080/${id}`)
    .then((res)=>{
      console.log("successfully deleted");
      getData();
    }).catch((err)=>{
      console.log(err);
    })
  };

  //create edit todo function
  const updateTodo = (todoId, newValue) => {
    console.log(newValue.text)
    axios.put(`http://localhost:8080/update/${todoId}`,{
      text: newValue.text
    })
    .then((res)=>{
      console.log("successfully deleted");
      getData();
    }).catch((err)=>{
      console.log(err);
    })
  };
  //create complete task 
  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <section className="main-container">
      <h1 className="todolist-header">TODO List</h1>
      <TodoForm onSubmit={addTodo} />
      <TodoList
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </section>
  );
};

export default Todo;
