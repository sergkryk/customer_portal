<script setup lang="ts">
import VgroupDetailed from './VgroupDetailed.vue'

const props = defineProps<{
    vgroups: any
}>()


</script>

<template>
    <div class="portal">
        <h2 class="portal__title">Учётные записи связанные с договором</h2>
            <!-- <div v-for="(vgroup, index) in vgroups" :key="index"> -->
                <vgroup-detailed v-for="(vgroup, index) in vgroups" :key="index" :vgroup="vgroup" />
            <!-- </div> -->
    </div>
</template>