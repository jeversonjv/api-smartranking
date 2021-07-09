import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class AtualizarJogadorDto {
	@ApiProperty()
	@IsNotEmpty()
	readonly telefoneCelular: string;

	@ApiProperty()
	@IsNotEmpty()
	readonly nome: string;
}