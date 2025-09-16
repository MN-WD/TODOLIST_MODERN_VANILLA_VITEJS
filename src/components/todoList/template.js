import "./styles.css";

export default function (todoList) {
    return `
    <section class="todoapp">
        <header class="header">
        <h1>todos</h1>
        <input
            class="new-todo"
            placeholder="What needs to be done?"
            autofocus
            onchange="window.todoList.addTodo(this);"
        />
        </header>
        <main class="main">
        <div class="toggle-all-container">
            <input class="toggle-all" type="checkbox" />
            <label class="toggle-all-label" for="toggle-all"
            >Mark all as complete</label
            >
        </div>
        <ul class="todo-list" role="todo-list">
            ${todoList.todos.map((todo) => todo.render()).join("")}
        </ul>
        </main>
        <footer class="footer">
        <span class="todo-count" role="todo-count">
        <span>${todoList.getItemsLeftCount()}</span> item(s) left
        </span>
        <ul class="filters">
            <li><a href="#/" class="selected">All</a></li>
            <li><a href="#/active">Active</a></li>
            <li><a href="#/completed">Completed</a></li>
        </ul>
        <button class="clear-completed">Clear completed</button>
        </footer>
    </section>
    <footer class="info">
        <p>Double-click to edit a todo</p>
        <p>Created by the TodoMVC Team</p>
        <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
    </footer>
    `;
}