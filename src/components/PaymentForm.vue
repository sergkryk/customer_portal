<script setup lang="ts">
import { ref } from 'vue'
import { currencyFormatter } from '@/utils/valuesFormatters'

// const URLtoPayment = 'http://localhost:3002/payment'; // development
const URLtoPayment = 'http://127.0.0.1:3002/billing/payment';

const props = defineProps<{
  agreement: any
}>()

const { agrmid, operid } = props.agreement
// Reactive form data
const amount = ref<number | null>(null)
// Reactive validation message
const amountValidationMessage = ref<string>('')
const isInvalid = ref<boolean>(false)

async function handleSubmit(e: Event) {
  try {
    e.preventDefault()
    const formData = {
      AgrmId: agrmid,
      OperId: operid,
      Amount: amount.value,
    }

    const response = await fetch(URLtoPayment, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    if (response.ok) {
      const data = await response.json();
      window.location.href = data.paymentUrl
    } else {
      alert('Ошибка при отправке платежа')
    }
  } catch (error) {
    console.error('Ошибка при отправке платежа:', error)
    alert('Ошибка при отправке платежа')
  }
}

function validateAmount() {
  if (amount.value < 100 || amount.value > 10000) {
    amountValidationMessage.value = `Сумма платежа должна быть от ${currencyFormatter.format(100)} до ${currencyFormatter.format(10000)}`
    isInvalid.value = true
  } else {
    amountValidationMessage.value = ''
    isInvalid.value = false
  }
}

function removeValidationAlert() {
  if (amount.value < 100 || amount.value > 10000) {
    amount.value = null
    isInvalid.value = false
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="payment-form">
    <!-- Amount input field with validation message -->
    <div class="payment-form__field">
      <span v-if="isInvalid" class="payment-form__validation-message">
        {{ amountValidationMessage }}
      </span>
      <label for="amount" class="payment-form__label" v-if="!isInvalid">Пополнить баланс договора</label>
      <input type="number" id="amount" name="amount" v-model="amount" min="100" max="10000" @input="validateAmount"
        class="payment-form__input" :class="{ 'payment-form__input--invalid': isInvalid }"
        @blur="removeValidationAlert" />
    </div>

    <!-- Hidden fields for agrmid and operid -->
    <div class="payment-form__hidden-fields">
      <input type="hidden" id="agrmid" :value="agrmid" readonly name="agrmid" class="payment-form__hidden-input" />
      <input type="hidden" id="operid" :value="operid" readonly name="operid" class="payment-form__hidden-input" />
    </div>

    <!-- Submit button -->
    <button type="submit" class="payment-form__submit-btn">Оплатить</button>
  </form>
</template>

<style scoped lang="scss">
/* Block styling */
.payment-form {
  --basis: clamp(1rem, 2vw, 1.5rem);
  width: 100%;
  // padding: calc(var(--basis)*1.2);
  // background-color: #fff;
  // border-radius: 8px;
  // box-shadow: var(--box-shadow);
}

/* Element: Label */
.payment-form__label {
  display: block;
  margin: 0 0 calc(var(--basis)*.7) 0;
  color: var(--font-color-light);
  font-size: calc(var(--basis)*.9);
  line-height: calc(var(--basis)*1.1);
  font-weight: 500;
  font-style: italic;
}

/* Element: Input field */
.payment-form__input {
  width: 100%;
  padding: calc(var(--basis)*.6);
  font-size: var(--basis);
  border-radius: 4px;
  border: 1px solid var(--border-color);
  margin-bottom: calc(var(--basis)*.8);
  outline: none;
  outline-color: transparent;

  transition: color var(--default-transition), border-color var(--default-transition);

  &--invalid {
    border-color: var(--error-color);
    color: var(--error-color);
  }
}

/* Element: Validation message */
.payment-form__validation-message {
  color: var(--error-color);
  font-size: calc(var(--basis)*.9);
  line-height: calc(var(--basis)*1.1);
  margin-bottom: calc(var(--basis)*.7);
  display: block;
  font-weight: 500;
  font-style: italic;
}

/* Element: Hidden fields (inputs) */
.payment-form__hidden-fields {
  display: none;
}

/* Element: Submit button */
.payment-form__submit-btn {
  background-color: var(--color-violet);
  color: white;
  padding: calc(var(--basis)*.6) calc(var(--basis)*1.2);
  border: none;
  border-radius: 4px;
  font-size: calc(var(--basis)*1.2);
  cursor: pointer;
  width: 100%;
  transition: background-color var(--default-transition);
}

.payment-form__submit-btn:hover {
  background-color: var(--color-violet-hover);
}
</style>