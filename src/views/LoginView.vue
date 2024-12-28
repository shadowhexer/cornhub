<script setup lang="ts">
import { reactive, ref } from 'vue'
import API from '@/services/api';
import Header from '@/components/Scripts/Header';
import UserProfile from '@/components/Scripts/UserProfile';
import router from '@/router';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/services/Session'
const authStore = useAuthStore()
const isLogin = UserProfile.isLogin

// Reactive state to track whether we are in the Sign Up or Sign In panel
const isSignUp = ref(false)  // Initially set to 'false' to show Sign In
// Methods to toggle the panel
const toggleSignUp = () => isSignUp.value = true
const toggleSignIn = () => isSignUp.value = false

const loginForm = reactive({
    email: '' as string,
    password: '' as string,
});

const createForm = reactive({
    name: '' as string,
    email: '' as string,
    password: '' as string,
})

const handleLogin = async () => {
    try {
        await API.get('/sanctum/csrf-cookie').then(async () => {
            const response = await API.post('/login', loginForm)
            if (response.data.status === 'success') {
                if (response.data.status === 'success') {
                    authStore.setAuth(response.data.token, response.data.user)
                    isLogin.logged_in = true
                    isLogin.user = response.data.user
                    router.push('/')
                }
            }
        })

    } catch (error) {
        console.log(error);
    }
}

const handleRegister = async () => {
    try {
        const response = await API.post('/register', createForm)
        if (response.data.status === 'success') {
            createForm.password = '';
            toggleSignIn();
        }
    } catch (error) {
        console.log(error);
    }
}
const google = async () => {
    const response = await API.get('/auth/google/callback');
    
    if (response.data.redirect_url) {
        authStore.setAuth(response.data.token, response.data.user)
        isLogin.logged_in = true
        isLogin.user = response.data.user
        if (response.data.redirect_url) {
            window.location.href = response.data.redirect_url;

        }
    }
};

const logout = async () => {
    await API.get('/sanctum/csrf-cookie').then(async () => {
        const response = await API.post('/logout/')
        if (response.data.status === 'success') {
            authStore.logout() // Clears token and user
            isLogin.logged_in = false
            router.push('/')
        }
    })
}
</script>

<template>

    <v-container class="position-relative overflow-hidden rounded-lg container my-16" width="768" max-width="100%"
        min-height="480" :class="{ 'right-panel-active': isSignUp }">

        <div class="position-absolute top-0 h-100 left-0 w-50 opacity-100 sign-up-container"
            style="transition: all 0.4s ease-in-out;">
            <v-form class="d-flex flex-column align-center justify-center text-center h-100"
                @submit.prevent="handleRegister">
                <h1>Create Account</h1>
                <div class="my-5">
                    <v-btn class="flex items-center" block variant="outlined" @click="google">
                        Log in with <span class="google-logo text-h6 mx-1">Google</span>
                    </v-btn>
                </div>
                <span class="text-caption">or use your email for registration</span>
                <input type="text" placeholder="Name" v-model="createForm.name" />
                <input type="email" placeholder="Email" v-model="createForm.email" />
                <input type="password" placeholder="Password" v-model="createForm.password" />
                <button class="my-3">Sign Up</button>
            </v-form>
        </div>

        <div class="position-absolute top-0 h-100 left-0 w-50 opacity-100 sign-in-container"
            style="transition: all 0.4s ease-in-out;">
            <v-form class="d-flex flex-column align-center justify-center text-center h-100"
                @submit.prevent="handleLogin">
                <h1>Sign in</h1>
                <div class="my-5">
                    <v-btn class="flex items-center" block variant="outlined" @click="google">
                        Log in with <span class="google-logo text-h6 mx-1">Google</span>
                    </v-btn>
                </div>
                <span>or use your account</span>
                <input type="email" placeholder="Email" v-model="loginForm.email" />
                <input type="password" placeholder="Password" v-model="loginForm.password" />
                <a href="#" class="text-green">Forgot your password?</a>
                <button class="my-3">Sign In</button>

            </v-form>
        </div>

        <div class="position-absolute top-0 w-50 h-100 overflow-hidden overlay-container">
            <v-card class="overlay">

                <template #image>
                    <v-img src="/src/assets/login.jpg" cover gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.7)" />
                </template>

                <div
                    class="position-absolute d-flex flex-column align-center justify-center text-center pa-10 text-center top-0 h-100 w-50 overlay-panel overlay-left">
                    <h1 class="font-weight-bold">Hey!</h1>
                    <p class="text-subtitle-1 my-3" style="line-height: 1rem;">Looks like you are new here. Are you
                        interested in corn
                        products? Create an account now and start shopping!</p>
                    <p class="text-subtitle-2" style="line-height: 1rem;">Already have an account? Click the button
                        below and shop now!
                    </p>
                    <button @click="toggleSignIn" class="ghost my-2" id="signIn">Sign In</button>
                </div>


                <div
                    class="position-absolute d-flex flex-column align-center justify-center text-center pa-10 text-center top-0 h-100 w-50 overlay-panel overlay-right">
                    <h1 class="font-weight-bold">Welcome Back!</h1>
                    <p class="text-subtitle-1 my-3" style="line-height: 1rem;">Are you planning to buy some corn today?
                        Wait no more!
                        Log in your info and start shopping!</p>
                    <p class="text-subtitle-2" style="line-height: 1rem;">Don't have an account yet? Click the button
                        below and start a
                        new one!</p>
                    <button @click="toggleSignUp" class="ghost my-2" id="signUp">Sign Up</button>
                </div>

            </v-card>
        </div>
    </v-container>

</template>

<style scoped>
span {
    font-size: 12px;
}

button {
    border-radius: 20px;
    border: 1px solid #ffffff;
    background-color: #42d20d;
    font-size: 12px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
}

button:active {
    transform: scale(0.95);
}

button:focus {
    outline: none;
}

button.ghost {
    background-color: transparent;
    border-color: #FFFFFF;
}

form {
    background-color: #FFFFFF;
    padding: 0 50px;
}

input {
    background-color: #eee;
    border: none;
    padding: 12px 15px;
    margin: 8px 0;
    width: 100%;
}

.container {
    background-color: #fff;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
        0 10px 10px rgba(0, 0, 0, 0.22);
}

.sign-in-container,
.sign-up-container {
    z-index: 1;
}

.container.right-panel-active .sign-in-container {
    transform: translateX(100%);
}

.container.right-panel-active .sign-up-container {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
    animation: show 0.6s;
}

@keyframes show {

    0%,
    49.99% {
        opacity: 0;
        z-index: 1;
    }

    50%,
    100% {
        opacity: 1;
        z-index: 5;
    }
}

.overlay-container {
    left: 50%;
    transition: transform 0.6s ease-in-out;
    z-index: 100;
}

.container.right-panel-active .overlay-container {
    transform: translateX(-100%);
}

.overlay {
    background-size: cover;
    color: #FFFFFF;
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
    transform: translateX(50%);
}

.overlay-panel {
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
}

.overlay-left {
    transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
    transform: translateX(0);
}

.overlay-right {
    right: 0;
    transform: translateX(0);
}

.container.right-panel-active .overlay-right {
    transform: translateX(20%);
}

.social-container {
    margin: 20px 0;
}

.social-container a {
    border: 1px solid #DDDDDD;
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
    height: 40px;
    width: 40px;
}
</style>