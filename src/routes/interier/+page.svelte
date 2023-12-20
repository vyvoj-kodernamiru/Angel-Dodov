<script lang="ts">
import { onMount, onDestroy } from 'svelte';
import { storage } from '../../lib/firebase/Firebase';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import Poptavka from '$lib/komponenty/Web/Poptavka.svelte';
import Navigation from '$lib/komponenty/Web/Navigation.svelte';
import HeroInterier from '$lib/komponenty/Web/HeroInterier.svelte';
import Footer from '$lib/komponenty/Web/Footer.svelte';
	import InterierFeatures from '$lib/komponenty/Web/InterierFeatures.svelte';

let loadedImages: string[] = [];
let currentImageIndex = 0;
let isLoading = true;
let interval: NodeJS.Timeout;
let itemsPerPage = 8;

onMount(async () => {
  try {
    const storageRef = ref(storage, 'interier/');
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
<HeroInterier/>

<!-- Spinner pro zobrazení během načítání -->
{#if isLoading}
  <div class="flex justify-center items-center h-screen">
    <div class="border-t-4 border-black rounded-full w-12 h-12 animate-spin"></div>
  </div>
{:else}

<div class="py-16 bg-white">  
    <div class="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
        <div class="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
            <div class="md:5/12 lg:w-5/12 md:justify-end md:text-center">
                <!-- svelte-ignore a11y-img-redundant-alt -->
                <img src="https://firebasestorage.googleapis.com/v0/b/angel-dodov.appspot.com/o/58409940_2197848446969472_8377760544697876480_n%20(1).jpg?alt=media&token=cc3f30a9-44c0-4314-9d09-d1a76bcb8ac6" alt="image" loading="lazy" width="" height="" class="md:mx-auto md:mr-0">
            </div>
            <div class="md:7/12 lg:w-6/12">
                <h2 class="text-2xl text-gray-900 font-bold md:text-4xl text-center">Truhlářství DODO - Interiér</h2>
                <p class="mt-6 text- text-gray-600 text-center">
                   Naše truhlářské umění nejen dodává do vašeho domova kvalitní nábytek, ale tvoříme jedinečné prostředí s osobitým příběhem. Každý kus, každá textura a linie dřeva je pečlivě vybrána a zpracována, aby nejen esteticky ladila s vaším vkusem, ale také poskytovala praktické využití. Vaše interiéry nejsou pouze prostory, ale místa, kde naše práce vypráví příběh o vašem životě a vkusu, přidává osobnost a podtrhuje vaši jedinečnost.</p>
            </div>
        </div>
    </div>

    <div class="px-4 py-20 mx-auto max-w-7xl">
      <div class="max-w-xl mx-auto">
          <h1 class="mb-4 text-4xl font-bold text-center text-black">Interiérní služby</h1>
          <p class="mb-16 text-base text-center text-black">
          </p>
      </div>
      <div class="grid grid-cols-1 gap-x-4 gap-y-6 lg:gap-x-8 lg:gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          <div class="w-full p-8 mb-5 text-center transition-all bg-white rounded shadow  hover:shadow-lg">
              
                  <!-- Interiér -->
                 
             <a href="/interier/kuchynske-linky"> <h3 class="mb-4 text-2xl font-semibold text-black">Kuchyňské linky</h3></a>
              <p class="text-base text-black ">
                
              </p>
          </div>
          
          
          <div class="w-full p-8 mb-5 text-center transition-all bg-white rounded shadow hover:shadow-lg">
                  <!-- Exteriér -->
                 
              
              <a href="/interier/vestavene-skrine"><h3 class="mb-4 text-2xl font-semibold text-black ">Věstavěné skříně</h3></a>
              <p class="text-base text-black">
              
              </p>
          </div>
          <div class="w-full p-8 mb-5 text-center transition-all bg-white rounded shadow  hover:shadow-lg">                  <!-- Doplňky -->                 
             <a href="/interier/soliter"> <h3 class="mb-4 text-2xl font-semibold text-black ">Solitér</h3></a>
              <p class="text-base text-black ">
               
              </p>
          </div>
      </div>
  </div>
</div>

<InterierFeatures/>

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

<footer>
  <Footer/>
</footer>
