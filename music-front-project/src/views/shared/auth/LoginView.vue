<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '../../../stores/Auth'

const userStore = useUserStore()
const email = ref('')
const pass = ref('')


 const login = async ()=>{

if(!email.value || pass.value.length < 6){
    return alert("Faltan Campos Obligatorios!")
}

await userStore.logIn(email.value, pass.value)
}

const loginWithGoogle = async ()=>{
  userStore.loginWithGoogle()
}

const loginWithGithub= async ()=>{
  userStore.loginWithGithub()
}

</script>
<template>
  <div class="h-full bg-gray">
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
          <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
          <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white-900">Ingresa con tu cuenta!</h2>
        </div>
    
        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form class="space-y-6" @submit.prevent="login">
            <div>
              <label for="email" class="block text-sm font-medium leading-6 text-900">Correo electronico</label>
              <div class="mt-2">
                <input id="email" name="email" v-model="email" type="email" autocomplete="email" required="true" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
    
            <div>
              <div class="flex items-center justify-between">
                <label for="password" class="block text-sm font-medium leading-6 text-900">Contraseña</label>
                <div class="text-sm">
                  <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Olvidó la contraseña?</a>
                </div>
              </div>
              <div class="mt-2">
                <input id="password" name="password" v-model="pass" type="password" autocomplete="current-password" required="true" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
    
            <div>
              <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
            </div>
          </form>
    
          <p class="mt-10 text-center text-sm text-gray-500">
            No tienes cueta?
            {{ ' ' }}
            <a href="/signin" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">registrate gratis</a>
          </p>
          <div>
            <p class="mt-10 text-center text-sm text-gray-500">
              O continua con</p>
            <div class="m-6 border-t border-gray-500 divide-y divide-gray-100 text-center text-lg text-gray-500">  
           </div>
           <div class="flex justify-center">
            <a  @click="loginWithGoogle()" class="flex w-full m-1 font-semibold justify-center rounded-md bg-gray-800  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            <font-awesome-icon icon="fa-brands fa-google-plus-g" size="xl" /> Google
            </a>
            <a  @click="loginWithGithub()" class="flex w-full m-1 font-semibold justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              <font-awesome-icon  icon="fa-brands fa-github" size="xl" /> GitHub
            </a>
          </div>
        </div>
        </div>
      </div>
    </div>
</template>