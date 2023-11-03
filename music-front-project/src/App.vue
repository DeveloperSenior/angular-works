<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import NavbarView from './views/shared/NavbarView.vue'


</script>

<template>
  <NavbarView></NavbarView>
  <router-view></router-view>
  
</template>