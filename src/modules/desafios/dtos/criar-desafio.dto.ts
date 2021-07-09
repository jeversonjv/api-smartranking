import { ApiProperty } from "@nestjs/swagger";
import { ArrayMaxSize, ArrayMinSize, IsArray, IsDateString, IsNotEmpty } from "class-validator";
import { Jogador } from "src/modules/jogadores/interfaces/jogador.interface";

export class CriarDesafioDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    dataHoraDesafio: Date;

    @IsNotEmpty()
    solicitante: Jogador;

    @IsArray()
    @ArrayMinSize(2)
    @ArrayMaxSize(2)
    jogadores: Array<Jogador>
}