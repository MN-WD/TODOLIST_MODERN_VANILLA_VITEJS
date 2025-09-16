import getTemplate from './template';
import Todo from "../todo/Todo";
import DB from '../../DB';

export default class TodoList {
    constructor (data) {
        this.domElt = document.querySelector(data.elt);
        this.newTodo = null;
        DB.setApiURL(data.apiURL);
        this.todos = [];
        this.loadTodos();
    }
    async loadTodos() {
        const todos = await DB.findAll();
        this.todos = todos.map((todo) => new Todo(todo));
        this.render();
    }
    render() {
        this.domElt.innerHTML = getTemplate(this);
    }

    getItemsLeftCount () {
        return this.todos.filter((todo) => !todo.completed).length;
    }

    addItemInTodos (data) {
        // Ajouter dans this.todos
        this.newTodo = new Todo(data);
        // this. au lieu de const pour l'utiliser dans d'autres fonctions
        this.todos.push(this.newTodo);
    }

    addItemInDOM () {
        // Ajouter son render dans le DOM
        // location.href = "?"; recharge la page mais pas d'intérêt
        const todoListElt = this.domElt.querySelector('[role="todo-list"]');
        const newLi = document.createElement("div");
        todoListElt.append(newLi);
        newLi.outerHTML = this.newTodo.render();
    }

    renderItemsLeftCount () {
        // Ajuster le nombre d'items restants
        this.domElt.querySelector('[role="todo-count"] span').innerText = this.getItemsLeftCount();
    }

    async addTodo(input) {
        // Ajouter dans la DB distante
        const todo = await DB.create(input.value);

        this.addItemInTodos(todo);
        this.addItemInDOM();
        this.renderItemsLeftCount();

        // Vider l'input
        input.value = "";
    }
}