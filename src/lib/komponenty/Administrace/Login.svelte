<script lang="ts">
	import { signInWithEmailAndPassword } from 'firebase/auth';
     import { auth } from '../../firebase/Firebase';
     import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
   
     let email = '';
     let password = '';
   
     const handleLogin = async () => {
       try {
         const userCredential = await signInWithEmailAndPassword(auth, email, password);
         const user = userCredential.user;
         // Přesměrování na /admin po úspěšném přihlášení
         // Zde můžete použít `goto` pro směrování v SvelteKit
         // import { goto } from '$app/navigation';
         // goto('/admin');
       } catch (error) {
         console.error('Chyba při přihlašování:', error);
         // Zde můžete zobrazit chybovou zprávu uživateli
       }
     };
   
     onMount(() => {
     
       auth.onAuthStateChanged((user) => {
         if (user) {
         goto('/admin');
         }
      });
     });
   </script>
   
   <div class="max-w-md mx-auto p-6 bg-white rounded shadow-md">
     <h2 class="text-2xl font-bold mb-4">Přihlášení</h2>
     <form on:submit|preventDefault={handleLogin} class="space-y-4">
       <div>
         <label for="email">Email</label>
         <input type="email" id="email" bind:value={email} class="w-full border rounded-md p-2" />
       </div>
       <div>
         <label for="password">Heslo</label>
         <input type="password" id="password" bind:value={password} class="w-full border rounded-md p-2" />
       </div>
       <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded-md">Přihlásit se</button>
     </form>
   </div>
   