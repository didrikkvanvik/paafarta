<template>
  <nav class="flex gap-4 mt-4">
    <router-link
      to="/"
      class="text-white text-lg"
      :class="{ underline: $route.path === '/' }"
      >Home</router-link
    >
    <router-link
      to="/live"
      class="text-white text-lg"
      :class="{ underline: $route.path === '/live' }"
      >Live Data</router-link
    >
  </nav>
</template>
