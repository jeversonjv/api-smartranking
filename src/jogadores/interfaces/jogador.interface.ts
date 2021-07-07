import { ApiProperty } from "@nestjs/swagger";
import { Document } from "mongoose";
export class Jogador extends Document {
    @ApiProperty()
    telefoneCelular: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    nome: string;

    ranking: string;

    posicaoRanking: number;

    urlFotoJogador: string;
}