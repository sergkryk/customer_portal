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
</template>

<style lang="scss">
.portal {
    --size: clamp(1rem, 1vw, 2rem);
    max-width: 1200px;
    padding: clamp(16px, 4vw, 48px);
    margin-bottom: clamp(1.5rem, 1vw, 3rem);
    background-color: var(--color-white);
    border-radius: .5rem;
    box-shadow: var(--box-shadow);
}

.portal__title {
    margin: 0 0 calc(var(--size)*.8) 0;
    font-size: calc(var(--size)*1.6);
    line-height: calc(var(--size)*1.8);
}

.portal__list {
    display: flex;
    flex-flow: column nowrap;
    margin: 0;
    padding: 0;
    list-style: none;
    gap: calc(var(--size)/2);
}

.portal__item {
    display: flex;
    flex-flow: column nowrap;
    padding: calc(var(--size)*.6) 0;
    border-bottom: 1px solid #4caf50;
    border-bottom: 1px solid var(--site-green);
}

.portal__item-title {
    margin: 0 0 calc(var(--size)*.4) 0;
    color: var(--font-color-light);
    font-size: calc(var(--size)*.8);
    line-height: calc(var(--size));
    font-weight: 500;
    font-style: italic;
}

.portal__item-content {
    margin: 0;
    font-weight: 500;
    font-size: calc(var(--size)*1);
    line-height: calc(var(--size)*1.2);
}
</style>