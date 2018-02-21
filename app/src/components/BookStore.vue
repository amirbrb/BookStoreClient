<template>
  <div id="bookstore" class="col-xs-12 text-center">
    <BookStoreHeader v-on:bookDeleted="bookDeleted" :selectedBooks="selectedBooks"></BookStoreHeader>
    <div id="book-container" v-if="books.length>0">
      <Book v-on:bookSelected="bookSelected" v-for="book in books" :data="book"></Book>      
    </div>
    <div class="getting-books" v-if="isLoading">
      <p>getting books...</p>
    </div>
    <div class="no-books-message" v-if="!isLoading && books.length == 0">
      <p>no books for you sir</p>
      <p>try adding one clicking on the <i class="fa fa-plus-circle"></i> sign</p>
    </div>
  </div>
</template>

<script>
import Vue from 'Vue'
import Book from './Book'
import BookStoreHeader from './Header'
import bookDataService from '../services/bookRepository.js'
import $ from 'jquery'

export default {
  components: {
    Book,
    BookStoreHeader
  },
  props: [],
  created(){
    var self = this;
    bookDataService.getBooks(function(books){
      self.isLoading = false;
      self.books = books.map(function(book){
        book.isSelected = false;
        return book;
      })  
    });
  },
  data () {
    return {
      isLoading: true,
      books: [],
      errors: []
    }
  },
  computed:{
    selectedBooks: function(){
      var selectedBooks = $.grep(this.books, function(book){
        return book.isSelected;
      });

      return selectedBooks;
    }
  },
  methods: {
    bookSelected(isSelected, isbn){
      var index = this.books.map(function(e) { return e.ISBN; }).indexOf(isbn);
      Vue.set(this.books[index], 'isSelected',isSelected);
    },
    bookDeleted(isbn){
      var index = this.books.map(function(e) { return e.ISBN; }).indexOf(isbn);
      this.books.splice(index);
    }
  }
};

</script>

<style scoped>
  .no-books-message, .getting-books{
    font-size: 50px;
  }
</style>
