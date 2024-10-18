<script setup lang="ts">
    import { RouterLink } from 'vue-router'
</script>

<template>
    <nav>
        <ul>
            <li><RouterLink to="/">Home</RouterLink></li>
            <li><RouterLink to="/notification">Notifications</RouterLink></li>
            <li><RouterLink to="/messages">Messages</RouterLink></li>
            <li><RouterLink to="/bookmarks">Bookmarks</RouterLink></li>
            <li><RouterLink to="/products">Store</RouterLink></li>
            <li><RouterLink to="/cart">Cart</RouterLink></li>
            <li><RouterLink to="/payment-method">Payment Methods</RouterLink></li>
            <li><RouterLink to="/profile">My Profile</RouterLink></li>
            <li><RouterLink to="/setting">Setting</RouterLink></li>
        </ul>
    </nav>
</template>