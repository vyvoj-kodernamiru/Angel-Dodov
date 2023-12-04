<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { writable } from 'svelte/store';
  
    const images = [
      'https://firebasestorage.googleapis.com/v0/b/angel-dodov.appspot.com/o/HERO3.jpg?alt=media&token=9aa2b80f-6b14-4d9d-be52-1dcfba5a7aaf',
      'https://firebasestorage.googleapis.com/v0/b/angel-dodov.appspot.com/o/HERO2.jpg?alt=media&token=09ac5980-192d-4e11-9c02-86f037ba0bd5',
      // Další URL obrázků...
    ];
  
    const texts = [
      {
        title: 'Truhlářství DODO',
        description: 'Kvalita v každém kousku: Truhlářství DODO - Vaše cesta k dokonalému designu',
      },
      // Další nadpisy a popisy...
    ];
  
    let currentImageIndex = writable(0);
  
    let interval: NodeJS.Timeout;
  
    onMount(() => {
      interval = setInterval(() => {
        currentImageIndex.update((val) => (val + 1) % images.length);
      }, 5000); // Interval pro změnu obrázků (například každé 3 sekundy)
  
      return () => clearInterval(interval);
    });
  
    onDestroy(() => clearInterval(interval));
  </script>
  
  <style>
    /* Styly pro plynulý přechod */
    .image-transition {
      opacity: 0;
      transition: opacity 1s ease-in-out;
      z-index: -1;
    }
  
    .image-transition.active {
      opacity: 1;
      z-index: 1;
    }
  </style>
  
  <section class="relative pb-8" style="height: 750px;">
    <div>
      {#each images as image, index}
        <img
          src={image}
          class="absolute top-0 bottom-0 left-0 right-0 object-cover w-full h-full image-transition {index === $currentImageIndex ? 'active' : ''}"
          alt=""
        />
      {/each}
      {#if texts.length > 0}
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-10">
          <h2 class="text-3xl font-bold md:text-4xl lg:text-7xl">{texts[$currentImageIndex].title}</h2>
          <p class="text-base leading-8 lg:text-xl">{texts[$currentImageIndex].description}</p>
        </div>
      {/if}
    </div>
  </section>
  