import '../styles/index.scss';

if (process.env.NODE_ENV === 'development') {
  require('../index.html');
}

console.log('webpack starterkit');

$(function() {

  let addMessage = document.querySelector('.message'),
      addButton = document.querySelector('.add'),
      todo = document.querySelector('.todo')

  let todoList = [];

  if(localStorage.getItem('todo')){
    todoList = JSON.parse(localStorage.getItem('todo'));
    displayMessages();
  }

  addButton.addEventListener('click', (e) => {
    e.preventDefault();

    let newTodo = {
      todo: addMessage.value,
      checked: false,
      important: false,
    }

    todoList.push(newTodo);
    displayMessages();
    localStorage.setItem('todo', JSON.stringify(todoList));
  });

  function displayMessages(){
    let displayMessage = '';

    if(todoList.length == 0) {
      todo.innerHTML = '';
    }

    todoList.forEach(function(element, i){
        displayMessage += `
          <li>
            <input type='checkbox' id='item_${i}' ${element.checked ? 'checked': ''}>
            <label for='item_${i}' class="${element.important ? 'important' : ''}">${element.todo}</label>
          </li>
        `;
        todo.innerHTML = displayMessage;
    });
  }

  todo.addEventListener('change', (e) => {
    let IdInput = e.target.getAttribute('id');
    let valueLabel =  todo.querySelector('[for=' + IdInput + ']').innerHTML;
    
    todoList.forEach(function(item){
      if(item.todo === valueLabel) {
        item.checked = !item.checked;
        localStorage.setItem('todo', JSON.stringify(todoList));
      }
    });
  })

  todo.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    todoList.forEach( function(item, idx){
      if(item.todo === e.target.innerHTML) {
        if(e.ctrlKey || e.metaKey) {
          todoList.splice(idx, 1);
          console.log(1)
        } else {
          item.important = !item.important;
        }
        displayMessages();
        localStorage.setItem('todo', JSON.stringify(todoList));
      }
    });
  })

  // $("._1").on("click","a", function (event) {
  //   event.preventDefault();
  //   var id  = $(this).attr('href'),
  //       top = $(id).offset().top;
  //   $('body,html').animate({scrollTop: top}, 1500);
  // });


  // $('.popup').magnificPopup();

});