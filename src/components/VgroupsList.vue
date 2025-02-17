<script setup lang="ts">
import VgroupDetailed from './VgroupDetailed.vue'

const props = defineProps<{
    vgroups: any
}>()


</script>

<template>
    <div class="portal">
        <h2 class="portal__title">Учётные записи связанные с договором</h2>
        <div class="wrapper">
            <vgroup-detailed v-for="(vgroup, index) in vgroups" :key="index" :vgroup="vgroup" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.wrapper {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
	grid-gap: 10px;
}
</style>