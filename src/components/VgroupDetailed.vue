<script setup lang="ts">
import { computed } from 'vue';
import { currencyFormatter, addressFormatter, dateFormatter } from '@/utils/valuesFormatters';
import { VgroupFull } from '@/types/types';
import { getAmountWithRate, getPersonalDiscountRate } from '@/utils/amountCalc';

const props = defineProps<{
    vgroup: VgroupFull
}>()

const { vgroup, service, addresses } = props.vgroup
const { curshape, blocked, tarifdescr} = vgroup

const statuses: { [key: number]: string } = {
    0: 'Активна',
    1: 'Заблокирована по балансу',
    2: 'Заблокирована пользователем',
    3: 'Фдминистративная блокировка',
    4: 'Заблокирована по балансу',
    5: 'Заблокирована из-за превышения трафика',
    10: 'Отключена',
}
// gets servicerent discounted
const payAmountWithDiscount = computed(() => {
    return getAmountWithRate(vgroup)
})
// gets discount
const discountRate = computed(() => {
    return getPersonalDiscountRate(vgroup)
})

</script>

<template>
    <div class="portal__wrapper">
        <ul class="portal__list">
            <li class="portal__item">
                <h3 class="portal__item-title">Адрес подключения учётной записи</h3>
                <p class="portal__item-content">{{ addressFormatter(addresses[0]['address']) }}</p>
            </li>
            <li class="portal__item">
                <h3 class="portal__item-title">Текущий статус учетной записи</h3>
                <p class="portal__item-content">{{ statuses[blocked] }}</p>
            </li>
            <li class="portal__item">
                <h3 class="portal__item-title">Тариф учетной записи</h3>
                <p class="portal__item-content">{{ tarifdescr }}</p>
            </li>
            <li class="portal__item">
                <h3 class="portal__item-title">Скорость доступа к сети Интернет</h3>
                <p class="portal__item-content">до {{ curshape / 1000 }} Мбит/с</p>
            </li>
            <li v-if="discountRate > 0" class="portal__item">
                <h3 class="portal__item-title">Персональная скидка</h3>
                <p class="portal__item-content">{{ discountRate }}%</p>
            </li>
            <li class="portal__item">
                <h3 class="portal__item-title">Стоимость тарифа{{ discountRate > 0 ? ' с учётом скидки' : '' }}</h3>
                <p class="portal__item-content">{{ currencyFormatter.format(payAmountWithDiscount) }}</p>
            </li>
        </ul>
    </div>
</template>