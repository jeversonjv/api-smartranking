import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JogadoresService } from '../jogadores/jogadores.service';
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria.dto';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { Categoria } from './interfaces/categoria.interface';

@Injectable()
export class CategoriasService {

    constructor(
        @InjectModel("Categoria") private readonly categoriaModel: Model<Categoria>,
        private readonly jogadoresService: JogadoresService
    ) { }

    async criarCategoria(criarCategoriaDto: CriarCategoriaDto): Promise<Categoria> {
        const { categoria } = criarCategoriaDto;

        const categoriaEncontrada = await this.categoriaModel.findOne({ categoria }).exec();

        if (categoriaEncontrada) {
            throw new BadRequestException(`Categoria: ${categoria} já cadastrada!`);
        }

        const categoriaCriada = new this.categoriaModel(criarCategoriaDto);
        return await categoriaCriada.save();
    }

    async consultarCategorias(): Promise<Categoria[]> {
        return await this.categoriaModel.find().populate("jogadores").exec();
    }

    async consultarCategoriaPeloId(categoria: string): Promise<Categoria> {
        const categoriaEncontrada = await this.categoriaModel.findOne({ categoria }).exec();

        if (!categoriaEncontrada) {
            throw new BadRequestException(`Categoria: ${categoria} não cadastrada!`);
        }

        return categoriaEncontrada;
    }

    async atualizarCategoria(categoria: string, atualizarCategoriaDto: AtualizarCategoriaDto): Promise<void> {
        const categoriaEncontrada = await this.categoriaModel.findOne({ categoria }).exec();

        if (!categoriaEncontrada) {
            throw new BadRequestException(`Categoria: ${categoria} não cadastrada!`);
        }

        await this.categoriaModel.updateOne({ categoria }, { $set: atualizarCategoriaDto }).exec();
    }

    async atribuirCategoriaJogador(categoria: string, idJogador: string): Promise<void> {
        const categoriaEncontrada = await this.categoriaModel.findOne({ categoria }).exec();

        await this.jogadoresService.consultarJogadorPeloId(idJogador);

        const jogadorEncontradoCategoria = await this.categoriaModel
            .find({ categoria })
            .where("jogadores")
            .in([idJogador])
            .exec();

        if (!categoriaEncontrada) {
            throw new BadRequestException(`Categoria: ${categoria} não cadastrada!`);
        }

        if (jogadorEncontradoCategoria.length > 0) {
            throw new BadRequestException(`Jogador: ${idJogador} já cadastrado na Categoria ${categoria}`);
        }

        categoriaEncontrada.jogadores.push(idJogador);
        await this.categoriaModel.updateOne({ categoria }, { $set: categoriaEncontrada }).exec();
    }

    async verificarJogadorTemCategoria(idJogador: string): Promise<Categoria> {
        const jogadorEncontradoCategoria = await this.categoriaModel
            .find()
            .where("jogadores")
            .in([idJogador])
            .exec();

        if (jogadorEncontradoCategoria.length == 0) {
            throw new BadRequestException(`Jogador: ${idJogador} não possui categoria`);
        }

        return jogadorEncontradoCategoria[0];
    }

}
