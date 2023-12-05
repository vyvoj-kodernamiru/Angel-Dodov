<script lang="ts">
  import { onMount } from 'svelte';
  import { storage } from '../../lib/firebase/Firebase';
  import { getDownloadURL, listAll, ref } from 'firebase/storage';

  let loadedImages: HTMLImageElement[] = []; // Pole pro načtené obrázky
  let isLoading = true; // Proměnná pro zobrazení spinneru

  onMount(async () => {
    try {
      // Načtení seznamu souborů z úložiště Firebase
      const storageRef = ref(storage, 'interier/');
      const files = await listAll(storageRef);

      // Načtení URL obrázků
      const imagePromises = files.items.map(async (fileRef) => {
        const imageUrl = await getDownloadURL(fileRef);
        return new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = imageUrl;
        });
      });

      // Počkání na načtení všech obrázků
      loadedImages = await Promise.all(imagePromises);
      isLoading = false; // Nastavení načítání na false po načtení obrázků
    } catch (error) {
      console.error('Chyba při načítání obrázků:', error);
    }
  });
</script>

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
                <h2 class="text-2xl text-gray-900 font-bold md:text-4xl">Truhlářství DODO - Interiér</h2>
                <p class="mt-6 text- text-gray-600">
                   Naše truhlářské umění nejen dodává do vašeho domova kvalitní nábytek, ale tvoříme jedinečné prostředí s osobitým příběhem. Každý kus, každá textura a linie dřeva je pečlivě vybrána a zpracována, aby nejen esteticky ladila s vaším vkusem, ale také poskytovala praktické využití. Vaše interiéry nejsou pouze prostory, ale místa, kde naše práce vypráví příběh o vašem životě a vkusu, přidává osobnost a podtrhuje vaši jedinečnost.</p>
            </div>
        </div>
    </div>
</div>
  
  <!-- Zobrazení načtených obrázků v galerii -->
  <div class="flex flex-wrap justify-center">
    {#each loadedImages as image}
      <div class="max-w-xs mx-auto p-4">
        <!-- svelte-ignore a11y-img-redundant-alt -->
        <img src={image.src} alt="Gallery Image" class="w-full h-auto rounded-lg">
      </div>
    {/each}
  </div>
  {/if}
  <!-- Styly pro galerii -->
  <style>
    .max-w-xs {
      max-width: 20rem;
    }
  </style>