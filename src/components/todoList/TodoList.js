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

    deleteOneByIdFromTodos(id){
        const index = this.todos.findIndex((todo) => todo.id === id);
        this.todos.splice(index, 1); // normalement 3 éléments (replace) mais si on met 2 c'est un delete
    }

    deleteOneByIdFromDOM(id) {
        this.domElt.querySelector("[data-id='" + id + "']").remove();
        // querySelector("[data-id='2']") = exemple syntaxe ou ="${id}"
    }

    async deleteOneById (id) {
        // Supprime de la DB
        const resp = await DB.deleteOneById(id);
        console.log(resp);

        if (resp.ok) {
            // Supprime des todos
            this.deleteOneByIdFromTodos(id);
            // Supprime du DOM
            this.deleteOneByIdFromDOM(id);
            // Rerenderer le itemsLeftCount
            this.renderItemsLeftCount();
        }
    }

    async toggleCompletedOneById (id) {
        const todo = this.todos.find((todo) => todo.id == id);
        // find renvoie tout le tiroir qu'il trouve
        todo.completed = !todo.completed;

        // Je modifie dans la DB
        const resp = await DB.updateOne(id);

        // Je modifie la todo
        // Je modifie le DOM
        this.domElt.querySelector(`[data-id="${id}"]`).classList.toggle("completed");

        // Rerender de l'itemsLeftCount
        this.renderItemsLeftCount();
    }

    async updateOneById (id, content) {
        // On change le todo
        const todo = this.todos.find((todo) => todo.id == id);
        todo.content = content;
        // ^ on modifie dans le tableau todos le content

        // On modifie la DB
        const resp = await DB.updateOne(todo);

        // On modifie le DOM
        this.domElt.querySelector(`[data-id="${id}"]`).classList.remove("editing");
        this.domElt.querySelector(`[data-id="${id}"] label`).innerText = todo.content;
    }
}

// const machin = this.todos.filter(function(tiroir) {
//  return tiroir.completed === true;
// }); => on fait un sous tableau indexé de ce qu'on a filtré (les todos dont le completed = true)
// On peut rendre une fonction anonyme en fléchée et on peut enlever le return donc pas d'accolades
// this.todos.filter((todo) => todo.completed === true);

// find = on prend un élément
// findIndex = on prend le numéro du tiroir de cet élément
// même explication que filter pour écriture