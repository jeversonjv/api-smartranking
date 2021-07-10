import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoriasService } from '../categorias/categorias.service';
import { JogadoresService } from '../jogadores/jogadores.service';
import { AtribuirDesafioPartidaDto } from './dtos/atribuir-desafio-partida.dto';
import { AtualizarDesafioDto } from './dtos/atualizar-desafio.dto';
import { CriarDesafioDto } from './dtos/criar-desafio.dto';
import { DesafioStatus } from './interfaces/desafio-status.enum';
import { Desafio, Partida } from './interfaces/desafio.interface';

@Injectable()
export class DesafiosService {

    constructor(
        @InjectModel("Desafio") private readonly desafioModel: Model<Desafio>,
        @InjectModel("Partida") private readonly partidaModel: Model<Partida>,
        private readonly categoriasService: CategoriasService,
        private readonly jogadoresService: JogadoresService
    ) { }

    async criarDesafio(criarDesafioDto: CriarDesafioDto): Promise<Desafio> {
        const { dataHoraDesafio, solicitante, jogadores } = criarDesafioDto;

        if (!jogadores.includes(solicitante)) {
            throw new BadRequestException("O solicitante do desafio não se encontra como um jogador do desafio!");
        }

        let categoriaSolicitante;
        // valida se todos os jogadores estão cadastrados e tem uma categoria
        for (let jogador of jogadores) {
            await this.jogadoresService.consultarJogadorPeloId(jogador);
            const categoriaJogador = await this.categoriasService.verificarJogadorTemCategoria(jogador);

            if (jogador === solicitante) {
                categoriaSolicitante = categoriaJogador.categoria;
            }
        }

        const desafioDesafioCriado = new this.desafioModel({
            dataHoraDesafio: dataHoraDesafio,
            dataHoraSolicitacao: new Date(),
            solicitante,
            categoria: categoriaSolicitante,
            jogadores,
            status: DesafioStatus.PENDENTE
        });

        return await desafioDesafioCriado.save();
    }

    async consultarTodosDesafios(): Promise<Desafio[]> {
        return this.desafioModel
            .find()
            .populate("jogadores")
            .populate("solicitante")
            .populate("partida")
            .exec()
    }

    async consultarDesafiosDeUmJogador(idJogador: string): Promise<Desafio[]> {
        return this.desafioModel
            .find()
            .populate("jogadores")
            .populate("solicitante")
            .populate("partida")
            .where("jogadores")
            .in([idJogador])
            .exec()
    }

    async atualizarDesafio(idDesafio: string, atualizarDesafioDto: AtualizarDesafioDto): Promise<void> {
        const { status, dataHoraResposta } = atualizarDesafioDto;

        await this.validarDesafioExiste(idDesafio);

        if (
            !(<string[]>Object.values(DesafioStatus)).includes(status) ||
            status === DesafioStatus.PENDENTE ||
            status === DesafioStatus.REALIZADO
        ) {
            throw new BadRequestException(`Status: ${status} não permitido para atualização do desafio`);
        }

        await this.desafioModel.updateOne({ _id: idDesafio }, { $set: { status, dataHoraResposta } }).exec();
    }

    async deletarDesafio(idDesafio: string): Promise<void> {
        await this.validarDesafioExiste(idDesafio);

        await this.desafioModel.updateOne({ _id: idDesafio }, { $set: { status: DesafioStatus.CANCELADO } }).exec();
    }

    async atribuirPartida(idDesafio: string, atribuirDesafioPartidaDto: AtribuirDesafioPartidaDto): Promise<void> {
        const { resultado, def } = atribuirDesafioPartidaDto;

        const desafioEncontrado = await this.validarDesafioExiste(idDesafio);

        if (desafioEncontrado.status === DesafioStatus.REALIZADO) {
            throw new BadRequestException("Partida já finalizada!");
        }

        if (!desafioEncontrado.jogadores.includes(def)) {
            throw new BadRequestException("Jogador vencedor não se encontra no desafio!");
        }

        let partidaCriada = new this.partidaModel({
            resultado,
            def,
            jogadores: desafioEncontrado.jogadores,
            categoria: desafioEncontrado.categoria
        });

        partidaCriada = await partidaCriada.save();

        await this.desafioModel.updateOne(
            { _id: idDesafio },
            { $set: { partida: partidaCriada, status: DesafioStatus.REALIZADO } }
        ).exec();
    }

    private async validarDesafioExiste(idDesafio: string): Promise<Desafio> {
        const desafioEncontrado = await this.desafioModel.findOne({ _id: idDesafio }).exec();

        if (!desafioEncontrado) {
            throw new BadRequestException(`Desafio: ${idDesafio} não encontrado!`);
        }

        return desafioEncontrado;
    }
}
