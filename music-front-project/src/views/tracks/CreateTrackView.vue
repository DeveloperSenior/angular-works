<script setup lang="ts">

import { dataBaseStore, type Track } from '../../stores/Database';
import { Form, Field, ErrorMessage } from 'vee-validate';
import {
    FwbCarousel, FwbA,
    FwbTable,
    FwbTableBody,
    FwbTableCell,
    FwbTableHead,
    FwbTableHeadCell,
    FwbTableRow, FwbButton, FwbPagination, FwbInput
} from 'flowbite-vue'
import { onMounted, ref, watchEffect } from 'vue'

const nameInput = ref<HTMLInputElement | null>(null)
const filterInput = ref('')

import * as yup from 'yup';
const db = dataBaseStore();
const objectTrack = ref({} as Track)
const tracks = ref([] as Track[]);
const tableHeader = ref([{ name: 'Image', srOnly: true }, { name: 'Name', srOnly: false }, { name: 'Author', srOnly: false }, { name: 'Gender', srOnly: false }, { name: 'Actions', srOnly: true }]);
const schema = yup.object({
    name: yup.string().required('El nombre es obligatorio'),
    author: yup.string().required('El autor es obligatorio').min(5),
    gender: yup.string().required('El genero es obligatorio'),
    imgURL: yup.string()
});
let pictures = [
    { src: 'https://flowbite.com/docs/images/carousel/carousel-1.svg', alt: 'Image 1' },
    { src: 'https://flowbite.com/docs/images/carousel/carousel-2.svg', alt: 'Image 2' },
    { src: 'https://flowbite.com/docs/images/carousel/carousel-3.svg', alt: 'Image 3' },
]
const initFocus = () => {
    if (nameInput.value) {
        nameInput.value.focus();
    }
}
const printData = (data: any) => {
    const { key } = data;
    const track = data.val() as Track;
    track.id = key;
    tracks.value.push(track);
    if (track) {
        pictures.splice(0)
    }
    tracks.value.forEach(track => {
        pictures.push({ src: (track.imgURL as string), alt: (track.name as string) })
    });

    console.log(tracks);
}

const createTrack = async (values: any) => {
    const track = values as Track
    track.id = objectTrack.value.id;
    if (track.id != undefined) {
        db.updateTrack(track, () => {
            objectTrack.value = {};
            initFocus();
        })
    } else {
        db.pushTrack(track, (response: any) => {
            objectTrack.value = {};
            initFocus();
        })
    }
}

const edit = (data: Track) => {
    objectTrack.value = data;
    initFocus();
}

const filter = (value: string) =>{
    db.filter(value)
}

onMounted(() => {
    initFocus();
    db.readListMusic({}, printData);
})


</script>

<template>
    <div class="h-full">
        <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company" />
                <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white-900">Create Tracks!</h2>
            </div>
            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <Form class="space-y-6" @submit="createTrack" :validation-schema="schema">
                    <div>
                        <label for="name" class="block text-sm font-medium leading-6 text-900">Name</label>
                        <div class="mt-2">
                            <Field v-model="objectTrack.name" v-slot="{ field }" name="name" type="text">
                                <input ref="nameInput" v-bind="field"
                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                            </Field>
                            <ErrorMessage class="text-orange-500" name="name" />
                        </div>
                    </div>
                    <div>
                        <div class="flex items-center justify-between">
                            <label for="author" class="block text-sm font-medium leading-6 text-900">Author</label>
                        </div>
                        <div class="mt-2">
                            <Field v-model="objectTrack.author" name="author" type="text"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            <ErrorMessage class="text-orange-500" name="author" />
                        </div>
                    </div>
                    <div>
                        <div class="flex items-center justify-between">
                            <label for="gender" class="block text-sm font-medium leading-6 text-900">Gender</label>
                        </div>
                        <div class="mt-2">
                            <Field v-model="objectTrack.gender" name="gender" type="text"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            <ErrorMessage class="text-orange-500" name="gender" />
                        </div>
                    </div>
                    <div>
                        <div class="flex items-center justify-between">
                            <label for="imgURL" class="block text-sm font-medium leading-6 text-900">URL image</label>
                        </div>
                        <div class="mt-2">
                            <Field v-model="objectTrack.imgURL" name="imgURL" type="text"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            <ErrorMessage class="text-orange-500" name="imgURL" />
                        </div>
                        <div v-if="objectTrack.imgURL" class="mt-2">
                            <img :src="(objectTrack.imgURL as any)" />
                        </div>
                    </div>
                    <button
                        class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Registrar</button>
                </Form>
            </div>
            
        </div>
        <div v-if="tracks.length > 0" class="flex w-full justify-center mb-5">
            <fwb-table hoverable>
                <fwb-table-head>
                    <fwb-table-head-cell v-for="header in tableHeader">
                        <span v-if="header.srOnly" class="sr-only">{{ header.name }}</span>
                        <fwb-table-head-cell v-else>{{ header.name }}</fwb-table-head-cell>
                    </fwb-table-head-cell>
                </fwb-table-head>

                <fwb-table-body>

                    <fwb-table-row v-for="(track, index) in tracks">
                        <fwb-table-cell>
                            <img :src="(track.imgURL as string)" class="w-16 md:w-32 max-w-full max-h-full"
                                :alt="(track.name as string)">
                        </fwb-table-cell>
                        <fwb-table-cell>{{ track.name }}</fwb-table-cell>
                        <fwb-table-cell>{{ track.author }}</fwb-table-cell>
                        <fwb-table-cell>{{ track.gender }}</fwb-table-cell>
                        <fwb-table-cell>
                            <fwb-button @click="edit(track)" color="alternative">Edit</fwb-button>
                        </fwb-table-cell>
                    </fwb-table-row>
                </fwb-table-body>
            </fwb-table>

        </div>
        <!-- 
        <fwb-carousel :pictures="pictures" slide>
        </fwb-carousel> -->
    </div>
</template>

<style>
img {
    width: 100%;
    height: 100%;
}
</style>