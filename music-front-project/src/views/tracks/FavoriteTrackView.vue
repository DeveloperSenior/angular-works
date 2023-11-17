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
const tableHeader = ref([{ name: 'Image', srOnly: true }, { name: 'Name', srOnly: false }, { name: 'Author', srOnly: false }, { name: 'Gender', srOnly: false }]);
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

const edit = (data: Track) => {
    objectTrack.value = data;
    initFocus();
}

const filter = (value: string) =>{
    db.filter(value)
}

onMounted(() => {
    initFocus();
    db.readListFavorite({}, printData);
})


</script>

<template>
    <div class="h-full">
        <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company" />
                <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white-900">Favorites Tracks!</h2>
            </div>
            
            <div v-if="tracks.length > 0" class="flex w-full justify-center mb-5 mt-5">
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
                        </fwb-table-row>
                    </fwb-table-body>
                </fwb-table>
    
            </div>
        </div>
       
    </div>
</template>

<style>
img {
    width: 100%;
    height: 100%;
}
</style>