<script setup lang="ts">
import { dataBaseStore, type Track } from '../stores/Database';
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
const db = dataBaseStore();

const tableHeader = ref([{ name: 'Image', srOnly: true }, { name: 'Name', srOnly: false }, { name: 'Author', srOnly: false }, { name: 'Gender', srOnly: false }, { name: 'Actions', srOnly: true }]);
const tracks = ref([] as Track[]);

const links = [
  { name: 'Open roles', href: '#' },
  { name: 'Internship program', href: '#' },
  { name: 'Our values', href: '#' },
  { name: 'Meet our leadership', href: '#' },
]
const stats = [
  { name: 'Offices worldwide', value: '12' },
  { name: 'Full-time colleagues', value: '300+' },
  { name: 'Hours per week', value: '40' },
  { name: 'Paid time off', value: 'Unlimited' },
]

const printData = (data: any) => {
    const { key } = data;
    const track = data.val() as Track;
    track.id = key;
    tracks.value.push(track);

    console.log(tracks);
}

const like = (data: Track) => {
  db.pushTrackLikeUser(data)
}

onMounted(() => {
    db.readListMusic({}, printData);
})

</script>

<template>
  <main>
    <div class="backdrop-blur-sm bg-white/30 ...">
      <!-- ... -->
    
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
          <h2 class="text-4xl font-bold tracking-tight text-white sm:text-6xl">Best music &rarr; one place!</h2>
          <!-- <p class="mt-6 text-lg leading-8 text-gray-300">Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.</p> -->
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
                      <fwb-table-cell>
                          <button @click="like(track)" color="alternative" class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                            <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-800 rounded-md group-hover:bg-opacity-0">
                              Like
                              </span>
                          </button>
                      </fwb-table-cell>
                  </fwb-table-row>
              </fwb-table-body>
          </fwb-table>

      </div>

        
        <div class="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
          <div class="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
            <a v-for="link in links" :key="link.name" :href="link.href">{{ link.name }} <span aria-hidden="true">&rarr;</span></a>
          </div>
          <dl class="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
            <div v-for="stat in stats" :key="stat.name" class="flex flex-col-reverse">
              <dt class="text-base leading-7 text-gray-300">{{ stat.name }}</dt>
              <dd class="text-2xl font-bold leading-9 tracking-tight text-white">{{ stat.value }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </div>
  </main>
</template>