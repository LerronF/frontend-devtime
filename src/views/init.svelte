<script lang="typescript">
    import { onMount } from "svelte";
    import { Loader } from "../components";
    import { LogoIcon } from "../components/icons";
    import { RouteSystem, StatusBarSystem } from "../systems";
    import packg from "./../../package.json";
    let isProcessing = true;
    let textTitle = "Management Portal";
    let textSubTitle = "Itriad Institute";
  
    onMount(() => {
      StatusBarSystem.hide();
      setTimeout(() => {
        RouteSystem.push("/login");
      }, 2000);
    });
  </script>
  
  <style>
    .init {
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100%;
      overflow: hidden;
      justify-content: center;
      align-items: center;
      background-color: var(--color-primary);
    }
    .logo {
      padding: 20px;
    }
    .text {
      font-family: var(--text-font-family);
      color: var(--color-secondary);
      text-align: center;
    }
  
    .textTitle {
      font-size: 24px;
      padding: 8px;
    }
  
    .textSubTitle {
      font-size: 13px;
      letter-spacing: 5px;
    }
  
    .version {
      font-size: 10px;
      padding: 8px;
      letter-spacing: 5px;
    }
  </style>
  
  <div class="init">
    <div class="logo">
      <LogoIcon />
    </div>
    <div class="text">
      <div class="textTitle">{textTitle}</div>
      <div class="textSubTitle">{textSubTitle}</div>
      <div class="version">{packg.version}</div>
    </div>
  </div>
  