<script lang="ts">
    import { getDatabase, ref, push } from 'firebase/database';
    import { app } from '../../firebase/Firebase'; // Import konfigurace a instance aplikace Firebase
  
    // Vytvoření instance Realtime databáze
    const db = getDatabase(app);
  
    let name = '';
    let email = '';
    let phone = '';
    let message = '';
  
    let successModal = false;
    let errorModal = false;
    let showModal = false; // Přidání proměnné showModal
  
    const submitForm = () => {
      const formData = {
        name,
        email,
        phone,
        message,
      };
  
      // Kontrola vyplnění polí a zobrazení modálního okna
      if (name && email && phone && message) {
        // Uložení dat do databáze
        const dbRef = ref(db, 'dotazy');
        push(dbRef, formData);
  
        successModal = true;
        showModal = true; // Aktivace modálního okna
  
        // Vyčištění formuláře po odeslání
        name = '';
        email = '';
        phone = '';
        message = '';
      } else {
        errorModal = true;
        showModal = true; // Aktivace modálního okna
      }
    };
  </script>
  
  <div class="py-16 bg-white">  
    <div class="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
      <div class="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
        <div class="md:5/12 lg:w-5/12 md:justify-end md:text-center">
          <!-- svelte-ignore a11y-img-redundant-alt -->
          <img src="https://firebasestorage.googleapis.com/v0/b/angel-dodov.appspot.com/o/58409940_2197848446969472_8377760544697876480_n%20(1).jpg?alt=media&token=cc3f30a9-44c0-4314-9d09-d1a76bcb8ac6" alt="image" loading="lazy" width="" height="" class="md:mx-auto md:mr-0">
        </div>
        <div class="md:7/12 lg:w-6/12">
          <h2 class="text-2xl text-gray-900 font-bold md:text-4xl text-center">Neváhejte nás kontaktovat</h2>
          <div class="mt-8 mb-8">
            <form on:submit|preventDefault={submitForm} class="max-w-md mx-auto p-4 border border-black rounded">
              <div class="mb-4">
                <label for="name" class="block mb-1">Jméno a Příjmení:</label>
                <input type="text" id="name" bind:value={name} class="w-full border-b-2 border-black focus:outline-none focus:border-blue-500" />
              </div>
              <div class="mb-4">
                <label for="email" class="block mb-1">Email:</label>
                <input type="email" id="email" bind:value={email} class="w-full border-b-2 border-black focus:outline-none focus:border-blue-500" />
              </div>
              <div class="mb-4">
                <label for="phone" class="block mb-1">Telefon:</label>
                <input type="tel" id="phone" bind:value={phone} class="w-full border-b-2 border-black focus:outline-none focus:border-blue-500" />
              </div>
              <div class="mb-4">
                <label for="message" class="block mb-1">Text pro dotaz:</label>
                <textarea id="message" bind:value={message} class="w-full border-2 border-black focus:outline-none focus:border-blue-500"></textarea>
              </div>
              <button type="submit" class="block w-full py-2 px-4 bg-black text-white rounded hover:bg-gray-800 focus:outline-none focus:bg-gray-800">Odeslat</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  {#if showModal}
    <div class="fixed z-10 inset-0 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg sm:w-full">
          <!-- Obsah modálního okna -->
          {#if successModal}
            <div class="text-center">
              <p class="text-green-600 font-semibold">Formulář byl úspěšně odeslán!</p>
              <button class="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700" on:click={() => { showModal = false; successModal = false; }}>Zavřít</button>
            </div>
          {:else if errorModal}
            <div class="text-center">
              <p class="text-red-600 font-semibold">Některá pole nejsou vyplněna správně. Zkontrolujte prosím formulář.</p>
              <button class="mt-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700" on:click={() => { showModal = false; errorModal = false; }}>Zavřít</button>
            </div>
          {/if}
        </div>
      </div>
    </div>
  {/if}