<script>
    import { onMount } from 'svelte';
  
    const images = [
      'url(https://firebasestorage.googleapis.com/v0/b/angel-dodov.appspot.com/o/IMG_7369-min.jpeg?alt=media&token=7104a94f-b360-4999-b9b5-49e290a84fa0)',
      
      'url(https://firebasestorage.googleapis.com/v0/b/angel-dodov.appspot.com/o/IMG_7369-min.jpeg?alt=media&token=7104a94f-b360-4999-b9b5-49e290a84fa0',
      // Další URL obrázků...
    ];
  
    let currentImageIndex = 0;
  
    onMount(() => {
      const interval = setInterval(() => {
        const bgImageElement = document.getElementById('bgImage');
        if (bgImageElement) {
          bgImageElement.classList.add('bg-image-hidden');
          setTimeout(() => {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            if (bgImageElement) {
              bgImageElement.style.backgroundImage = images[currentImageIndex];
              bgImageElement.classList.remove('bg-image-hidden');
            }
          }, 500);
        }
      }, 5000);
  
      return () => clearInterval(interval); // Zastavit interval při odstranění komponenty
    });
  </script>
  
  <style>
    /* Základní styly pro obrázek */
    .bg-image {
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      transition: opacity 0.5s ease-in-out, background 0.5s ease-in-out;
      opacity: 1;
      position: relative;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
  </style>
  
  <section class="relative">
    <div class="bg-image" id="bgImage">
      <div class="opacity-75 absolute inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>
  
      <div class="relative mx-auto max-w-screen-xl px-4 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
        <div class="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
          <div class="text-center-desktop">
            <h1 class="text-3xl font-extrabold sm:text-5xl text-center text-white">
              Truhlářství DODO
              <strong class="block font-extrabold text-rose-700 text-center"></strong>
            </h1>
  
            <p class="mt-4 max-w-lg sm:text-xl/relaxed text-white">
              Kvalita v každém kousku: Truhlářství DODO - Vaše cesta k dokonalému designu
            </p>
  
            <div class="mt-8 flex flex-wrap gap-4 justify-center"> <!-- Upraveno zarovnání odkazů na střed -->
              <a href="/" class="block rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring">
                Zavolat 
              </a>
  
              <a href="/" class="block rounded bg-white px-12 py-3 text-sm font-medium text-rose-600 shadow hover:text-rose-700 focus:outline-none focus:ring">
                Napsat Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  