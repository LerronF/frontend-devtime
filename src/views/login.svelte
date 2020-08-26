<script lang="typescript">

    import { onMount } from "svelte";
      import { fade } from "svelte/transition";
      import { HomeIcon } from "../components/icons";
      import { Loader, Button } from "../components";
      import { to } from "../utils";
      // Services
      import * as AuthService from "../services/auth.service";
      // Systems
      import { StatusBarSystem, RouteSystem } from "../systems";
    
    
      let text = "Login";
      let inProcess = false;
      let inProcessStatus = "";
      let account = "demo";
      let secret = "123456";
    
      const login = async () => {
        inProcess = true;
        inProcessStatus = "Checking your credentials......";
    
        let [error, result] = await to(AuthService.authenticate(account, secret));
    
        if (error) {
          inProcessStatus = error;
        } else {
          AuthService.setToken(result.token);
          
          StatusBarSystem.show();
          RouteSystem.push("/home");
    
        }
    
        inProcess = false;
      };
    
      onMount(()=>{
        StatusBarSystem.hide();
      })
    </script>
    
    <style>
      .login {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
        overflow: scroll;
      }
    
      .logo {
        width: 100%;
        height: 50%;
        bottom: 0;
        right: 0;
        display: block;
        position: fixed;
        z-index: 1;
      }
    
      .form {
        width: 100%;
        height: 64%;;
        padding: 20px;
        display: flex;
        flex-direction: column;
        z-index: 2;
      }
      .form input {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 64px;
        padding: 20px;
        border-radius: 3px;
        margin-bottom: 15px;
        border: none;
        background-color: var(--color-level-3);
        color: var(--color-secondary);
        font-size: 20px;
      }
      ::placeholder {
        color: var(--color-secondary);
      }
    
      .title {
        font-family: var(--text-font-family);
        color: var(--color-text-primary);
        font-size: 3rem;
        margin-bottom: 20px;
      }
      .progress {
        height: 80px;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .progress-status {
        padding: 10px;
      }
    
      @media (min-width: 320px) {
        /* smartphones, portrait iPhone, portrait 480x320 phones (Android) */
      }
      @media (min-width: 480px) {
        /* smartphones, Android phones, landscape iPhone */
    
      }
      @media (min-width: 600px) {
        /* portrait tablets, portrait iPad, e-readers (Nook/Kindle), landscape 800x480 phones (Android) */
    
      }
      @media (min-width: 801px) {
        /* tablet, landscape iPad, lo-res laptops ands desktops */
      }
      @media (min-width: 1024px) {
        /* big landscape tablets, laptops, and desktops */
    
        .logo {
          width: 100%;
          height: 100%;
          max-width: 90%;
          max-height: 100%;
          z-index: 1;
          position: relative;
        }
    
        .form {
          max-width: 30%;            
          margin: 60px;
        }
      }
      @media (min-width: 1281px) {
        /* hi-res laptops and desktops */
        
      }
    </style>
    
    
    <div class="login" in:fade>
      <div class="form">
        <h1 class="title">{text}</h1>
        <form action="">
          <input
            disabled={inProcess}
            placeholder="Account"
            type="text"
            bind:value={account} />
          <input
            disabled={inProcess}
            placeholder="Password"
            type="password"
            bind:value={secret} />
        </form>
    
        <Button text="LOGIN" disabled={inProcess} on:click={login}/>
    
        <div class="progress">
          {#if inProcess}
            <Loader />
          {/if}
          <span class="progress-status">{inProcessStatus}</span>
        </div>
    
      </div>
      <div class="logo">
        <HomeIcon />
      </div>
    </div>
    