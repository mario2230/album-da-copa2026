import { ref } from "vue";

import {
  addUsuario,
  realizarLogin
} from "@/services/database";

export const usuarioLogado = ref<any | null>(null);

export function useAuth() {


async function login(email: string, senha: string) {
  try {
    const emailNormalizado = email.trim().toLowerCase()
    console.log('Tentando login com email:', emailNormalizado)

    const usuarios = await realizarLogin(emailNormalizado, senha)

    if (usuarios && usuarios.length > 0) {
      usuarioLogado.value = usuarios[0]
      console.log('Login bem-sucedido:', usuarioLogado.value)
      return {
        sucesso: true,
        mensagem: 'Login realizado com sucesso!'
      }
    } else {
      console.warn('Nenhum usuário encontrado para', emailNormalizado)
      return {
        sucesso: false,
        mensagem: 'E-mail ou senha inválidos'
      }
    }
  } catch (erro) {
    console.error('Erro no login:', erro)
    return {
      sucesso: false,
      mensagem: 'Erro ao tentar fazer login. Tente novamente mais tarde.'
    }
  }
}

  async function cadastrar(
    nome: string,
    email: string,
    senha: string
  ) {

    const senhaForte =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!senhaForte.test(senha)) {
      return {
        sucesso: false,
        mensagem:
          "Senha fraca. Use no mínimo 8 caracteres, uma letra maiúscula, uma minúscula e um número."
      };
    }

    try {

      await addUsuario(
        nome,
        email.trim().toLowerCase(),
        senha
      );

      return {
        sucesso: true,
        mensagem: "Cadastro realizado!"
      };

    } catch {

      return {
        sucesso: false,
        mensagem: "E-mail já cadastrado"
      };

    }

  }

  function logout() {

    usuarioLogado.value = null;

  }

  async function resetarSenha(
    email: string
  ) {

    return {
      sucesso: true,
      mensagem: "Link enviado para " + email
    };

  }

  return {

    usuarioLogado,

    login,

    cadastrar,

    logout,

    resetarSenha

  };

}