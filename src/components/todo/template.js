import "./styles.css";

export default function (todo) {
  return `
    <li data-id="${todo.id}" class="${todo.completed ? "completed" : ""}">
      <div class="view">
        <input class="toggle" type="checkbox" ${
          todo.completed ? "checked" : ""
        }
        onchange="window.todoList.toggleCompletedOneById(${todo.id}); this.checked" />
        <label ondblclick="this.closest('li').classList.toggle('editing')">${
          todo.content
        }</label>
        <button class="destroy" onclick="window.todoList.deleteOneById(${
          todo.id
        })"></button>
      </div>
      <input class="edit" value="${
        todo.content
      }" onchange="window.todoList.updateOneById(${todo.id}, this.value)" />
    </li>
  `;
}