<script setup lang="ts">
  import { useUserStore } from '../stores/Auth'
  import { minidenticon } from 'minidenticons'


  const userStore = useUserStore()

  const getImageProfile = ()=>{
  const name = userStore.userData?.id as string;
  let image = 'data:image/svg+xml;utf8,' + encodeURIComponent(minidenticon(name, 90, 150))
  if (userStore.userData?.photoURL){
    image = userStore.userData?.photoURL.toString()
  }
  return image
}

const logout = async ()=>{
  await userStore.logOut()
}

const links = [
  { name: 'Sign out', click:logout}
]

</script>

<template>
  <main>
    <div class="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
      <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply" alt="" class="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center" />
      <div class="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl" aria-hidden="true">
        <div class="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
      </div>
      <div class="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu" aria-hidden="true">
        <div class="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
    </div>
      
     <div class="mx-auto max-w-7xl px-6 lg:px-8">
        
        <div class="mx-auto max-w-2xl lg:mx-0">
          <img class="h-20 w-20 rounded-full" :src=getImageProfile() alt="">  
          <h2 class="text-4xl font-bold tracking-tight text-white sm:text-6xl">{{userStore.userData?.name}}</h2>
          <p class="mt-6 text-lg leading-8 text-gray-300">{{userStore.userData?.email}}</p>
          <p class="mt-6 text-lg leading-8 text-gray-300">ID Sesión: {{userStore.userData?.id}}</p>
          <p class="mt-6 text-lg leading-8 text-gray-300">ID Proveedor: {{userStore.userData?.providerId}}</p>

        </div>
        <div class="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
          <div class="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
            <a v-for="link in links" :key="link.name" @click="link.click">{{ link.name }} <span aria-hidden="true">&rarr;</span></a>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>