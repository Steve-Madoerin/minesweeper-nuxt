<template>
    <VideoAnimation />
    <div class="chat-container">
      <h1 class="title">Minesweeper Chat</h1>
      <input type="hidden" id="ws-route" :value="wsRoute" />
      <div class="input-group">
        <input
          type="text"
          v-model="username"
          placeholder="Enter your name"
          size="80"
          :disabled="isRegistered"
          class="input-field-username"
        />
        <button @click="register" :disabled="isRegistered" class="button">Register</button>
      </div>
      <br />
      <div class="input-group">
        <input
          type="text"
          v-model="message"
          placeholder="Type your message"
          size="80"
          :disabled="!isRegistered"
          @keydown.enter="sendMessage"
          class="input-field"
        />
      </div>
      <br />
      <textarea v-model="chatLog" rows="15" cols="80" disabled class="chat-area"></textarea>
      <br />
      <br />
      <button @click="navigateTo('/game')" class="button">Continue</button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import VideoAnimation from '~/components/videoAnimationComponent/VideoAnimationComponent.vue'
  
  const username = ref('')
  const message = ref('')
  const chatLog = ref('')
  const isRegistered = ref(false)
  //const wsRoute = ref('ws://localhost:9000/chatSocket')
  const wsRoute = ref('wss://serene-peak-10116-79a087b3a95c.herokuapp.com/chatSocket')
  let socket: WebSocket | null = null
  
  const register = () => {
    if (username.value) {
      const url = `https://serene-peak-10116-79a087b3a95c.herokuapp.com/chatRegister/${encodeURIComponent(username.value)}`
      fetch(url)
        .then((response) => {
          if (response.ok) {
            isRegistered.value = true
  
            socket = new WebSocket(wsRoute.value.replace('http', 'ws'))
            socket.onopen = () => {
              socket?.send(username.value)
            }
            socket.onmessage = handleMessage
            socket.onerror = (err) => {
              console.error('WebSocket error:', err)
              alert('WebSocket error. Please try again.')
            }
            socket.onclose = () => {
              console.log('WebSocket closed')
            }
          } else {
            console.error('Registration failed', response)
            alert('Registration failed. Please try again.')
          }
        })
        .catch((error) => {
          console.error('Error during registration:', error)
          alert('An error occurred. Please try again.')
        })
    }
  }
  
  const sendMessage = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && message.value.trim() && socket?.readyState === WebSocket.OPEN) {
      socket.send(message.value)
      message.value = ''
    }
  }
  
  const handleMessage = (event: MessageEvent) => {
    chatLog.value += '\n' + event.data
  }
  
  </script>
  
  <style scoped>
  .chat-container {
    width: 70%;
    margin: auto;
    text-align: center;
    background-color: transparent;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .title {
    font-family: 'Minesweeper', sans-serif;
    font-size: 5vw;
    margin-bottom: 20px;
    color: #ffffff;
  }
  
  @media (min-width: 1024px) {
    .title {
      font-size: 70px;
    }
  
  }
  
  .input-group {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .input-field {
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    width: 100%;
    max-width: 500px;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  .input-field-username {
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    width: 100%;
    max-width: 392px;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  .button {
    padding: 10px 20px;
    background-color: #007bff;
    border: none;
    border-radius: 0.625rem;
    box-shadow:
      inset 0 0.3125rem 0.625rem rgba(255, 255, 255, 0.8),
      inset 0 -0.3125rem 0.625rem rgba(0, 0, 0, 0.2),
      0 0.5rem 0.9375rem rgba(0, 0, 0, 0.3);
    color: #ffffff;
    font-family: 'Avenir';
    font-size: 1rem;
    font-weight: lighter;
    text-align: center;
    cursor: pointer;
    transition:
      background-color 0.3s,
      color 0.3s;
    position: relative;
  }
  
  .button:disabled {
    background-color: grey;
    cursor: not-allowed;
  }
  
  .button:hover:not(:disabled) {
    background-color: #0056b3;
  }
  
  .chat-area {
    width: 100%;
    max-width: 500px;
    height: 300px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    resize: none;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  </style>
  