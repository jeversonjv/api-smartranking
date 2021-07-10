import { ApiProperty } from "@nestjs/swagger";
import { ArrayMinSize, IsArray, IsOptional, IsString } from "class-validator";
import { Evento } from "../interfaces/categoria.interface";

export class AtualizarCategoriaDto {

    @ApiProperty()
    @IsString()
    @IsOptional()
    descricao: string;

    @ApiProperty()
    @IsArray()
    @ArrayMinSize(1)
    eventos: Array<Evento>
}