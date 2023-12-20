<script lang="ts">
import { onMount, onDestroy } from 'svelte';
import { storage } from '../../lib/firebase/Firebase';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import Poptavka from '$lib/komponenty/Web/Poptavka.svelte';
import Navigation from '$lib/komponenty/Web/Navigation.svelte';
import HeroExterier from '$lib/komponenty/Web/HeroExterier.svelte';
import ExterierFeatures from '$lib/komponenty/Web/ExterierFeatures.svelte';
import Footer from '$lib/komponenty/Web/Footer.svelte';

let loadedImages: string[] = [];
let currentImageIndex = 0;
let isLoading = true;
let interval: NodeJS.Timeout;
let itemsPerPage = 8;

onMount(async () => {
  try {
    const storageRef = ref(storage, 'exterier/');
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
<HeroExterier/>

{#if isLoading}
  <!-- Loading indicator -->
  <div class="flex justify-center items-center h-screen">
    <div class="border-t-4 border-black rounded-full w-12 h-12 animate-spin"></div>
  </div>
{:else}

<ExterierFeatures/>
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

  <Poptavka/>
<footer>
  <Footer/>
</footer>
  {/if}

