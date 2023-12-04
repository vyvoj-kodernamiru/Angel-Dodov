<script lang="ts">
  interface Card {
    image: string;
    text: string;
    show: boolean;
  }

  let cards: Card[] = [
    {
      image: 'https://via.placeholder.com/300',
      text: 'Exterier',
      show: false,
    },
    {
      image: 'https://via.placeholder.com/300',
      text: 'Text pro druhý obrázek',
      show: false,
    },
    {
      image: 'https://via.placeholder.com/300',
      text: 'Text pro třetí obrázek',
      show: false,
    },
  ];

  function showText(index: number) {
    cards[index].show = true;
  }

  function hideText(index: number) {
    cards[index].show = false;
  }
</script>

<style>
  .card img {
    transition: transform 0.3s ease-in-out;
  }

  .card:hover img {
    transform: scale(1.05);
  }

  .card .text {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  .card:hover .text {
    opacity: 1;
  }
</style>

<!-- Sekce s kartami -->
<section class="text-center mt-4 md:mt-8">
  <h2 class="text-2xl text-gray-900 font-bold md:text-4xl p-8">Naše služby</h2>
  <div class="flex flex-col md:flex-row md:flex-wrap justify-center gap-4">
    {#each cards as card, index}
      <div
        class="relative inline-block overflow-hidden m-2 md:w-64 md:h-64 transition-transform transform-gpu hover:scale-105"
        on:mouseover={() => showText(index)}
        on:mouseout={() => hideText(index)}
      >
        <img class="w-full h-full object-cover" src={card.image} alt={`Image ${index}`} />
        {#if card.show}
          <span class="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-80 px-2 py-1 rounded text-xs">{card.text}</span>
        {/if}
      </div>
    {/each}
  </div>
</section>

