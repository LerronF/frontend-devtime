<script lang="typescript">
    import { RouteSystem } from "../systems";
    import { onMount } from "svelte";
  
    let component = RouteSystem.component;
    let params = RouteSystem.params;
  
    const handleNavigation = (obj) => {
      component = RouteSystem.component;
      params = RouteSystem.params;
    };
  
    onMount(() => {
      RouteSystem.onNavigate.subscribe(handleNavigation);
    });
  </script>
  
  <svelte:component this={component} {params} />
  