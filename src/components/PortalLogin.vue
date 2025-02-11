<script setup lang="ts">
import { onMounted, ref } from 'vue'
//request url
const address: URL = new URL(import.meta.env.VITE_API_URL+'/client' || 'http://localhost:3002/client')
// request params
const requestOptions: RequestInit = {
    credentials: "include", // This is crucial to send cookies
    headers: {
        "Content-Type": "application/json"
    },
}
// defines emit
const emit = defineEmits(['login']);
// reactive variables for form data
const login = ref('')
const password = ref('')
// reactive variables for form data validation
const loginValidationMessage = ref('')
const passwordValidationMessage = ref('')
// flag to hide content while loading the page
const isLoading = ref<boolean>(true)
// declares request interface
interface HttpRequestPayload {
    url?: URL
    method?: 'GET' | 'POST'
    body?: Record<string, any>
}
// makes requests
async function makeHttpRequest(payload?: HttpRequestPayload): Promise<Record<string, any> | null> {
    const { url = address, method = 'GET', body } = payload || {}
    const options = {
        method: method,
        ...requestOptions,
    }
    if (body) {
        options.body = JSON.stringify(body)
    }
    const response = await fetch(url, options)
    if (response.ok) {
        const data = await response.json()
        return data
    }
    if (response.status === 401) {
        alert("Не уадлось распознать введенные логин или пароль!")
        return null
    } else {
        return null
    }
}
// handles user authentikation
async function authenticateUser(): Promise<void> {
    // checks login
    if (!login.value) {
        checkLogin()
        return
    }
    // checks password
    if (!password.value) {
        checkPassword()
        return
    }
    // autofills prefix for asknet users
    if (login.value.match(/^[1-5]\d{3}$/)) {
        login.value = `user_${login.value}`
    }
    // groups credentials
    const userCredentials = {
        login: login.value,
        password: password.value
    }
    //sends login request
    const data = await makeHttpRequest({
        method: 'POST',
        body: userCredentials
    })
    // if ok, emits login event and sends login data to parent component
    emit('login', data)
}
function checkLogin(): void {
    if (login.value.length === 0) {
        loginValidationMessage.value = 'Ввод не может быть пустым'
    } else if (login.value.length < 4) {
        loginValidationMessage.value = 'Ввод должен быть не менее 4 символов'
    } else {
        loginValidationMessage.value = ''
    }
}
function checkPassword(): void {
    if (password.value.length === 0) {
        passwordValidationMessage.value = 'Ввод не может быть пустым'
    } else if (password.value.length < 6) {
        passwordValidationMessage.value = 'Длина пароля должна быть не менее 6 символов'
    } else {
        passwordValidationMessage.value = ''
    }
}
// checks on mount if user is already logged in
async function isUserAuthenticated(): Promise<void> {
    if (document.cookie.includes('sessnum')) {
        const data = await makeHttpRequest()
        emit('login', data)
    }
}
onMounted(async () => {
    await isUserAuthenticated()
    isLoading.value = false
})
</script>

<template>
    <section v-if="!isLoading" class="login">
        <div class="login__container">
            <h1 class="login__title">Вход в личный кабинет</h1>
            <p class="login__text">Введите данные для входа</p>
            <form class="login__form" @submit.prevent="authenticateUser">
                <div class="login__input" :class="{ 'login__input--invalid': loginValidationMessage }">
                    <label for="login">Лицевой счёт или логин абонента</label>
                    <input id="login" placeholder="Логин" name="login" v-model="login" @input="checkLogin">
                    <p v-if="loginValidationMessage">{{ loginValidationMessage }}</p>
                </div>
                <div class="login__input" :class="{ 'login__input--invalid': passwordValidationMessage }">
                    <label for="password">Пароль</label>
                    <input type="password" id="password" placeholder="Пароль" name="password" v-model="password"
                        @input="checkPassword">
                    <p v-if="passwordValidationMessage">{{ passwordValidationMessage }}</p>
                </div>
                <button type="submit" class="login__button site-button site-button--green">Войти</button>
            </form>
        </div>
    </section>
</template>

<style scoped lang="scss">
.login {
    --size: clamp(16px, 2vw, 32px);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.login__container {
    background-color: white;
    padding: calc(var(--size)*1.5) calc(var(--size)*1.5);
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: clamp(400px, 40vw, 640px);
}

.login__title {
    margin: 0 0 calc(var(--size)*.5) 0;
    font-size: calc(var(--size)*1.4);
    color: var(--font-color);
}

.login__text {
    margin: 0 0 calc(var(--size)*0.5) 0;
    font-size: calc(var(--size)*0.8);
    line-height: calc(var(--size)*1);
    color: var(--font-color-light);
}

.login__input {
    position: relative;
    margin-bottom: calc(var(--size)*1.4);

    label {
        display: block;
        font-size: calc(var(--size)*0.7);
        color: var(--font-color-ligh);
        margin-bottom: calc(var(--size)*0.3);
    }

    input {
        width: 100%;
        padding: calc(var(--size)*0.6);
        border-radius: 4px;
        border: 1px solid #ccc;
        font-size: calc(var(--size)*0.8);

        outline: none;

        transition: color var(--default-transition), border-color var(--default-transition);

        &::placeholder {
            transition: color var(--default-transition);
        }
    }

    p {
        --font-size: calc(var(--size)*0.6);
        margin: 0;
        position: absolute;
        left: 0;
        bottom: calc(var(--font-size)*(-1.5px));
        font-size: var(--font-size);
        line-height: calc(var(--font-size)*1.4);
        transition: color var(--default-transition);
    }

    &--invalid {
        input {
            border-color: var(--error-color);
            color: var(--error-color);

            &::placeholder {
                color: var(--error-color);
            }
        }

        p {
            color: var(--error-color);
        }
    }
}

button.login__button {
    width: 100%;
    padding: calc(var(--size)*.7);

    text-transform: lowercase;
    font-size: calc(var(--size)*.9);
    line-height: calc(var(--font-size)*1);
    font-weight: 500;
}
</style>
