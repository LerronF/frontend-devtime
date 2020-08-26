<script lang="typescript">
    import { SettingsButton } from "../components/icons";
  
    // export let text = "";
  
    const openMenu = () => {
      console.log("Abra o menu");
    };
  </script>
  
  <style>
    li {
      background: transparent;
      font-family: sans-serif;
      font-weight: lighter;
      font-size: 14px;
      margin: 0;
      cursor: pointer;
      padding: 10px;
    }
  
    .tooltip {
      position: relative;
      display: flex;
      width: 52px;
      height: 100%;
      justify-content: center;
      align-items: center;
      padding: 0 10px;
    }
  
    ul {
      visibility: hidden;
      position: absolute;
      right: 0;
      top: 100%;
      display: flex;
      min-width: 100px;
      background-color: var(--color-level-3);
      flex-direction: column;
      align-items: flex-end;
      z-index: 1;
    }
  
    ul li {
      color: black;
      padding: 10px 20px 10px 20px;
      font-family: sans-serif;
      font-size: 15px;
      width: 100%;
      background: var(--color-level-5);
    }
  
    ul li:hover {
      background: var(--color-level-2);
      color: #ffff;
      cursor: pointer;
      font-weight: bold;
    }
  
    li:hover ul {
      visibility: visible;
      cursor: pointer;
    }
  </style>
  
  <li class="tooltip">
    <SettingsButton />
    <ul>
      <li class="um">Profile</li>
      <li class="dois">Logout</li>
    </ul>
  </li>
  