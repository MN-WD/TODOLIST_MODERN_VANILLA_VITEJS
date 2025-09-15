import './styles.css';

export default function (todoList) {
    // on peut faire une fonction anonyme, on donne un nom dans le fichier TodoList.js
    return `
        <h1>Ma TodoList</h1>
        <ul class="todolist">
            ${ todoList.todos.map((todo) => todo.render()).join('') }
        </ul>
    `;
}