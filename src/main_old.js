class DB {
  // static = propriété/méthode liée à la classe et pas aux occurences de la classe
  // setApiURL sert à définir
  static setApiURL (data) {
    this.apiURL = data;
  }
  // on initialise la propriété setApiURL
  // sans static on doit créer new ...
  static async findAll() {
    const response = await fetch(this.apiURL + "todos");
    // url dans new TodoList + todos (avec fetch)
    return response.json();
    // findAll renvoie un tableau indexé d'objets littéraux
  }
}

function getTodoTemplate(todo) {
  return `<li class="todo">${todo.content}</li>`;
}

class Todo {
  constructor (data) {
    // data = todo entre parenthèses (new Todo(todo))
    this.id = data.id;
    this.content = data.content;
    this.completed = data.completed;
    this.created_at = data.created_at;
  }
  render() {
    return getTodoTemplate(this);
  }
}

function getTodoListTemplate(todoList) {
  // on map sur la propriété todos, donc todoList.todos.map
  return `
    <h1>Ma todoList</h1>
    <ul class="todolist">
      ${ todoList.todos.map(todo => todo.render()).join('') }
    </ul>
  `;
}

class TodoList {
  constructor(data) {
    // this = objet qui en découle
    this.domElt = document.querySelector(data.elt);
    DB.setApiURL(data.apiURL);
    // on lance la méthode et on lui balance en data l'url de mockapi qu'on utilise dans findAll this.apiURL
    this.todos = [];
    // on met le tableau indexé d'objets littéraux du findAll dans todos, mais ça ne nous arrange pas => on fait une class Todo (au-dessus)
    this.loadTodos();
  }
  async loadTodos() {
    // Je mets dans this.todos des objets de type Todo
    const todos = await DB.findAll(); // va être un tableau indexé d'objets littéraux, on peut faire un map pour avoir des new Todo (on a mis await dans todos ici)
    this.todos = todos.map(todo => new Todo(todo)); // on transforme les objets de notre tableau en objets de type Todo
    // Clique dessus pour voir quels todo/todos sont associés
    this.render();
  }
  render() {
    // on fait un render pour chaque todo de notre tableau d'objets de type Todo + join pour ne pas avoir les virgules du map
    this.domElt.innerHTML = getTodoListTemplate(this);
    // On fait appel à la fonction, on lui envoie la todolist
  }
}

new TodoList({
  elt: '#app',
  apiURL: 'https://68ad955ba0b85b2f2cf3e265.mockapi.io/'
});