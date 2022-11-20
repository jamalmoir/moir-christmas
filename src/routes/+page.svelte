<script lang="ts">
    function handleButtonClick() {
        alert("Coming soon!")
    }
</script>

<div class="flex flex-col w-full text-slate-900">
    <div class="w-full h-screen flex flex-col justify-center items-center gap-12">
        <div class="flex flex-col rounded-lg bg-white p-8 md:p-24 gap-4">
            <div class="flex flex-col">
                <div class="text-xs md:text-base">モイア<span class="text-red-900 text-bold">クリスマス</span>２０２２年</div>
                <h1 class="text-slate-900 text-3xl md:text-6xl text-bold">MOIR <span class="text-red-900 text-bold">CHRISTMAS</span> 2022</h1>
                <div class="text-xs md:text-base self-end">クリスマスディナー・お酒・プレゼント交換・ゲーム</div>
            </div>

            <div class="flex flex-col">
                <div class="flex flex-row gap-1 md:gap-4">
                    <img class="w-8 h-8 md:w-16 md:h-16 hover:animate-bounce" src="/people/mai.png" alt="person"/>
                    <img class="w-8 h-8 md:w-16 md:h-16 hover:animate-bounce" src="/people/jamal.png" alt="person"/>
                    <img class="w-8 h-8 md:w-16 md:h-16 hover:animate-bounce" src="/people/shimi.png" alt="person"/>
                    <img class="w-8 h-8 md:w-16 md:h-16 hover:animate-bounce" src="/people/kiuchi.png" alt="person"/>
                    <img class="w-8 h-8 md:w-16 md:h-16 hover:animate-bounce" src="/people/tassan.png" alt="person"/>
                    <img class="w-8 h-8 md:w-16 md:h-16 hover:animate-bounce" src="/people/tsukki.png" alt="person"/>
                    <img class="w-8 h-8 md:w-16 md:h-16 hover:animate-bounce" src="/people/ogata.png" alt="person"/>
                    <img class="w-8 h-8 md:w-16 md:h-16 hover:animate-bounce" src="/people/yuriko.png" alt="person"/>
                    <img class="w-8 h-8 md:w-16 md:h-16 hover:animate-bounce" src="/people/hiroya.png" alt="person"/>
                </div>
            </div>
        </div>

        <div class="self-center absolute bottom-8 md:bottom-12 text-5xl animate-pulse"><img src="/Down_Arrow.svg" alt="Down arrow"/></div>
    </div>

    <div class="flex flex-col rounded-lg bg-white p-8 md:p-24 gap-4">
        <div class="flex flex-col md:flex-row w-full h-fit items-center">
            <div class="w-full md:hidden md:w-1/2 md:p-24 p-12">
                <img class="w-full" src="/santas/eating.svg" alt="santa eating"/>
            </div>
            <div class="flex flex-col gap-2 w-1/2">
                <div class="text-base font-bold md:text-2xl self-center md:self-start">詳細</div>
                <div class="text-xs md:text-2xl">日時：<span class="text-red-900 text-bold">2022/12/24</span> 14:00~</div>
                <div class="text-xs md:text-2xl">場所：東京都世田谷区等々力7−3−28 Terrace T 302</div>
            </div>
            <div class="hidden md:block md:w-1/2 md:p-24">
                <img class="w-full" src="/santas/eating.svg" alt="santa eating"/>
            </div>
        </div>

        <div class="flex flex-col md:flex-row w-full h-fit items-center">
            <div class="w-full md:w-1/2 p-12 md:p-24">
                <img class="w-full" src="/santas/present.svg" alt="santa eating"/>
            </div>
            <div class="flex flex-col gap-4 md:w-1/2">
                <div class="text-base font-bold md:text-2xl self-center md:self-start"><span class="text-red-900 text-bold">プレゼント</span>交換</div>
                <div class="text-xs md:text-2xl">ボタンをタップして交換相手を知ろう</div>
                <button on:click={handleButtonClick} class="w-full md:w-fit bg-red-900 hover:bg-red-600 drop-shadow hover:drop-shadow-lg text-white rounded-lg px-10 py-6">交換しよう</button>
            </div>
        </div>
    </div>
</div>
