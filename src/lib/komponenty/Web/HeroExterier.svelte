<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	const imageUrls: string[] = [
		'https://firebasestorage.googleapis.com/v0/b/angel-dodov.appspot.com/o/IMG_7369-min.jpeg?alt=media&token=7104a94f-b360-4999-b9b5-49e290a84fa0',
		'https://firebasestorage.googleapis.com/v0/b/angel-dodov.appspot.com/o/IMG_4181-min.jpeg?alt=media&token=1dd89652-db3f-4ed8-87f8-42ea8506a75e',
		'https://firebasestorage.googleapis.com/v0/b/angel-dodov.appspot.com/o/IMG_7376-min.jpeg?alt=media&token=6989d448-8c48-4804-b8af-9fa5b2c57241',
		// Další URL obrázků...
	];

	let currentImageIndex: number = 0;
	const imageObjects: HTMLImageElement[] = [];

	// Funkce pro přednačtení obrázků
	const preloadImages = (): void => {
		imageUrls.forEach(url => {
			const img = new Image();
			img.src = url;
			imageObjects.push(img);
		});
	};

	onMount(() => {
		preloadImages();

		const bgImageElement: HTMLElement | null = document.getElementById('bgImage');
		if (bgImageElement) {
			bgImageElement.style.backgroundImage = `url(${imageUrls[currentImageIndex]})`;
		}
		
		const interval = setInterval(() => {
			if (bgImageElement) {
				bgImageElement.classList.add('bg-image-hidden');
				setTimeout(() => {
					currentImageIndex = (currentImageIndex + 1) % imageUrls.length;
					if (bgImageElement) {
						bgImageElement.style.backgroundImage = `url(${imageUrls[currentImageIndex]})`;
						bgImageElement.classList.remove('bg-image-hidden');
					}
				}, 500);
			}
		}, 3000);

		return () => clearInterval(interval);
	});

	// Funkce pro získání názvu podstránky z URL segmentu
	function getTitleFromSegment(segment: string): string {
		switch (segment) {
			case 'interier':
				return 'Interiér';
			case 'exterier':
				return 'Exteriér';
			case 'doplnky':
				return 'Doplňky';
			default:
				return '';
		}
	}
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
    <div class=" absolute inset-0 "></div>

    <div class="relative mx-auto max-w-screen-xl px-4 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
      <div class="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
        <div class="text-center-desktop">
          <h1 class="text-3xl font-extrabold sm:text-5xl text-center text-white">
            Truhlářství DODO - Exteriér
            <strong class="block font-extrabold text-center">
              {getTitleFromSegment($page.params.segment)}
            </strong>
          </h1>

          <h1 class="mt-4 max-w-lg sm:text-xl/relaxed text-white">
            Kvalita v každém kousku: Truhlářství DODO - Vaše cesta k dokonalému designu
          </h1>

          <div class="mt-8 flex flex-wrap gap-4 justify-center"> <!-- Upraveno zarovnání odkazů na střed -->
            <a href="/" class="block rounded bg-hneda px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring">
              Zavolat 
            </a>

            <a href="/" class="block rounded bg-white px-12 py-3 text-sm font-medium text-black shadow hover:text-blackfocus:outline-none focus:ring">
              Napsat Email
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
