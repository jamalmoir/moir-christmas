<script>
    import "../app.postcss";
    import Particles from "svelte-particles";
    // import { loadFull } from "tsparticles";
    import {loadSnowPreset} from "tsparticles-preset-snow"

    let particlesOptions = {
        background: {
            color: {
                value: "none",
            },
        },
        preset: "snow",
    };

    let particlesInit = async (engine) => {
        await loadSnowPreset(engine);
    };
</script>

<main class="w-full h-screen bg-slate-800">
    <slot />
    <div class="z-0">
        <Particles
            id="tsparticles"
            options={particlesOptions}
            particlesInit={particlesInit}
        />
    </div>
</main>

<style global>
    :root {
        font-family: 'Karla', sans-serif;
    }
</style>