<script lang="typescript">
    import { LogoIcon, BackButtonIcon } from "./icons";
    import * as StatusBarSystem from "../systems/statusbar.system";
    import { onMount } from "svelte";
    import { Settings } from "./";
    import type { MenuItem } from "../systems/statusbar.system";
  
    let show = false;
    let title = "";
    let showBackButton = false;
    let leftItems: MenuItem[] = [];
    let rightItems: MenuItem[] = [];
  
    const onStateChange = (state: boolean) => {
      show = StatusBarSystem.isShown();
      title = StatusBarSystem.getTitle();
      showBackButton = StatusBarSystem.isShowBackButton();
      leftItems = StatusBarSystem.getItems().filter((i) => i.side === "left");
      rightItems = StatusBarSystem.getItems().filter((i) => i.side === "right");
    };
  
    function goBack() {
      window.history.back();
    }
  
    onMount(() => {
      StatusBarSystem.stateChange.subscribe(onStateChange);
    });
  </script>
  
  <style>
    .status-bar {
      display: none;
      background-color: #d8d8d8;
      align-items: center;
      width: 100%;
      max-height: 100%;
      height: 64px;
    }
  
    .left {
      padding: 10px;
    }
  
    .center{
      display: flex;
      width: 10%;
    }
    .right {
      padding: 10px;
      display: flex;
      justify-self: flex-end;
      align-self: center;
    }
  
    main {
      justify-content: space-between;
    }
  
    .show {
      display: flex;
    }
  
    h1 {
      margin: 10px;
      text-align: center;
    }
  
    /* button {
      border: none;
      background-color: #d8d8d8;
    } */
  </style>
  
  <main class={`status-bar ${show ? 'show' : ''}`}>
  
    <!-- Left Items -->
    <div class="left">
      {#each leftItems as leftItem}
        <div class="item">
          <svelte:component this={leftItem.component} />
        </div>
      {/each}
  
    </div>
  
    <!-- Center  -->
    <div class="center">
      <LogoIcon width={32} height={32} />
      <h1>{title}</h1>
    </div>
  
    <!-- Right Items -->
    <div class="right">
      {#each rightItems as rightItem}
        <div class="item">
          <svelte:component this={rightItem.component} />
        </div>
      {/each}
    </div>
  
    <!-- {#if showBackButton}
      <button on:click={goBack}>
        <BackButtonIcon />
      </button>
    {/if}
     -->
    <!--   
    <aside style="height: 100%">
      <Settings />
    </aside> -->
  
  </main>
  