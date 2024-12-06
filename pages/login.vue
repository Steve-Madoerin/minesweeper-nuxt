<!-- pages/login.vue -->

<template>
  <div class="login-container">
    <h1>Login</h1>
    <p>Log in to continue</p>
    <button @click="signInWithGoogle" class="google-button">Sign in with Google</button>
    <form @submit.prevent="signInMailAndPassword(email, password)">
      <input type="email" v-model="email" placeholder="Email" />
      <input type="password" v-model="password" placeholder="Password" />
      <button type="submit">Log in</button>
    </form>
    <p>Don't have an account? <router-link to="/register">Sign up</router-link></p>
  </div>
</template>
  
<script setup lang="ts" >
  import { ref } from 'vue'

  const email = ref('')
  const password = ref('')

  import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth'
  const auth = useFirebaseAuth()
  const router = useRouter()

  function signInWithGoogle() {
    signInWithPopup(auth!, new GoogleAuthProvider())
    .then(() => {
        router.replace('/')
    })
  }

  function signInMailAndPassword(email: string, password: string) {
    signInWithEmailAndPassword(auth!, email, password)
    .then(() => {
        router.replace('/')
    })
  }
</script>
  
<style scoped>
  .login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 2rem;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  input {
    width: 100%;
    padding: 0.5rem;
    margin: 0.5rem 0;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    width: 100%;
    padding: 0.5rem;
    margin: 0.5rem 0;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  .google-button {
    background-color: #db4437;
  }
  
  .google-button:hover {
    background-color: #c23321;
  }
  
  .error {
    color: red;
    margin-top: 1rem;
  }
</style>