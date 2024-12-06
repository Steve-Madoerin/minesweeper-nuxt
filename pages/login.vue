<template>
  <div class="background-container">
    <div class="container">
      <div class="row justify-center align-center">
        <div class="col login d-flex justify-center align-center">
          <div class="card">
            <h2 class="card-title">Login</h2>
            <div class="card-text">
              <button @click="signInWithGoogle" class="btn google-button">Sign in with Google</button>
              <button @click="showEmailPopup" class="btn google-button">Sign in with Email</button>
              <p class="mt-4">
                Don't have an account?
                <router-link to="/register">Sign up</router-link>
              </p>
<!--               <p class="mt-4">
                Forgot your password?
                <button @click="showForgotPasswordPopup" class="btn-link">Reset here</button>
              </p> -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showPopup" class="popup">
      <div class="popup-content login-container">
        <h3 class="card-title">Email Login</h3>
        <form @submit.prevent="signInMailAndPassword(email, password)">
          <div class="input-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="email" required placeholder="Email" />
          </div>
          <div class="input-group">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="password" required placeholder="Password" />
          </div>
          <p class="mt-4">
            Forgot your password?
            <button type="button" @click="showForgotPasswordPopup" class="btn-link">Reset here</button>
          </p>
          <button type="submit" class="btn btn-blue">Log in</button>
          <button type="button" class="btn btn-secondary" @click="hideEmailPopup">Cancel</button>
        </form>
      </div>
    </div>

    <div v-if="showForgotPassword" class="popup">
      <div class="popup-content login-container">
        <h3 class="card-title">Reset Password</h3>
        <form @submit.prevent="sendPwResetEmail(resetEmail)">
          <div class="input-group">
            <label for="reset-email">Email</label>
            <input type="email" id="reset-email" v-model="resetEmail" required placeholder="Email" />
          </div>
          <button type="submit" class="btn btn-blue">Send Reset Link</button>
          <button type="button" class="btn btn-secondary" @click="hideForgotPasswordPopup">Cancel</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

const email = ref('');
const password = ref('');
const resetEmail = ref('');
const showPopup = ref(false);
const showForgotPassword = ref(false);
const router = useRouter();
const auth = useFirebaseAuth();

async function signInWithGoogle() {
  try {
    await signInWithPopup(auth!, new GoogleAuthProvider());
    router.replace('/');
  } catch (error) {
    console.error('Google sign-in failed:', error);
    alert('Failed to sign in with Google. Please try again.');
  }
}

function showEmailPopup() {
  showPopup.value = true;
}

function hideEmailPopup() {
  showPopup.value = false;
}

function showForgotPasswordPopup() {
  showForgotPassword.value = true;
}

function hideForgotPasswordPopup() {
  showForgotPassword.value = false;
}

async function signInMailAndPassword(email: string, password: string) {
  try {
    await signInWithEmailAndPassword(auth!, email, password);
    router.replace('/');
  } catch (error) {
    console.error('Email and password sign-in failed:', error);
    alert('Failed to sign in. Please check your credentials and try again.');
  } finally {
    hideEmailPopup();
  }
}

async function sendPwResetEmail(email: string) {
  try {
    await sendPasswordResetEmail(auth!, email);
    alert('Password reset email sent. Please check your inbox.');
  } catch (error) {
    console.error('Password reset email failed:', error);
    alert('Failed to send password reset email. Please try again.');
  } finally {
    hideForgotPasswordPopup();
  }
}
</script>

<style scoped>
.background-container {
  background-color: aliceblue;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

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

.google-button {
  background-color:  #4285F4;
}

.google-button:hover {
  background-color: #c23321;
}

.mt-4 {
  margin-top: 16px;
}

.popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

.btn-link {
  background: none;
  border: none;
  color: #4285F4;
  text-decoration: underline;
  cursor: pointer;
  display: inline;
  padding: 0;
}

.btn-link:hover {
  color: #357ae8;
}
</style>