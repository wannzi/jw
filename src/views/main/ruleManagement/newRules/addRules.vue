<template>
    <div class="addRules">
        <div class="addRules_left">
            11
        </div>
        <div class="addRules_center">
            <div class="addRules_top"></div>
            <div class="addRules_bottom"></div>
        </div>
        <div class="addRules_right"></div>

    </div>
</template>
<script>
export default {
    data() {
        return {
        }
    },
    activated() {
    },
    watch: {
    },
    created() {
    },
    mounted() {
    },
    methods: {
    }


}
</script>
<style>
.addRules {
    /* height: 100px; */
    padding-top: 10vh;
}

.addRules_left {
    width: 15vw;
    height: 100%;
}

.addRules_left::before {
    position: relative;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    /* 遮罩层宽度与左侧导航相同 */
    height: 100%;
    /* 遮罩层高度与左侧导航相同 */
    background-color: rgba(166, 157, 157, 0.1);
    /* 半透明黑色背景 */
    z-index: 1;
    /* 确保遮罩层在左侧导航内容之上 */
    /* pointer-events: none; */
}
</style>
