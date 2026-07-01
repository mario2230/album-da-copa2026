import {
  ref,
  computed,
  onMounted
} from "vue"

import { stickers as stickersData } from "@/data/stickers"

import {
  listJogadores,
  atualizarColetada
} from "@/services/database"

export function useAlbum() {

  const stickers = ref<any[]>([])

  const pesquisa = ref("")

  const filtro = ref("todas")

  async function carregarAlbum() {

    const jogadores = await listJogadores()

    stickers.value = stickersData.map(sticker => {

      const jogador = jogadores.find(
        (j: any) => j.id === sticker.id
      )

      return {
        ...sticker,
        coletada: jogador
          ? jogador.coletada === 1
          : false
      }

    })

  }

  async function marcarColetada(id: number) {

    const figurinha = stickers.value.find(
      sticker => sticker.id === id
    )

    if (!figurinha) {
      return
    }

    const novoStatus =
      !figurinha.coletada

    await atualizarColetada(
      id,
      novoStatus
    )

    figurinha.coletada =
      novoStatus
  }

  const stickersFiltradas = computed(() => {

    let resultado = stickers.value

    if (pesquisa.value) {

      resultado = resultado.filter(sticker =>

        sticker.nome
          .toLowerCase()
          .includes(
            pesquisa.value.toLowerCase()
          ) ||

        sticker.selecao
          .toLowerCase()
          .includes(
            pesquisa.value.toLowerCase()
          )

      )

    }

    if (filtro.value === "coletadas") {

      resultado =
        resultado.filter(
          sticker => sticker.coletada
        )

    }

    if (filtro.value === "pendentes") {

      resultado =
        resultado.filter(
          sticker => !sticker.coletada
        )

    }

    return resultado

  })

  const totalFigurinhas = computed(() =>
    stickers.value.length
  )

  const totalColetadas = computed(() =>
    stickers.value.filter(
      sticker => sticker.coletada
    ).length
  )

  onMounted(() => {
    carregarAlbum()
  })

  return {
    pesquisa,
    filtro,
    marcarColetada,
    stickersFiltradas,
    totalFigurinhas,
    totalColetadas
  }

}