<script setup lang="ts">
import VgroupDetailed from './VgroupDetailed.vue'

const props = defineProps<{
    vgroups: any
}>()


</script>

<template>
    <div>
        <h2>Учётные записи связанные с договором</h2>
        <div class="wrapper">
            <div v-for="(vgroup, index) in vgroups" :key="index">
                <vgroup-detailed :vgroup="vgroup" />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
h2 {
    --size: clamp(1rem, 2vw, 2rem);
    margin: 0 0 calc(var(--size)*.8) 0;
    font-weight: 500;
    font-size: calc(var(--size)*1.2);
    line-height: calc(var(--size)*1.6);
    color: var(--header-dark-text);
    text-align: center;

}

.wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    grid-gap: 10px;
}
</style>