import { Body, Controller, Delete, Get, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';
import { JogadoresValidacaoParametrosPipe } from './pipes/jogadores-validacao-parametros.pipe';
@Controller('api/v1/jogadores')
export class JogadoresController {

    constructor(
        private readonly jogadoresService: JogadoresService
    ) { }

    @Post()
    @UsePipes(ValidationPipe)
    async criarAtualizarJogador(@Body() criarJogadorDto: CriarJogadorDto): Promise<void> {
        await this.jogadoresService.criarAtualizarJogador(criarJogadorDto);
    }

    @Get()
    async consultarJogadores(@Query("email", JogadoresValidacaoParametrosPipe) email: string): Promise<Jogador[] | Jogador> {
        if (email) {
            return await this.jogadoresService.consultarJogadoresPeloEmail(email);
        } else {
            return await this.jogadoresService.consultarTodosJogadores();
        }
    }

    @Delete()
    async deletarJogador(@Query("email", JogadoresValidacaoParametrosPipe) email: string): Promise<void> {
        await this.jogadoresService.deletarJogador(email);
    }
}
