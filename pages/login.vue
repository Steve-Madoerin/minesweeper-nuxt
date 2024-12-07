<template>
  <div class="background-container">
    <VideoAnimation />
    <div class="container">
      <div class="row justify-center align-center">
        <div class="col login d-flex justify-center align-center">
          <div class="container1">
            <h1>Minesweeper</h1>
            <div class="card">
              <h2 class="card-title">Login</h2>
              <div class="card-text">
                <button @click="signInWithGoogle" class="btn google-button">
                  <img src="assets/images/google.png" alt="Google Icon" class="icon-google" /> Sign in with Google
                </button>
                <button @click="showEmailPopup" class="btn email-button">
                  <img src="assets/images/mail.png" alt="Mail Icon" class="icon-mail" />Sign in with Email
                </button>
                <button @click="signInWithGitHub" class="btn github-button">
                  <img src="assets/images/github.png" alt="GitHub Icon" class="icon-github" /> Sign in with GitHub
                </button>
                <p class="mt-4" style="font-size: small; text-align: center" >
                  Don't have an account?
                  <router-link to="/register">Sign up</router-link>
                </p>
              </div>
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
        <h4></h4>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
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
    <div
        style="
        bottom: 0;
        left: 0;
        width: 100%;
        text-align: center;
        color: white;
        margin-bottom: 10px;
      "
    >
      <p>&copy; 2024 by Steve Madoerin &amp; Dennis Hoang</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import VideoAnimation from '~/components/videoAnimationComponent/VideoAnimationComponent.vue'
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, sendPasswordResetEmail, GithubAuthProvider } from 'firebase/auth';

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

async function signInWithGitHub() {
  try {
    await signInWithPopup(auth!, new GithubAuthProvider());
    router.replace('/');
  } catch (error) {
    console.error('GitHub sign-in failed:', error);
    alert('Failed to sign in with GitHub. Please try again.');
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
@font-face {
  font-family: 'Minesweeper';
  src:
      url('../assets/fonts/mine-sweeper.ttf') format('truetype'),
      url('../assets/fonts/mine-sweeper.woff') format('woff'),
      url('../assets/fonts/mine-sweeper.woff2') format('woff2');
}
.background-container {
  background-color: transparent;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

h1 {
  font-family: 'Minesweeper';
  font-size: 4.5vw;
  color: #e7ebed;
  text-align: center;
  padding-bottom: 15px;
}

@media (max-width: 574px) {
  h1 {
    font-size: 30px;
  }

}


.container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  background-color: transparent;
}
.container1 {
  max-width: 400px;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
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
  width: 60%;
}

.card-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.card-text {
  text-align: center;
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
  background-color:  #68a2ff;
}

.google-button:hover {
  background-color: #2154c2;
}

.github-button {
  background-color: #333;
}

.github-button:hover {
  background-color: #24292e;
}

.email-button {
  background-color: #f3b600;
}

.email-button:hover {
  background-color: #e0a800;
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
  width: 100%;
}

.popup-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 60%;
  max-width: 260px;
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

.icon-github {
  width: 20px;
  height: 20px;
  margin-right: 8px;
  vertical-align: middle;
}
.icon-google {
  width: 20px;
  height: 20px;
  margin-right: 8px;
  vertical-align: middle;
}
.icon-mail {
  width: 20px;
  height: 16px;
  margin-right: 10px;
  vertical-align: middle;
}
</style>