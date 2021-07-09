import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe, HttpCode } from '@nestjs/common';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';
import { ValidacaoParametrosPipe } from '../common/pipes/validacao-parametros.pipe';
@Controller('api/v1/jogadores')
export class JogadoresController {

    constructor(
        private readonly jogadoresService: JogadoresService
    ) { }

    @Post()
    @UsePipes(ValidationPipe)
    async criarJogador(
        @Body() criarJogadorDto: CriarJogadorDto
    ): Promise<Jogador> {
        return await this.jogadoresService.criarJogador(criarJogadorDto);
    }

    @Put("/:_id")
    @UsePipes(ValidationPipe)
    @HttpCode(204)
    async atualizarJogador(
        @Body() atualizarJogadorDto: AtualizarJogadorDto,
        @Param("_id", ValidacaoParametrosPipe) _id: string
    ): Promise<void> {
        await this.jogadoresService.atualizarJogador(_id, atualizarJogadorDto);
    }

    @Get()
    async consultarJogadores(): Promise<Jogador[]> {
        return await this.jogadoresService.consultarTodosJogadores();
    }

    @Get("/:_id")
    async consultarJogadorPeloId(
        @Param("_id", ValidacaoParametrosPipe) _id: string
    ): Promise<Jogador> {
        return await this.jogadoresService.consultarJogadorPeloId(_id);
    }

    @Delete("/:_id")
    @HttpCode(204)
    async deletarJogador(
        @Param("/:_id", ValidacaoParametrosPipe) _id: string
    ): Promise<void> {
        await this.jogadoresService.deletarJogador(_id);
    }
}
