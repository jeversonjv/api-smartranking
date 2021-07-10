import { IsNotEmpty } from "class-validator";
import { Jogador } from "src/modules/jogadores/interfaces/jogador.interface";
import { Resultado } from "../interfaces/desafio.interface";

export class AtribuirDesafioPartidaDto {

    @IsNotEmpty()
    def: Jogador | string

    @IsNotEmpty()
    resultado: Array<Resultado | string>
}