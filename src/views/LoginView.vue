<script setup lang="ts">
import { ref } from 'vue'

// Reactive state to track whether we are in the Sign Up or Sign In panel
const isSignUp = ref(false)  // Initially set to 'false' to show Sign In

// Methods to toggle the panel
const toggleSignUp = () => {
  isSignUp.value = true
}

const toggleSignIn = () => {
  isSignUp.value = false
}
</script>

<template>
  <v-container class="container" :class="{ 'right-panel-active': isSignUp }">

    <!-- Main Form Container -->
    <v-row class="form-box">
      <v-col>
        <!-- Sign-Up Form -->
        <v-form v-if="isSignUp" class="form-container sign-up-container">
          <h1>Create Account</h1>
          <!-- Input fields -->
          <v-text-field v-model="name" label="Name" :counter="25" required></v-text-field>
          <v-text-field v-model="email" label="Email" outlined></v-text-field>
          <v-text-field v-model="password" label="Password" type="password" outlined></v-text-field>
          <v-btn @click="" class="btn-signup">Sign Up</v-btn>
        </v-form>

        <!-- Sign-In Form -->
        <v-form v-else class="form-container sign-in-container">
          <h1>Sign in</h1>
          <!-- Input fields -->
          <v-text-field v-model="email" label="Email" required></v-text-field>
          <v-text-field v-model="password" label="Password" type="password" outlined></v-text-field>
          <a href="#" class="forgot-password">Forgot your password?</a>
          <v-btn @click="" class="btn-signin">Sign In</v-btn>
        </v-form>

        <!-- Overlay Container for switching panels -->
        <div class="overlay-container">
          <div class="overlay">
            <div class="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <v-btn class="ghost" @click="toggleSignIn">Sign In</v-btn>
            </div>
            <div class="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start your journey with us</p>
              <v-btn class="ghost" @click="toggleSignUp">Sign Up</v-btn>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.v-btn {
  border-radius: 20px;
  border: 1px solid #FF4B2B;
  background-color: #FF4B2B;
  color: #FFFFFF;
  align-self: center;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
}

.v-btn:active {
  transform: scale(0.95);
}

.v-btn.ghost {
  background-color: transparent;
  border-color: #FFFFFF;
}

.v-form {
  background-color: #FFFFFF;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
}

.v-text-field input {
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
}

.v-container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
    0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
}

.form-container {
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.container.right-panel-active .sign-in-container {
  transform: translateX(100%);
}

.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}

@keyframes show {

  0%, 49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%, 100% {
    opacity: 1;
    z-index: 5;
  }
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.overlay {
  background: #FF416C;
  background: -webkit-linear-gradient(to right, #FF4B2B, #FF416C);
  background: linear-gradient(to right, #FF4B2B, #FF416C);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #FFFFFF;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-left {
  transform: translateX(-20%);
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

.container.right-panel-active .overlay-left {
  transform: translateX(0);
}

.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.container.right-panel-active .overlay-left {
  transform: translateX(0);
}

.container.right-panel-active .overlay-right {
  transform: translateX(20%);
}
</style>