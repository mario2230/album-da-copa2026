import { ref } from "vue"

import {
  getEstatisticas,
  getRanking,
  listUltimasColetas
} from "@/services/database"

import {
  usuarioLogado
} from "@/composables/useAuth"

export function useEstatisticas() {

  const estatisticas = ref({
    totalCadastradas: 0,
    totalColetadas: 0,
    totalFaltantes: 0,
    totalRaras: 0,
    totalBrilhantes: 0,
    percentualConclusao: 0
  })

  const ranking = ref({
    pontuacaoTotal: 0,
    nivelAtual: "Bronze",
    progressoNoNivel: 0
  })

  const ultimasColetas = ref<any[]>([])

  async function carregarEstatisticas() {

    if (!usuarioLogado.value) {
      return
    }

    try {

      const [dadosEstatisticas, dadosRanking, dadosHistorico] =
        await Promise.all([
          getEstatisticas(usuarioLogado.value.id),
          getRanking(usuarioLogado.value.id),
          listUltimasColetas(usuarioLogado.value.id, 10)
        ])

      estatisticas.value = dadosEstatisticas
      ranking.value = dadosRanking
      ultimasColetas.value = dadosHistorico

    } catch (error) {
      console.error("[useEstatisticas] erro ao carregar estatísticas", error)
    }

  }

  return {
    estatisticas,
    ranking,
    ultimasColetas,
    carregarEstatisticas
  }

}