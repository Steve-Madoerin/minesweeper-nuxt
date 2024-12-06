<template>
  <div id="app">
    <header>
      <nav class="invisible">
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/rules">Rules</NuxtLink>
        <NuxtLink to="/game">Game</NuxtLink>
        <NuxtLink to="/chat">Chat</NuxtLink>
        <NuxtLink to="/offline">Offline</NuxtLink>
      </nav>
    </header>

    <NuxtPage />
  </div>
</template>

<script setup lang="ts">

const user = useCurrentUser()
const router = useRouter()
onMounted(() => {
  watch(user, (curentUser, prevUser) => {
    if(prevUser && !curentUser) {
      return router.replace('login')
      
    }
    
  })
})

</script>

<style scoped>
.invisible {
  display: none;
}
</style>