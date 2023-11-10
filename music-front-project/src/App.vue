<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import NavbarView from './views/shared/NavbarView.vue'
import BannerView from './views/shared/BannerView.vue';
import { useUserStore } from './stores/Auth'
const userStore = useUserStore()

</script>

<template>
  <BannerView v-if="userStore.userData?.email === undefined"></BannerView>
  <NavbarView></NavbarView>
  <router-view></router-view>
  
</template>