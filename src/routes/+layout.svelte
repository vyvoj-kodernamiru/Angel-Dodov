<script>
    import "../app.css";
    import Navigation from "$lib/komponenty/Web/Navigation.svelte";
	import Footer from "$lib/komponenty/Web/Footer.svelte";
	import Hero from "$lib/komponenty/Web/Hero.svelte";
  </script>
  <div class="bg-white">

  <slot />

  <footer>
    <Footer/>
  </footer>
</div>