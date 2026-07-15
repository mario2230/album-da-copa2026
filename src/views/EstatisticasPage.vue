<template>
    <ion-page>

        <AppHeader titulo="Estatísticas" />

        <ion-content class="ion-padding">

            <ion-card>

                <ion-card-header>
                    <ion-card-title>
                        Progresso do Álbum
                    </ion-card-title>
                </ion-card-header>

                <ion-card-content>

                    <ion-progress-bar
                        :value="estatisticas.percentualConclusao / 100"
                    />

                    <p>
                        {{ estatisticas.percentualConclusao.toFixed(1) }}%
                        do álbum completo
                    </p>

                    <ion-badge color="primary">
                        {{ estatisticas.totalColetadas }}
                        /
                        {{ estatisticas.totalCadastradas }}
                        coletadas
                    </ion-badge>

                    <ion-badge color="medium" class="ion-margin-start">
                        {{ estatisticas.totalFaltantes }}
                        faltantes
                    </ion-badge>

                </ion-card-content>

            </ion-card>

            <ion-card>

                <ion-card-header>
                    <ion-card-title>
                        Raridade
                    </ion-card-title>
                </ion-card-header>

                <ion-card-content>

                    <ion-badge color="warning">
                        {{ estatisticas.totalRaras }}
                        raras coletadas
                    </ion-badge>

                    <ion-badge color="tertiary" class="ion-margin-start">
                        {{ estatisticas.totalBrilhantes }}
                        brilhantes coletadas
                    </ion-badge>

                </ion-card-content>

            </ion-card>

            <ion-card>

                <ion-card-header>
                    <ion-card-title>
                        Ranking de Colecionador
                    </ion-card-title>
                </ion-card-header>

                <ion-card-content>

                    <ion-badge color="success">
                        Nível {{ ranking.nivelAtual }}
                    </ion-badge>

                    <p class="ion-margin-top">
                        {{ ranking.pontuacaoTotal }} pontos
                    </p>

                    <ion-progress-bar
                        :value="ranking.progressoNoNivel"
                        color="success"
                    />

                </ion-card-content>

            </ion-card>

            <ion-card>

                <ion-card-header>
                    <ion-card-title>
                        Últimas Coletas
                    </ion-card-title>
                </ion-card-header>

                <ion-card-content>

                    <ion-list v-if="ultimasColetas.length > 0">

                        <ion-item
                            v-for="figurinha in ultimasColetas"
                            :key="figurinha.id"
                        >

                            <ion-label>

                                <h2>{{ figurinha.nome }}</h2>

                                <p>
                                    {{ figurinha.selecao }}
                                    —
                                    {{ figurinha.raridade }}
                                </p>

                                <p>
                                    {{ formatarData(figurinha.collected_at) }}
                                </p>

                            </ion-label>

                        </ion-item>

                    </ion-list>

                    <p v-else>
                        Nenhuma figurinha coletada ainda.
                    </p>

                </ion-card-content>

            </ion-card>

        </ion-content>

    </ion-page>
</template>

<script setup lang="ts">
import {
    IonPage,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonBadge,
    IonProgressBar,
    IonList,
    IonItem,
    IonLabel,
    onIonViewWillEnter
} from "@ionic/vue"

import AppHeader from "@/components/AppHeader.vue"
import { useEstatisticas } from "@/composables/useEstatisticas"

const {
    estatisticas,
    ranking,
    ultimasColetas,
    carregarEstatisticas
} = useEstatisticas()

function formatarData(data: string) {
    return new Date(data).toLocaleString("pt-BR")
}

onIonViewWillEnter(() => {
    carregarEstatisticas().catch(e =>
        console.error("[EstatisticasPage] erro ao entrar na tela", e)
    )
})
</script>