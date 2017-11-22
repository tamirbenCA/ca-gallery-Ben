console.log('Todos');

var gTodos;


function initPage() {
    gTodos = getTodos();
    renderTodos(gTodos)
}


function getTodos() {
    var todos = [];

    todos.push(getTodo('Style with Flexbox'));
    todos.push(getTodo('Master your HTML'));
    todos.push(getTodo('Practice Array Extras'));

    return todos;
}



function getTodo(txt) {
    return {
        txt: txt,
        isDone: false
    }
}


function renderTodos(gTodos) {
    var elTodos = document.querySelector('.todos');
    var strHtmls = '';

    // Even better with Map
    gTodos.forEach(function (todo, idx) {
        var strHtml = `
                <li>
                  <input type="checkbox" id="c${idx}" onchange="toggleTodo(${idx})" ${(todo.isDone) ? 'checked' : ''}/>
                  <label for="c${idx}"><span></span>${todo.txt}</label>
                  <button type="button" class="deleteTodo" onclick="deleteTodo(${idx})">🗑</button>
                </li>
        `
        strHtmls += strHtml
    });
    elTodos.innerHTML = strHtmls;

}


function toggleTodo(idx) {
    gTodos[idx].isDone = !gTodos[idx].isDone;
}


function addNewTodo() {
    // console.log('adding')
    var elTodo = document.querySelector('#newTodo');
    gTodos.push(getTodo(elTodo.value));
    renderTodos(gTodos);
}


function deleteTodo(idx) {
    // console.log('delete')
    gTodos.splice(idx, 1);
    renderTodos(gTodos);
}


function filterList(filter) {
    switch (filter) {
        case 'all':
            renderTodos(gTodos);
            break;
        
        case 'active':
            renderTodos(gTodos.filter(function(todo) {
                return todo.isDone === false;
            }));
            break;

        case 'done':
            renderTodos(gTodos.filter(function(todo) {
                return todo.isDone === true;
            }));
            break;
    }
}


function goBack() {
    window.history.back();
}
