<script setup lang="ts">
import AccountDetailed from './AccountDetailed.vue'
import AgreementDetailed from './AgreementDetailed.vue'
import FinanceSummary from './FinanceSummary.vue'
import VgroupsList from './VgroupsList.vue'
import ModalPaid from './ModalPaid.vue'
import { BackendResponse } from '@/types/types';
import { onMounted, reactive } from 'vue';
import LogoutButton from './LogoutButton.vue';

const props = defineProps<{ user: BackendResponse }>()
const emit = defineEmits(['logout']);

export interface PaymentUrlQuery {
  status: boolean,
  amount: string | null,
  paymentId: string | null
}

const address: URL = new URL(import.meta.env.VITE_API_URL + '/paymentmodal' || 'http://localhost:3002/client')

const { account, agreements, vgroups } = props.user

const payment: PaymentUrlQuery = reactive({
  status: false,
  amount: null,
  paymentId: null
})

function isPaymentUrlQuery(candidate: any): candidate is PaymentUrlQuery {
  // Check if 'Success', 'Amount', and 'PaymentId' exist in the URLSearchParams
  return (
    candidate instanceof URLSearchParams &&
    candidate.has('Success') &&
    candidate.has('Amount') &&
    candidate.has('PaymentId') &&
    typeof candidate.get('Success') === 'string' && // `get` returns a string
    typeof candidate.get('Amount') === 'string' &&
    typeof candidate.get('PaymentId') === 'string'
  );
}

function closePayNotification(): void {
  payment.status = false,
    payment.amount = null,
    payment.paymentId = null
}

async function showPaymentNotification(urlParams: URLSearchParams): Promise<void> {
  if (isPaymentUrlQuery(urlParams)) {
    payment.amount = urlParams.get('Amount')
    payment.status = Boolean(urlParams.get('Success'))
    payment.paymentId = urlParams.get('PaymentId')
    const response = await fetch(address, {
      method: 'POST',
      credentials: "include", // This is crucial to send cookies
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payment)
    })
    if (response.ok) {
      const data = await response.json()
      console.log(data);
    }
    // нужно сделать запрос модального окна и показать его если получили подходящий вариант
    // window.history.replaceState({}, '', window.location.pathname);
  }
}

onMounted(async () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  await showPaymentNotification(urlParams)
});
</script>


<template>
  <section>
    <div class="heading">
      <h1>Личный кабинет</h1>
      <logout-button @logout="emit('logout')"></logout-button>
    </div>
    <div class="wrapper">
      <account-detailed v-if="account" :account="account" />
      <agreement-detailed v-if="agreements" :agreement="agreements" :account="account" />
      <finance-summary :user="props.user"></finance-summary>
      <vgroups-list v-if="vgroups" :vgroups="vgroups" />
    </div>
    <!-- <modal-paid :payment-details="payment" v-if="payment.status" @closeModal="closePayNotification"></modal-paid> -->
  </section>
</template>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  grid-gap: 10px;
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