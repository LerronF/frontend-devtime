<script>
    export let width = 32;
    export let height = 32;
  
    const back = () => {
      history.back();
    };
  </script>
  
  <style>
  .back-button {
    cursor: pointer;
  }
  </style>
  
  <svg
    {width}
    {height}
    class="back-button"
    on:mousedown={back}
    enable-background="new 0 0 32 32"
    viewBox="0 0 32 32">
    <rect width="64" height="64" fill="#d8d8d8" rx="16" />
    <path
      clip-rule="evenodd"
      d="M31.106,15H3.278l8.325-8.293
      c0.391-0.391,0.391-1.024,0-1.414c-0.391-0.391-1.024-0.391-1.414,0l-9.9,9.899c-0.385,0.385-0.385,1.029,0,1.414l9.9,9.9
      c0.391,0.391,1.024,0.391,1.414,0c0.391-0.391,0.391-1.024,0-1.414L3.278,17h27.828c0.552,0,1-0.448,1-1
      C32.106,15.448,31.658,15,31.106,15z"
      fill="#121313"
      fill-rule="evenodd"
      id="Arrow_Back" />
  </svg>
  