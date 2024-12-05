<template>
  <div
    id="burger-icon"
    class="container-fluid position-fixed top-0 start-0 m-3"
    style="z-index: 1052"
  >
    <div class="row align-items-center">
      <div class="col-left">
        <button class="btn btn-primary custom-toggler" type="button" @click="handleMenuClick">
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['toggleSidebar'])

const handleMenuClick = () => {
  emit('toggleSidebar')
}
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

.custom-toggler {
  background-color: transparent;
  width: 2.5em;
  height: 2.5em;
  border: none;
  border-radius: 0.5em;
  border-style: solid;
  border-width: 0.1em;
  border-color: #ededed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1053; /* Higher than sidebar's z-index */
}

.custom-toggler:hover {
  background-color: #0000004b;
  border-color: #d8d8d8b8;
}

.navbar-toggler-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: none;
  font-size: 1.2em;
  padding-left: 0.1em;
}

.navbar-toggler-icon:before {
  content: '\f0c9';
  font-family: 'Font Awesome 5 Free';
  color: #ededed;
  text-align: center;
  font-weight: 900;
}
</style>
