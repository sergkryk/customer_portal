<script setup lang="ts">
import { reactive, ref } from 'vue'
import PortalMain from './components/PortalMain.vue'
import PortalLogin from './components/PortalLogin.vue'
import { BackendResponse } from './types/types';

const isAuthenticated = ref(false);
const user = reactive<BackendResponse>({
  account: null,
  agreements: null,
  vgroups: null
})

function loginHandler(data: BackendResponse) {
  if (typeof(data) === 'object' && data !== null && 'account' in data && 'vgroups' in data && 'agreements' in data) {
    Object.assign(user, data)
    isAuthenticated.value = true
  }
}

</script>

<template>
  <div class="container">
    <portal-main v-if="isAuthenticated" :user="user"></portal-main>
    <portal-login v-else @login="loginHandler"></portal-login>
  </div>
</template>

<style scoped>

</style>
