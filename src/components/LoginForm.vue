<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>Entrar</ion-card-title>
    </ion-card-header>

    <ion-card-content>
      <ion-input
        label="E-mail"
        label-placement="floating"
        type="email"
        v-model="email"
      />

      <ion-input
        class="ion-margin-top"
        label="Senha"
        label-placement="floating"
        type="password"
        v-model="senha"
      />

      <ion-button expand="block" class="ion-margin-top" @click="fazerLogin">
        Entrar
      </ion-button>

      <ion-text color="danger" v-if="erro">
        <p>{{ erro }}</p>
      </ion-text>
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonInput,
  IonButton,
  IonText
} from '@ionic/vue'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { login } = useAuth()

const email = ref('')
const senha = ref('')
const erro = ref('')


async function fazerLogin() {
  erro.value = ''
  if (!email.value || !senha.value) {
    erro.value = 'Preencha todos os campos.'
    return
  }

  const resultado = await login(email.value, senha.value)
  console.log('Resultado do login:', resultado)

  if (!resultado.sucesso) {
    erro.value = resultado.mensagem
    return
  }

  router.push('/pages/album')
}
</script>