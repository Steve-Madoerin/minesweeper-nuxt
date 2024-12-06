<template>
    <div class="container">
      <div class="row justify-center align-center">
        <div class="col signup d-flex justify-center align-center">
          <div class="card">
            <h2 class="card-title">Sign Up</h2>
            <div class="card-text">
              <form @submit.prevent="signup">
                <div class="input-group">
                  <label for="email">Email</label>
                  <input type="email" id="email" v-model="email" required />
                </div>
                <div class="input-group">
                  <label for="password">Password</label>
                  <input type="password" id="password" v-model="password" required />
                </div>
                <button type="submit" class="btn btn-blue">Sign Up</button>
              </form>
              <p class="mt-4">
                Already have an account?
                <router-link to="/login">Login here</router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const email = ref('');
const password = ref('');
const router = useRouter();
const auth = useFirebaseAuth();

async function signup() {
  try {
    console.log('Signing up with:', email.value, password.value);
    await createUserWithEmailAndPassword(auth!, email.value, password.value);
    console.log('Signup successful');
    await router.push('/');
  } catch (error) {
    console.error('Signup failed:', error);
  }
}
</script>

<style scoped>
.container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.row {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.col {
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
}

.card-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.card-text {
  text-align: left;
}

.input-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  cursor: pointer;
  background-color: #4285F4;
  color: white;
  border: none;
  border-radius: 4px;
}

.btn:hover {
  background-color: #357ae8;
}

.mt-4 {
  margin-top: 16px;
}
</style>