<script setup lang="ts">
import { computed } from 'vue';
import PaymentForm from './PaymentForm.vue'
import { currencyFormatter, dateFormatter } from '@/utils/valuesFormatters';
import { Account, Agreement } from '@/types/types';
const props = defineProps<{
    agreement: Agreement
    account: Account
}>()

const { vgroups, balance, credit, date, operid, number } = props.agreement

const formattedNumber = number.replace(/[^0-9]/g, '')

const billingAccountNumber = computed(() => {
    if (operid === 4016 && props.account.login.match(/^(user_)(\d{4})$/)) {
        return props.account.login.replace('user_', '');
    } else {
        return props.account.uid
    }
})

</script>

<template>
    <div class="portal">
        <h2 class="portal__title portal__title--commented">Абонентский договор</h2>
        <div class="portal__wrapper">
            <ul class="portal__list">
                <li class="portal__item">
                    <h3 class="portal__item-title">Номер и дата договора</h3>
                    <p class="portal__item-content">№ {{ formattedNumber }} от {{ dateFormatter.format(new Date(date)) }}</p>
                </li>
                <li class="portal__item">
                    <h3 class="portal__item-title">Номер лицевого счёта для платежей через ПСБ</h3>
                    <p class="portal__item-content">{{ billingAccountNumber }}</p>
                </li>
                <li class="portal__item">
                    <h3 class="portal__item-title">Баланс договора</h3>
                    <p class="portal__item-content">{{ currencyFormatter.format(balance) }}</p>
                </li>
                <li class="portal__item">
                    <h3 class="portal__item-title">Доступный кредит по договору</h3>
                    <p class="portal__item-content">{{ currencyFormatter.format(credit) }}</p>
                </li>
                <li class="portal__item">
                    <payment-form :agreement="props.agreement" />
                </li>
            </ul>
        </div>
    </div>
</template>