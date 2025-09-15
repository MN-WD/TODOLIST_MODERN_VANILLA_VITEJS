import getTemplate from './template';
import Todo from "../todo/Todo";
import DB from '../../DB';

export default class TodoList {
    constructor (data) {
        this.domElt = document.querySelector(data.elt);
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
}