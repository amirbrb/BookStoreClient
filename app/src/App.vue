<template>
  <div id="main">
    <div class="view-router">
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
  },
  props: [],
  data () {
    return {
    }
  },
  methods: {
  }
};

</script>

<style>

.fade-enter-active, .fade-leave-active {
  -webkit-transition: opacity 1.5s ease-in;
  transition: opacity 1.5s ease-in;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.main-view{
  width: 100%;
}

.view-router{
  position: absolute;;
  top: 80px;
  width: 100%;
}

</style>
