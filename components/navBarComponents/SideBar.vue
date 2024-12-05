<template>
  <div class="sidebar">
    <div class="menu-items link-group">
      <ul class="horizontal-menu">
        <li><a href="#" @click="navigateTo('/')" class="nav-link">New</a></li>
        <li><a href="#" @click="informServer('l')" class="nav-link">Load</a></li>
        <li><a href="#" @click="informServer('s')" class="nav-link">Save</a></li>
        <li><a @click="navigateTo('/rules')" class="nav-link">Rules</a></li>
        <li><a @click="$emit('cheat')" class="nav-link">Cheat</a></li>
        <li><a @click="navigateTo('/chat')" class="nav-link">Chat</a></li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function navigateTo(path: string) {
  router.push(path)
}

const emit = defineEmits(['startNewGame', 'informServer', 'cheat'])
const informServer = (command: string) => emit('informServer', command)
</script>

<style scoped>
.sidebar {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px;
}

.sidebar[style*='display: none'] {
  transform: translateX(-100%);
}

.menu-items {
  border: solid white;
  border-radius: 5px;
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar li {
  margin: 10px 0; /* Reduced margin */
}

.nav-link {
  color: #fdfdfd;
  text-decoration: none;
  font-size: 18px;
  display: block;
  padding: 10px;
  border-radius: 5px;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.8);
  color: #000;
}

.horizontal-menu {
  display: flex;
  flex-direction: row;
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-link.active {
  background-color: rgba(255, 255, 255, 0.8) !important;
  color: #000 !important;
}
</style>
