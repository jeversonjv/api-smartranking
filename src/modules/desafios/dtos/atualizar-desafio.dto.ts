import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsString } from "class-validator";
import { DesafioStatus } from "../interfaces/desafio-status.enum";

export class AtualizarDesafioDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    dataHoraResposta: Date;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    status:  string;
}