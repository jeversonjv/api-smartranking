import { Injectable, Logger } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { v4 as uuid } from "uuid";

@Injectable()
export class JogadoresService {

	private jogadores: Jogador[] = [];
	private readonly logger = new Logger(JogadoresService.name);

	async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {

		const { email } = criarJogadorDto;

		const jogadorEncontrado = this.jogadores.find(jogador => jogador.email == email);

		if(jogadorEncontrado) {
			this.atualizar(jogadorEncontrado, criarJogadorDto);
		} else {
			this.criar(criarJogadorDto);
		}
	}

	async consultarTodosJogadores(): Promise<Jogador[]> {
		return this.jogadores;
	}

	private criar(criarJogadorDTO: CriarJogadorDto): void {
		const { nome, email, telefoneCelular } = criarJogadorDTO;

		const jogador: Jogador = {
			_id: uuid(),
			nome,
			email,
			telefoneCelular,
			ranking: 'A',
			posicaoRanking: 1,
			urlFotoJogador: "www.google.com.br/foto123.jpg"
		};

		this.logger.log(`criarJogadorDTO: ${JSON.stringify(jogador)}`);
		this.jogadores.push(jogador);
	}

	private atualizar(jogadorEncontrado: Jogador, criarJogadorDTO: CriarJogadorDto): void {
		const { nome } = criarJogadorDTO;
		jogadorEncontrado.nome = nome;
	}

}
