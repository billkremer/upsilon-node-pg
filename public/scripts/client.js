// doc ready function
$(function(){
  console.log('document loaded');

  getBooks();

  // listen for a submit event on the form
  $('#book-form').on('submit', addBook);
});

function getBooks() {
  $.ajax({
    url: '/books',
    type: 'GET',
    success: displayBooks
  });
}

function displayBooks(books) {
  console.log('Got books from the server', books);

  $('#book-list').empty();

  books.forEach(function(book){
    var $li = $('<li></li>');

    var $form = $('<form></form>');

    $form.append('<input type = "text" name="title" value="' + book.title + '"/>');
    $form.append('<input type = "text" name="author" value="' + book.author + '"/>');

    var date = new Date(book.publication_date).toISOString().slice(0,10);
    // yyyy-mm-ddTxxxxxxx

    $form.append('<input type = "date" name="published" value="' + date + '"/>');
    $form.append('<input type = "text" name="edition" value="' + book.edition + '"/>');
    $form.append('<input type = "text" name="publisher" value="' + book.publisher + '"/>');


    // $li.append('<p><strong>' + book.title + '</strong></p>');
    // $li.append('<p>Written by: <em>' + book.author + '</em></p>');
    //
    // var date = new Date(book.publication_date).toDateString();
    // $li.append('<p>Publication Date: <time>' + date + '</time></p>');
    //
    // $li.append('<p> Edition: ' + book.edition + '</p>');
    // $li.append('<p> Published by: ' + book.publisher + '</p>');

    var $button = $('<button class="save">Save</button>');
    $button.data('id',book.id);
    $form.append($button);

    $li.append($form);
    $('#book-list').append($li);

    $('#book-list').on('click','.save', updateBook);

  });
}

function updateBook(event) {
  event.preventDefault();


  var $button = $(this);
  var $form = $button.closest('form');
  // get the info out of the form
  var data = $form.serialize();

  // send data to server
  $.ajax({
    url: '/books/' + $button.data('id'),
    type: 'PUT',
    data: data,
    success: getBooks
  });
}



function addBook(event) {
  // prevent browser from refreshing
  event.preventDefault();

  // get the info out of the form
  var formData = $(this).serialize();

  // send data to server
  $.ajax({
    url: '/books',
    type: 'POST',
    data: formData,
    success: getBooks
  });

}
