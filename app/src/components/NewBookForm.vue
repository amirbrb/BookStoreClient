<template>
  <div>
    <form class="form-horizontal">
      <fieldset>
      <!-- Form Name -->
        <legend>{{formTitle}}</legend>

        <!-- Text input-->
        <div class="form-group">
          <label class="col-md-4 control-label" for="bookName">name</label>  
          <div class="col-md-4">
          <input id="bookName" :disabled="isReadOnly" v-model="bookModel.title" name="bookName" type="text" placeholder="" class="form-control input-sm">
            
          </div>
        </div>

        <!-- Text input-->
        <div class="form-group">
          <label class="col-md-4 control-label" for="bookAuthor">author</label>  
          <div class="col-md-4">
          <input id="bookAuthor" :disabled="isReadOnly" v-model="bookModel.author" name="bookAuthor" type="text" placeholder="" class="form-control input-sm">
            
          </div>
        </div>

        <!-- Textarea -->
        <div class="form-group">
          <label class="col-md-4 control-label" for="bookDescription">description</label>
          <div class="col-md-4">                     
            <textarea class="form-control" :disabled="isReadOnly" v-model="bookModel.description" id="bookDescription" name="bookDescription"></textarea>
          </div>
        </div>

        <!-- Select Basic -->
        <div class="form-group">
          <label class="col-md-4 control-label" for="bookGenere">genere</label>
          <div class="col-md-4">
            <select id="bookGenere" name="bookGenere" :disabled="isReadOnly" v-model="bookModel.genere" class="form-control">
              <option v-for="genere in geners" :value="genere">{{getGenere(genere)}}</option>
            </select>
          </div>
        </div>

        <div class="form-group">
            <label class="col-md-4 control-label" for="bookDate">publication</label>
            <div class="col-md-4">
              <div class="input-group date">
                <input :disabled="isReadOnly" readonly type="text" name="bookDate" id="bookDate" :value="bookModel.publicationDate" class="form-control">
                <div class="input-group-addon">
                    <span class="glyphicon glyphicon-th"></span>
                </div>
              </div>
            </div>
        </div>

        <!-- Appended Input-->
        <div class="form-group">
          <label class="col-md-4 control-label" for="bookPrice">price</label>
          <div class="col-md-2">
            <div class="input-group">
              <input v-model="bookModel.price" :disabled="isReadOnly" id="bookPrice" name="bookPrice" class="form-control" placeholder="" type="text">
              <span class="input-group-addon">$</span>
            </div>
            
          </div>
        </div>
        <!-- Button (Double) -->
        <div class="form-group">
          <label class="col-md-4 control-label" for="saveButton"></label>
          <div class="col-md-8">
            <button id="saveButton" @click="addBook" v-show="!isReadOnly" name="saveButton" class="btn btn-success">save</button>
            <button id="cancelButton" @click="cancel" name="cancelButton" class="btn btn-danger">{{cancelActionText}}</button>
          </div>
        </div>

      </fieldset>
    </form>

  </div>
</template>

<script>
import bookDataService from '../services/bookRepository.js'
import bookGeners from '../enumeration/geners.js'

export default {
  components: {
  },
  props: ['isReadOnly'],
  data () {
    return {
      bookModel: {
        title: '',
        description: '',
        author: '',
        genere: '0',
        price: '0',
        publicationDate: ''
      },
      geners: bookGeners
    }
  },
  mounted(){
    var $j = window.jQuery.noConflict();
    $j('#bookDate').datepicker({});
  },
  created(){
    var self = this;
    var isbn = self.$route.params.id;
    if(isbn){
      bookDataService.getBookByISBN(isbn, function(book){
        self.bookModel = book;
      });
    }
  },
  computed: {
    formTitle(){
      return this.isReadOnly ? 'book details' : 'add book';
    },
    cancelActionText(){
      return this.isReadOnly ? 'go back' : 'cancel';
    }
  },
  methods: {
    cancel(){
      this.$router.push('/');
    },
    addBook(){
      debugger;
      var $j = window.jQuery.noConflict();
      this.bookModel.publicationDate = $j('#bookDate').val();
      var data = JSON.stringify(this.bookModel)
      bookDataService.addBook(data, function(){

      });
      this.$router.push('/');
    },
    getGenere(genere){
      for(var g in this.geners){
        if(this.geners[g] == genere){
          return g;
        }
      }
    }
  }
};

</script>

<style>
  legend{
    text-align: center;
  }  
</style>
