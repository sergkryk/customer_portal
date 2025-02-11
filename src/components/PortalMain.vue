<script setup lang="ts">
import AccountDetailed from './AccountDetailed.vue'
import AgreementDetailed from './AgreementDetailed.vue'
import VgroupsList from './VgroupsList.vue'
import ModalPaid from './ModalPaid.vue'
import { BackendResponse } from '@/types/types';
import { onMounted, reactive } from 'vue';
import LogoutButton from './LogoutButton.vue';

const props = defineProps<{
  user: BackendResponse
}>()
const emit = defineEmits(['logout']);
const { account, agreements, vgroups } = props.user

const payment = reactive({
  status: false,
  amount: null,
  paymentId: null
})

function closePayNotification() {
  payment.status = false,
    payment.amount = null,
    payment.paymentId = null
}

function handleLogout() {
  emit('logout')
}

onMounted(() => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  if (['Success', 'Amount', 'PaymentId'].every(el => urlParams.has(el))) {
    payment.amount = urlParams.get('Amount')
    payment.status = Boolean(urlParams.get('Success'))
    payment.paymentId = urlParams.get('PaymentId')
    window.history.replaceState({}, '', window.location.pathname);
  };
});
</script>

<template>
  <section>
    <div class="heading">
      <h1>Личный кабинет</h1>
      <logout-button @logout="handleLogout"></logout-button>
    </div>
    <div class="wrapper">
      <account-detailed v-if="account" :account="account" />
      <agreement-detailed v-if="agreements" :agreement="agreements" :account="account" />
    </div>
    <vgroups-list v-if="vgroups" :vgroups="vgroups" />
    <modal-paid :payment-details="payment" v-if="payment.status" @closeModal="closePayNotification"></modal-paid>
  </section>
</template>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  grid-gap: 20px;
}

.heading {
  padding: clamp(1rem, 2vw, 2rem) 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

h1 {
  margin: 0;
}
</style>

<!-- 
http://localhost:5173/?Success=true&ErrorCode=0&Message=None&Details=&Amount=11300&MerchantEmail=asknet.support%40gmail.com&MerchantName=ASKnet&OrderId=3715-1739021548028&PaymentId=5824220846&TranDate=&BackUrl=https%3A%2F%2Fasknet.online&CompanyName=%D0%98%D0%9F+%D0%9A%D0%A0%D0%AE%D0%9A%D0%9E%D0%92+%D0%A1%D0%95%D0%A0%D0%93%D0%95%D0%99+%D0%9D%D0%98%D0%9A%D0%9E%D0%9B%D0%90%D0%95%D0%92%D0%98%D0%A7&EmailReq=asknet.support%40gmail.com&PhonesReq=9591220711
 -->