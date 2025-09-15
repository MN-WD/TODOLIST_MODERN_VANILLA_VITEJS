import "./styles.css";

export default function (todo) {
  return `
    <li data-id="1" class="${todo.completed ? "completed" : ""}">
            <div class="view">
              <input class="toggle" type="checkbox" ${
                todo.completed ? "checked" : ""
              } />
              <label>${todo.content}</label>
              <button class="destroy"></button>
            </div>
          </li>
  `;
}