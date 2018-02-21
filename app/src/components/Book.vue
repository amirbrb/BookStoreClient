<template>
  <div :class="{'book': true, 'selected': isSelected}" title="long press to select, double click to drill down" ref="book">
    <div class="book-title">{{data.title}}</div>
    <div class="book-author">By {{data.author}}</div>
    <div class="book-price">{{data.price}}$</div>
  </div>
</template>

<script>

import Hammer from 'hammerjs';
export default {
  components: {
  },
  props: ['data'],
  data () {
    return {
      isSelected: false
    }
  },
  methods: {
    drillDown(){
      this.$router.push('/book/' + this.data.ISBN)
    }
  },
  mounted(){
    var self = this;
    var bookElement = self.$refs.book;
    var hammertime = new Hammer(bookElement);
    var press = new Hammer.Press({
      time: 500
    });

    hammertime.add(press);

    hammertime.on('press', function(ev){
      self.isSelected = !self.isSelected;
      self.$emit('bookSelected', self.isSelected, self.data.ISBN);
    });

    hammertime.on('tap', function(ev){
      if(ev.tapCount == 2){
        self.drillDown();
      }
    });
  }
};

</script>

<style scoped>
  .book{
    border-radius: 8px;
    border: 1px solid black;
    margin-top: 20px;
    cursor: pointer;
    height: 80px;
  }

  .selected{
    opacity: 0.2;
  }

  .book-title{
    width: 100%;
    text-align: center;
    font-size: 30px;
  }

  .book-author{
    width: 100%;
    text-align: center;
    font-size: 12px;
  }

  .book-price {
    float: right;
    position: relative;
    margin-right: 15px;
    bottom: 5px;
  } 
</style>
1