<script>
    export let disabled = false;
    export let text = "";
  </script>
  
  <style>
    .button {
      height: 64px;
      width: 60%;
      align-self: center;
      background: var(--color-level-3);
      border: none;
      border-radius: 32px;
      color: var(--color-level-4);
      transition: 0.2s;
    }
    .button:hover {
      background-color: var(--color-level-3);
    }
  </style>
  
  
  <button {disabled} class="button" on:click>
    {text}
    <slot />
    <span />
  </button>
  