import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import {database} from '../Config/Firebase-config'


const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Real-time listener to fetch data from Firestore
    const unsubscribe = onSnapshot(collection(database, "todos"), (snapshot) => {
      setTodos(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    });

    return () => unsubscribe();
  }, []);

  const addTodo = async (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    await addDoc(collection(database, "todos"), {
      text: todo.text,
      isComplete: false
    });
  };

  const updateTodo = async (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    const todoDoc = doc(database, "todos", todoId);
    await updateDoc(todoDoc, { text: newValue.text });
  };

  const removeTodo = async (id) => {
    const todoDoc = doc(database, "todos", id);
    await deleteDoc(todoDoc);
  };

  const completeTodo = async (id) => {
    const todoDoc = doc(database, "todos", id);
    const todo = todos.find(todo => todo.id === id);
    await updateDoc(todoDoc, { isComplete: !todo.isComplete });
  };

 

  return (
    <div>
      <h1>What's the plan for today?</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo 
        todos={todos}
        completeTodo={completeTodo} 
        removeTodo={removeTodo} 
        updateTodo={updateTodo}
      />
    </div>
  );
}

export default TodoList;
