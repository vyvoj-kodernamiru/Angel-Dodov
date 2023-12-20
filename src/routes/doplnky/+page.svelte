<script lang="ts">
 import { onMount, onDestroy } from 'svelte';
import { storage } from '../../lib/firebase/Firebase';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import Poptavka from '$lib/komponenty/Web/Poptavka.svelte';
import Navigation from '$lib/komponenty/Web/Navigation.svelte';
import HeroDoplnky from '$lib/komponenty/Web/HeroDoplnky.svelte';
import Footer from '$lib/komponenty/Web/Footer.svelte';
import DoplnkyFeatures from '$lib/komponenty/Web/DoplnkyFeatures.svelte';

let loadedImages: string[] = [];
let currentImageIndex = 0;
let isLoading = true;
let interval: NodeJS.Timeout;
let itemsPerPage = 8;

onMount(async () => {
  try {
    const storageRef = ref(storage, 'doplnky/');
    const files = await listAll(storageRef);

    loadedImages = await Promise.all(files.items.map(async (fileRef) => {
      const imageUrl = await getDownloadURL(fileRef);
      return imageUrl;
    }));

    isLoading = false;

    interval = setInterval(() => {
      currentImageIndex = (currentImageIndex + 1) % loadedImages.length;
    }, 3000);
  } catch (error) {
    console.error('Chyba při načítání obrázků:', error);
  }
});

onDestroy(() => {
  clearInterval(interval);
});

let selectedImage: string | null = null;
const selectImage = (imageUrl: string) => {
  selectedImage = imageUrl;
};

const minimizeImage = () => {
  selectedImage = null;
};

let currentPage = 0;

function paginatedImages() {
  const start = currentPage * itemsPerPage;
  const end = start + itemsPerPage;
  console.log('Start:', start);
  console.log('End:', end);
  return loadedImages.slice(start, end);
}

function totalPages() {
  return Math.ceil(loadedImages.length / itemsPerPage);
}

function changePage(pageNumber: number) {
  currentPage = pageNumber + 1;
  console.log('Current Page:', currentPage);
}

  </script>

<Navigation/>
<HeroDoplnky/>

{#if isLoading}
<div class="flex justify-center items-center h-screen">
  <div class="border-t-4 border-black rounded-full w-12 h-12 animate-spin"></div>
</div>
{:else}

<div class="py-16 bg-white">  
     <div class="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
         <div class="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
             <div class="md:5/12 lg:w-5/12 md:justify-end md:text-center">
                 <img src="https://firebasestorage.googleapis.com/v0/b/angel-dodov.appspot.com/o/58409940_2197848446969472_8377760544697876480_n%20(1).jpg?alt=media&token=cc3f30a9-44c0-4314-9d09-d1a76bcb8ac6" alt="image" loading="lazy" width="" height="" class="md:mx-auto md:mr-0">
             </div>
             <div class="md:7/12 lg:w-6/12">
                 <h2 class="text-2xl text-gray-900 font-bold md:text-4xl text">Truhlářství DODO - Doplňky</h2>
                 <p class="mt-6 text-center text-gray-600">
                    Naše nabídka doplňků není jen o estetice. Jsou to malé, ale významné prvky, které transformují vaše prostory. Od vkusných detailů po praktické předměty, každý doplněk je pečlivě navržen tak, aby dokreslil atmosféru vašeho domova. Jsme tady, abychom vám nabídli nejen výrobky, ale také příběh a výraz vaší osobnosti skrze každý detail.
                    
                    Těchto pár vět může pomoci zdůraznit vaše služby a přístup k práci s interiéry, exteriéry a doplňky.</p>
             </div>
         </div>
     </div>
 </div>
 
  <DoplnkyFeatures/>
<!-- Display loaded images -->
<div class="container mx-auto p-4">
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
    {#each paginatedImages() as image, index (image)}
      <div class="group relative overflow-hidden rounded-lg">
        <img
          class="h-auto max-w-full transform transition duration-300 group-hover:scale-105"
          src={image}
          alt="Image"
          on:click={() => selectImage(image)}
        />
      </div>
    {/each}
  </div>
</div>

{#if selectedImage !== null}
  <!-- Display selected image in full screen -->
  <div class="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50" on:click={minimizeImage}>
    <img src={selectedImage} alt="Selected Image" class="max-h-full max-w-full" />
  </div>
{/if}

<!-- Pagination -->
<div class="flex justify-center items-center mt-4">
{#each Array.from({ length: totalPages() }) as _, index}
  <button
    type="button"
    class="mx-1 px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 focus:outline-none"
    class:selected={index === currentPage}
    on:click={() => changePage(index)}
  >
    {index + 1}
  </button>
{/each}
</div>
{/if}

  <Poptavka/>
  <!-- Styly pro galerii -->
  <style>
    .max-w-xs {
      max-width: 20rem;
    }
  </style>