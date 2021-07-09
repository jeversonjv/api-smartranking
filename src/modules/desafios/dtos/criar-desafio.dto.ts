import { ApiProperty } from "@nestjs/swagger";
import { ArrayMaxSize, ArrayMinSize, IsArray, IsDateString, IsNotEmpty } from "class-validator";

export class CriarDesafioDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    dataHoraDesafio: Date;

    @ApiProperty()
    @IsNotEmpty()
    solicitante: string;

    @ApiProperty()
    @IsArray()
    @ArrayMinSize(2)
    @ArrayMaxSize(2)
    jogadores: Array<string>
}