<template>
  <div class="header">
    <i class="fa fa-info-circle help" @click="showHelp"></i>
    <i class="fa fa-trash delete" @click="deleteBooks" v-show="selectedBooks.length>0"></i>
    <i class="fa fa-plus-circle add" @click="showAddBook"></i>
  </div>
</template>

<script>
import bookDataService from '../services/bookRepository.js'
export default {
  components: {
  },
  props: ['selectedBooks'],
  data () {
    return {

    }
  },
  methods: {
    deleteBooks(){
      var self = this;
      var message = 'you are about to delete ';
      message += self.selectedBooks.length.toString();
      message += self.selectedBooks.length > 1 ? ' books' : ' book';
      var result = confirm(message);
      if(result){
        var booksToDelete = this.selectedBooks.map(function(book){
          return book.ISBN
        });
        bookDataService.deleteBooks(booksToDelete, function(isbn){
          self.$emit('bookDeleted', isbn);
        })
      }
    },
    showAddBook(){
      this.$router.push('/add');
    },
    showHelp(){
      alert('long press to select a book, double click to drill down')
    }
  }
};

</script>

<style scoped>
  .header{
    position: absolute;
    right: 15px;
    top: -20px;
    width: 100%;
  }

  .header .fa{
    font-size: 35px;
    cursor: pointer;
  }

  .help{
    float: left;
    margin-left: 30px;
  }

  .add{
    position: absolute;
    right: 10px; 
  }

  .delete{
    position: absolute;
    right: 65px;
  }
</style>
