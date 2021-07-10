import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ValidacaoParametrosPipe } from 'src/common/pipes/validacao-parametros.pipe';
import { DesafiosService } from './desafios.service';
import { AtribuirDesafioPartidaDto } from './dtos/atribuir-desafio-partida.dto';
import { AtualizarDesafioDto } from './dtos/atualizar-desafio.dto';
import { CriarDesafioDto } from './dtos/criar-desafio.dto';
import { Desafio } from './interfaces/desafio.interface';

@Controller('/api/v1/desafios')
export class DesafiosController {

    constructor(
        private readonly desafiosService: DesafiosService
    ) { }

    @Post()
    @UsePipes(ValidationPipe)
    async criarDesafio(
        @Body() criarDesafioDto: CriarDesafioDto
    ): Promise<Desafio> {
        return await this.desafiosService.criarDesafio(criarDesafioDto);
    }

    @Get()
    async consultarTodosDesafios(): Promise<Desafio[]> {
        return await this.desafiosService.consultarTodosDesafios();
    }

    @Get("/:idJogador")
    async consultarDesafiosDeUmJogador(
        @Param("idJogador", ValidacaoParametrosPipe) idJogador: string
    ): Promise<Desafio[]> {
        return await this.desafiosService.consultarDesafiosDeUmJogador(idJogador);
    }

    @Put("/:idDesafio")
    @UsePipes(ValidationPipe)
    @HttpCode(204)
    async atualizarDesafio(
        @Param("idDesafio", ValidacaoParametrosPipe) idDesafio: string,
        @Body() atualizarDesafioDto: AtualizarDesafioDto
    ): Promise<void> {
        await this.desafiosService.atualizarDesafio(idDesafio, atualizarDesafioDto);
    }

    @Delete("/:idDesafio")
    @UsePipes(ValidationPipe)
    @HttpCode(204)
    async deletarDesafio(
        @Param("idDesafio", ValidacaoParametrosPipe) idDesafio: string
    ): Promise<void> {
        await this.desafiosService.deletarDesafio(idDesafio);
    }

    @Post("/:idDesafio/atribuirPartida")
    @UsePipes(ValidationPipe)
    @HttpCode(204)
    async atribuirPartida(
        @Param("idDesafio", ValidacaoParametrosPipe) idDesafio: string,
        @Body() atribuirDesafioPartidaDto: AtribuirDesafioPartidaDto
    ): Promise<void> {
        await this.desafiosService.atribuirPartida(idDesafio, atribuirDesafioPartidaDto);
    }
}
