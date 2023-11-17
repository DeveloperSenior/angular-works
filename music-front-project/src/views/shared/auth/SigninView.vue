<script setup lang="ts">
import { useUserStore } from '../../../stores/Auth'
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
const userStore = useUserStore()


const schema = yup.object({
  email: yup.string().required('El correo electronico es obligatorio').email('No cumple con el formato de correo'),
  password: yup.string().required('La contraseña es obligatoria').min(8),
  confirmPassword: yup.string().oneOf([yup.ref('password'), ''], 'La contraseña es diferente')
});


const signin = async (values: any)=>{
    userStore.createUser(values.email,values.password)
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
                <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white-900">Creación de tu cuenta!</h2>
            </div>

            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <Form class="space-y-6" @submit="signin" :validation-schema="schema">
                    <div>
                        <label for="email" class="block text-sm font-medium leading-6 text-900">Correo electronico</label>
                        <div class="mt-2">
                            <Field name="email" type="email" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            <ErrorMessage class="text-orange-500" name="email" />
                        </div>
                    </div>
                    <div>
                        <div class="flex items-center justify-between">
                            <label for="password" class="block text-sm font-medium leading-6 text-900">Contraseña</label>
                        </div>
                        <div class="mt-2">  
                            <Field name="password" type="password" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            <ErrorMessage class="text-orange-500" name="password" />
                        </div> 
                    </div>
                    <div>
                        <div class="flex items-center justify-between">
                            <label for="confirmPassword" class="block text-sm font-medium leading-6 text-900">Confirmar Contraseña</label>
                        </div>
                        <div class="mt-2">  
                            <Field name="confirmPassword" type="password" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            <ErrorMessage class="text-orange-500" name="confirmPassword" />
                        </div> 
                    </div>
                    <button class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Registrar</button>
                  </Form>
                  <div>
                    <p class="mt-10 text-center text-sm text-gray-500">
                      O registrate con</p>
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