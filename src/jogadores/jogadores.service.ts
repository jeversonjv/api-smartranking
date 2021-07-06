import { Injectable, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {

	constructor(
		@InjectModel("Jogador") private readonly jogadorModel: Model<Jogador>
	) { }

	async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {
		const { email } = criarJogadorDto;

		const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();

		if (jogadorEncontrado) {
			await this.atualizar(criarJogadorDto);
		} else {
			await this.criar(criarJogadorDto);
		}
	}

	async consultarTodosJogadores(): Promise<Jogador[]> {
		return await this.jogadorModel.find().exec();
	}

	async consultarJogadoresPeloEmail(email: string): Promise<Jogador> {
		const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();

		if (!jogadorEncontrado) {
			throw new NotFoundException(`Jogador com e-mail ${email} não encontrado`);
		}

		return jogadorEncontrado;
	}

	async deletarJogador(email: string): Promise<any> {
		return await this.jogadorModel.remove({ email }).exec();
	}

	private async criar(criarJogadorDTO: CriarJogadorDto): Promise<Jogador> {
		const jogadorCriado = new this.jogadorModel(criarJogadorDTO);
		return await jogadorCriado.save();
	}

	private async atualizar(criarJogadorDTO: CriarJogadorDto): Promise<Jogador> {
		return await this.jogadorModel.findOneAndUpdate({ email: criarJogadorDTO.email }, { $set: criarJogadorDTO }).exec();
	}

}
