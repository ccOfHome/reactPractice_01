import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import TodoList from './TodoList'

//挂载组件   JSX语法(引入react)
//JSX语法中，如果我们要使用自己的创建的组件，开头字母大写
//ReactDOM.render(<App />,document.getElementById('root'));

ReactDOM.render(<TodoList />,document.getElementById('root'));