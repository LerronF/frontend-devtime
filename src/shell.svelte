<script lang="typescript">
    /** Imports */
    import { onMount } from "svelte";
    import { Router, StatusBar } from "./components";
    import { RouteSystem } from "./systems";
  
    import {
      InitView,
      LoginView,
      //HomeView,
      
    } from "./views";
  
    const routes = {
      // Exact path
      "/": InitView,
  
      // Using named parameters, with last being optional
      "/login": LoginView,
  
      // Wildcard parameter
      //"/home": HomeView,

      // Catch-all
      // This is optional, but if present it must be the last
      //'*': NotFound,
    };
  
    onMount(async () => {
      RouteSystem.setRouter(routes);
    });
  </script>
  
  <style>
    @import "./reset.css";
  
    :root {
      --text-font-family: "Poppins", sans-serif;
  
      --color-success: #6bcf81;
      --color-info: #6b96cf;
      --color-alert: #ef0078;
  
      --color-primary: #555555;
      --color-secondary: #ffff;
      --color-primary-light: #edf1ff;
  
      --color-text-primary: #4c4a4d;
      --color-text-secondary: #696969;
  
      --color-bg: #f3f3f3;
  
      --color-epic: #9b15c4;
      --color-epic-light: #c07cd4;
      --color-story: #03b312;
      --color-story-light: #89d38f;
  
      --color-level-0: #292828;
      --color-level-1: #454444;
      --color-level-2: #6c6c6c;
      --color-level-3: #adacac;
      --color-level-4: #ecebeb;
      --color-level-5: #d8d8d8;
    }
  
    :global(html),
    :global(body) {
      margin: 0;
      padding: 0;
    }
  
    :not(input):not(textarea),
    :not(input):not(textarea)::after,
    :not(input):not(textarea)::before {
      -webkit-user-select: none;
      user-select: none;
      cursor: default;
    }
  
    .shell {
      background: var(--color-bg); /** TODO: remove */
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
  
    .container {
      height: 100%;
      width: 100%;
      justify-content: center;
      align-items: center;
      position: relative;
      display: flex;
      flex-direction: column;
    }
  
    :global(html, body, .shell) {
      height: 100%;
      width: 100%;
      font-family: "Roboto", sans-serif;
      background: white;
      overflow: hidden;
    }
  
    :global(::-webkit-scrollbar) {
      width: 4px;
      background: transparent;
      height: 8px;
    }
  
    :global(::-webkit-scrollbar-thumb) {
      background: var(--color-level-3);
      border-radius: 10px;
    }
  </style>
  
  <!-- Simulate a Shell Architecture -->
  <div class="shell">
    <!-- <Modal {...modalState} /> -->
    <div class="container">
      <StatusBar />
      <Router />
  
    </div>
  </div>
  