<script lang="ts">
  import { storage } from '$lib/firebase/Firebase'; // Import Firebase storage
  import { getDownloadURL, ref, listAll, deleteObject, uploadBytes } from 'firebase/storage'; // Firebase Storage functions
	import { onMount } from 'svelte';
  import Swal from 'sweetalert2'; // Import SweetAlert

  let images: string[] = []; // array pro ukládání URL fotek
  let selectedFile: File; // Proměnná pro uložení vybraného souboru

  const loadImages = async () => {
    const storageRef = ref(storage, 'interier'); // Reference na složku s fotkami ('interier' podle tvého popisu)
    const files = await listAll(storageRef); // Získání seznamu souborů ve složce

    for (const file of files.items) {
      const url = await getDownloadURL(file); // Získání URL pro každý soubor
      images = [...images, url]; // Přidání URL do pole images
    }
  };

  const deleteImage = async (imageUrl: string) => {
    const shouldDelete = await Swal.fire({
      title: 'Opravdu chcete smazat fotku?',
      text: 'Tento proces nelze vrátit zpět!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ano, smazat',
      cancelButtonText: 'Zrušit',
    });

    if (shouldDelete.isConfirmed) {
      const imageRef = ref(storage, imageUrl); // Reference na konkrétní obrázek
      await deleteObject(imageRef); // Smazání obrázku z Storage
      images = images.filter((image) => image !== imageUrl); // Odstranění smazaného obrázku z listu
    }
  };

  const handleFileChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      selectedFile = input.files[0];
    }
  };

  const uploadImage = async () => {
    if (selectedFile) {
      const storageRef = ref(storage, `interier/${selectedFile.name}`); // Reference na umístění nového souboru
      await uploadBytes(storageRef, selectedFile); // Nahraje vybraný soubor do Firebase Storage
      images = []; // Vyčistit seznam a znovu načíst obrázky po nahrání nového
      await loadImages();
    }
  };

  onMount(async () => {
    await loadImages(); // Načtení obrázků při zobrazení komponenty
  });
</script>
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {#each images as image}
    <div class="bg-white rounded-lg overflow-hidden shadow-md">
      <img class="w-full h-48 object-cover transition duration-300 transform hover:scale-105" src={image} />
      <div class="p-4 flex justify-end">
        <button
          class="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded transition duration-300"
          on:click={() => deleteImage(image)}
        >
          Smazat
        </button>
      </div>
    </div>
  {/each}
</div>

<div class="mt-4">
  <input type="file" on:change={handleFileChange} />
  <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-2" on:click={uploadImage}>Nahrát</button>
</div>