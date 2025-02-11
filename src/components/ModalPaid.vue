<script setup lang="ts">
import { currencyFormatter } from '@/utils/valuesFormatters';
const props = defineProps<{
  paymentDetails: {
    status: boolean,
    amount: string | null,
    paymentId: string | null
  }
}>()

const emit = defineEmits(['closeModal']);

function handleClick() {
    emit('closeModal')
}

</script>

<template>
  <div class="modal-overlay">
    <div class="modal">
      <p>Платеж с номером {{ props.paymentDetails.paymentId }} на сумму {{ currencyFormatter.format(Number(props.paymentDetails.amount) / 100) }} поступил на ваш счёт</p>
      <button @click="handleClick" class="close-btn">Закрыть</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
/* Modal overlay (background) */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--hero-overlay); /* Semi-transparent background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Ensures the modal is above other content */
}

/* Modal content */
.modal {
  background: var(--color-white);
  padding: 20px 30px;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 400px;
  text-align: center;
  animation: fadeIn 0.3s ease-out;
}

/* Modal Text */
.modal p {
  font-size: 16px;
  color: #333;
  margin-bottom: 20px;
}

/* Close Button */
.close-btn {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.close-btn:hover {
  background-color: #0056b3;
}

/* Fade-in Animation */
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
