<script setup lang="ts">
import { phoneNumberFormatter } from '@/utils/valuesFormatters'
const props = defineProps<{
    account: any
}>()

const { uid, name, phone, email, login, pass, isPassport = true } = props.account

</script>

<template>
    <div class="portal">
        <h2 class="portal__title">Абонент</h2>
        <div class="portal__wrapper">
            <ul class="portal__list">
                <li class="portal__item">
                    <h3 class="portal__item-title">ФИО абонента</h3>
                    <p class="portal__item-content">{{ name }}</p>
                </li>
                <li class="portal__item">
                    <h3 class="portal__item-title">Телефон абонента</h3>
                    <p class="portal__item-content">{{ phoneNumberFormatter(phone) }}</p>
                </li>
                <li class="portal__item">
                    <h3 class="portal__item-title">Электронная почта абонента</h3>
                    <p class="portal__item-content">{{ email ? email : 'не данных' }}</p>
                </li>
                <li class="portal__item">
                    <h3 class="portal__item-title">Имя для входа в личный кабинет</h3>
                    <p class="portal__item-content">{{ login }}</p>
                </li>
                <li class="portal__item">
                    <h3 class="portal__item-title">Пароль для входа в личный кабинет</h3>
                    <p class="portal__item-content">{{ pass }}</p>
                </li>
                <li class="portal__item">
                    <h3 class="portal__item-title">Паспортные данные</h3>
                    <p class="portal__item-content">{{ isPassport ? 'заполнены' : 'необходимо заполнить' }}</p>
                </li>
            </ul>
        </div>
    </div>
</template>