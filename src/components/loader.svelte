<script>
    export let size = 64;
    export let color = "var(--color-primary)";
    export let enabled = true;
  </script>
  
  <style>
    .loader {
      position: relative;
    }
  
    .circular {
      animation: rotate 2s linear infinite;
      height: 100%;
      transform-origin: center center;
      width: 100%;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
    }
  
    .path {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
      animation: dash 1.5s ease-in-out infinite;
      stroke-linecap: round;
    }
  
    @keyframes rotate {
      100% {
        transform: rotate(360deg);
      }
    }
  
    @keyframes dash {
      0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
      }
      50% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -35px;
      }
      100% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -124px;
      }
    }
  </style>
  
  <div class="loader" style="width:{size}px; height:{size}px;">
    {#if enabled}
      <svg class="circular" viewBox="25 25 50 50">
        <circle
          class="path"
          stroke={color}
          cx="50"
          cy="50"
          r="20"
          fill="none"
          stroke-width="3"
          stroke-miter-limit="10" />
      </svg>
    {/if}
  
  </div>
  