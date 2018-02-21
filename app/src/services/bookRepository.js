var  $ = require('jquery')

function getBooks(callback) {
	$.get('/books', function(data){
		var books = data.data.map(function(book){
			book.isSelected = false;
			return book;
		})
		callback(books);
	}) 
}

function getBookByISBN(isbn, callback){
	$.get('/books/' + isbn, function(result){
		callback(result.data);
	}) 
}

function deleteBooks(isbnS, callback){
	$.each(isbnS, function(index, isbn){
		$.ajax({
		    url: '/books/' + isbn,
		    type: 'DELETE',
		    success: function(result) {
		    	callback(isbn)
		    },
		    error: function(result){
		    	console.log(result)
		    }
		});
	})
}

function addBook(model, callback){
	var data = model;
	$.ajax({
    	url: '/books/',
	    data: data,
	    type: 'PUT',
	    success: function(result) {
	        callback(result);
	    },
	    error: function(result){
	    	console.log(result)
	    }
	});
}

module.exports = {
    getBooks: getBooks,
    deleteBooks: deleteBooks,
    addBook: addBook,
    getBookByISBN: getBookByISBN
};
