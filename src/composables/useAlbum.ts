import { ref, computed } from "vue"
import { stickers as stickersData } from "@/data/stickers"

export function useAlbum() {
  const stickers = ref([...stickersData])
  const pesquisa = ref("")
  const filtro = ref("todas")

  function marcarColetada(id: number) {
    const figurinha = stickers.value.find(
      sticker => sticker.id === id
    )

    if (figurinha) {
      figurinha.coletada = !figurinha.coletada
    }
  }


  const stickersFiltradas = computed(() => {

    let resultado = stickers.value


    if (pesquisa.value) {
      resultado = resultado.filter(sticker =>
        sticker.nome
          .toLowerCase()
          .includes(pesquisa.value.toLowerCase()) ||

        sticker.selecao
          .toLowerCase()
          .includes(pesquisa.value.toLowerCase())
      )
    }

    if (filtro.value === "coletadas") {
      resultado = resultado.filter(
        sticker => sticker.coletada
      )
    }

    if (filtro.value === "pendentes") {
      resultado = resultado.filter(
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

  return {
    stickers,
    pesquisa,
    filtro,
    marcarColetada,
    stickersFiltradas,
    totalFigurinhas,
    totalColetadas
  }
}