<script setup lang="ts">
import { computed } from 'vue';
import { currencyFormatter, dateFormatter } from '@/utils/valuesFormatters';
import { BackendResponse } from '@/types/types';
import { getAmountWithRate } from '@/utils/amountCalc';

const props = defineProps<{
    user: BackendResponse
}>()

const { agreements, vgroups } = props.user

const activeVgroups = vgroups.filter(item => item.vgroup.blocked === 0 && item.vgroup.servicerent * item.vgroup.currentmodifier.value > 0)

const allVgroupsAmountSummary = computed(() => {
    return activeVgroups.reduce((acc, item) => {
        const { vgroup, service } = item;
        const amountWithRate = getAmountWithRate(vgroup)
        if (amountWithRate <= 0) {
            return acc
        }
        const amountWithRatePerMonth = service.rentperiod === 1 ? amountWithRate : amountWithRate * new Date(nextMonth.value.getFullYear(), nextMonth.value.getMonth() + 1, 0).getDate()
        acc = acc + amountWithRatePerMonth
        return acc
    }, 0)
})

const nextMonth = computed(() => {
    const now = new Date();
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    return nextMonth
})

const servicesExpirationDate = computed((): number | null => {
    if (activeVgroups.every(el => el.service.rentperiod === 1)) {
        const totalMonths = Math.floor(agreements.balance / allVgroupsAmountSummary.value)
        const now = new Date();
        return now.setMonth(nextMonth.value.getMonth() + totalMonths, 1);
    }
    if (activeVgroups.every(el => el.service.rentperiod === 2)) {
        const totalDays = Math.floor(agreements.balance / getAmountWithRate(activeVgroups[0].vgroup))
        const now = new Date();
        return now.setDate(now.getDate() + totalDays + 1);
    }
    return null
})

const recommendedAmountToPay = computed(() => {
    if (agreements.balance / allVgroupsAmountSummary.value >= 1 && servicesExpirationDate.value !== null) {
        return `Всё в порядке, можно не платить до ${dateFormatter.format(servicesExpirationDate.value)}`
    }
    const rest = agreements.balance % allVgroupsAmountSummary.value
    return currencyFormatter.format(allVgroupsAmountSummary.value - rest)
})
</script>

<template>
    <div class="portal" v-if="activeVgroups.length > 0">
        <h2 class="portal__title">Стоимость услуг по договору</h2>
        <div class="portal__wrapper">
            <ul class="portal__list">
                <li class="portal__item">
                    <h3 class="portal__item-title">Количество платных услуг</h3>
                    <p class="portal__item-content">{{ activeVgroups.length }}</p>
                </li>
                <li class="portal__item">
                    <h3 class="portal__item-title">Cтоимость платных услуг за месяц</h3>
                    <p class="portal__item-content">{{ currencyFormatter.format(allVgroupsAmountSummary) }}</p>
                </li>
                <li class="portal__item">
                    <h3 class="portal__item-title">Доступный аванс на счету договора</h3>
                    <p class="portal__item-content">{{ currencyFormatter.format(agreements.balance) }}</p>
                </li>
                <li class="portal__item" v-if="servicesExpirationDate !== null">
                    <h3 class="portal__item-title">Срок действия услуг с учётом аванса</h3>
                    <p class="portal__item-content">до {{ dateFormatter.format(servicesExpirationDate) }}</p>
                </li>
                <li class="portal__item">
                    <h3 class="portal__item-title">Рекомендуемый платеж</h3>
                    <p class="portal__item-content">{{ recommendedAmountToPay }}</p>
                </li>
            </ul>
        </div>
    </div>
</template>