<script>
    import "../app.css";
    import Navigation from "$lib/komponenty/Web/Navigation.svelte";
	import Footer from "$lib/komponenty/Web/Footer.svelte";
  </script>
  
  <Navigation/>
  
  <slot />

  <footer>
    <Footer/>
  </footer>
