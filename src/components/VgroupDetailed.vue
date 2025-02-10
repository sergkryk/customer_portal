<script setup lang="ts">
import { computed } from 'vue';
import { currencyFormatter, addressFormatter } from '@/utils/valuesFormatters';

const props = defineProps<{
    vgroup: any
}>()

const { vgroup, staff, addresses } = props.vgroup

const { vgid, curshape, blocked, servicerent, agentdescr, tarifdescr, login, currentmodifier } = vgroup

const status = computed(() => {
    if (Number(blocked) === 1) {
        return 'Заблокирована'
    } else {
        return 'Активна'
    }
})

const payAmountWithDiscount = computed(() => {
    if (currentmodifier?.type === 'rate' && currentmodifier?.value && Number(currentmodifier.value) < 1) {
        return Number(servicerent) * (Number(currentmodifier.value));
    } else {
        return Number(servicerent);
    }
})

</script>

<template>
    <div class="portal">
    <h2 class="portal__title">Учетная запись № {{ vgid }}</h2>
    <ul class="portal__list">
        <li class="portal__item">
            <h3 class="portal__item-title">Адрес подключения учётной записи</h3>
            <p class="portal__item-content">{{ addressFormatter(addresses[0]['address']) }}</p>
        </li>
        <li class="portal__item">
            <h3 class="portal__item-title">Текущий статус учетной записи</h3>
            <p class="portal__item-content">{{ status }}</p>
        </li>
        <li class="portal__item">
            <h3 class="portal__item-title">Тариф учетной записи</h3>
            <p class="portal__item-content">{{ tarifdescr }}</p>
        </li>
        <li class="portal__item">
            <h3 class="portal__item-title">Скорость доступа к сети Интернет</h3>
            <p class="portal__item-content">до {{ curshape/1000 }} Мбит/с</p>
        </li>
        <li class="portal__item">
            <h3 class="portal__item-title">Абонплата по тарифу</h3>
            <p class="portal__item-content">{{ currencyFormatter.format(servicerent) }}</p>
        </li>
        <li class="portal__item">
            <h3 class="portal__item-title">Сумма абонплаты с учетом скидки</h3>
            <p class="portal__item-content">{{ currencyFormatter.format(payAmountWithDiscount) }}</p>
        </li>
        <li class="portal__item">
            <h3 class="portal__item-title">Тип подключения к Интернету</h3>
            <p class="portal__item-content">{{ agentdescr }}</p>
        </li>
        <li class="portal__item">
            <h3 class="portal__item-title">Логин для подключения к Интернету</h3>
            <p class="portal__item-content">{{ login }}</p>
        </li>
    </ul>
</div>
</template>

<style scoped lang="scss">
.portal__title {
    color: #3e403e;
    font-size: clamp(1.2rem, 2vw, 2rem);
}
</style>