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

<style scoped>
.invisible {
  display: none;
}
</style>