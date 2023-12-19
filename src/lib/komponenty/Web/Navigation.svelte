<script lang="ts">
   let isMenuOpen = false;

function toggleMenu() {
  isMenuOpen = !isMenuOpen;
}

function closeMenu() {
  isMenuOpen = false;
}

function navigateTo(url: string) {
  window.location.href = url;
  closeMenu(); // Zavře menu po přechodu na novou stránku
}
</script>

<header class="bg-black text-white shadow-lg sticky top-0 z-50">
  <div class="container mx-auto flex items-center justify-between h-32">
    <!-- Logo -->
    <a href="/" class="flex items-center">
      <img class="h-32 md:h-32" src="https://firebasestorage.googleapis.com/v0/b/angel-dodov.appspot.com/o/58409940_2197848446969472_8377760544697876480_n%20(1).jpg?alt=media&token=cc3f30a9-44c0-4314-9d09-d1a76bcb8ac6" alt="" />
    </a>
    <!-- Navigace -->
    <nav class="hidden md:flex items-center">
      <ul class="flex items-center space-x-4 font-semibold text-base lg:text-lg">
        <li class="p-5 xl:p-8 active">
          <a href="/">
            <span>Domů</span>
          </a>
        </li>
        <li class="p-5 xl:p-8">
          <a href="/interier">
            <span>Interiér</span>
          </a>
        </li>
        <li class="p-5 xl:p-8">
          <a href="/exterier">
            <span>Exteriér</span>
          </a>
        </li>
        <li class="p-5 xl:p-8">
          <a href="/doplnky">
            <span>Doplňky</span>
          </a>
        </li>
      </ul>
    </nav>
    <!-- Hamburger menu button only visible on mobile -->
    <button class="block md:hidden text-2xl focus:outline-none ml-auto" aria-label="Menu" on:click={toggleMenu}>
      &#9776;
    </button>
  </div>
  <!-- Responzivní menu pro mobilní zařízení -->
  {#if isMenuOpen}
    <div class="md:hidden fixed inset-0 bg-black bg-opacity-50" on:click={closeMenu}></div>
    <div class="md:hidden absolute top-0 right-0 m-4">
      <ul class="text-base lg:text-lg bg-black absolute top-16 right-0 w-40 flex flex-col space-y-4 p-4 rounded-lg shadow-lg">
        <li>
          <a href="/" class="block py-2 text-white hover:bg-gray-800">Domů</a>
        </li>
        <li>
          <a href="/interier" class="block py-2 text-white hover:bg-gray-800">Interiér</a>
        </li>
        <li>
          <a href="/exterier" class="block py-2 text-white hover:bg-gray-800">Exteriér</a>
        </li>
        <li>
          <a href="/doplnky" class="block py-2 text-white hover:bg-gray-800">Doplňky</a>
        </li>
      </ul>
    </div>
  {/if}
</header>

<style>
  /* Tvé existující styly */
</style>
