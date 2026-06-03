<template>
  <ion-page>
    <AppHeader titulo="Login" />

    <ion-content class="ion-padding">

      <LoginForm @login="realizarLogin" />

      <ion-button expand="block" fill="clear" @click="irCadastro">
        Criar conta
      </ion-button>

      <ion-button expand="block" fill="clear" @click="esqueciSenha">
        Esqueci minha senha
      </ion-button>

      <ion-text color="danger" v-if="mensagemErro">
        <p>{{ mensagemErro }}</p>
      </ion-text>
      <ion-toast :is-open="mostrarToast" :message="mensagemToast" duration="2000" @didDismiss="
        mostrarToast = false
        " />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"

import {
  IonPage,
  IonContent,
  IonButton,
  IonText,
  IonToast
} from "@ionic/vue"

import LoginForm from "@/components/LoginForm.vue"

import { useAuth } from "@/composables/useAuth"

const router = useRouter()
const mostrarToast = ref(false)
const mensagemToast = ref("")


const { login } = useAuth()

const mensagemErro = ref("")

function realizarLogin(
  email: string,
  senha: string
) {

  mensagemErro.value = ""

  const resultado =
    login(email, senha)

  mensagemToast.value =
    resultado.mensagem

  mostrarToast.value =
    true

  if (resultado.sucesso) {

    setTimeout(() => {

      router.push(
        "/pages/album"
      )

    }, 1000)
  }
}

function irCadastro() {
  router.push("/cadastro")
}

function esqueciSenha() {
  alert(
    "Tela de recuperação apenas ilustrativa"
  )
  setTimeout(() => {
    router.push("/resetpass")
  }, 1000)

}
</script>