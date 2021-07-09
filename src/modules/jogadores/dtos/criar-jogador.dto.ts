import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";
export class CriarJogadorDto {
	@ApiProperty()
	@IsNotEmpty()
	readonly telefoneCelular: string;

	@ApiProperty()
	@IsEmail()
	readonly email: string;

	@ApiProperty()
	@IsNotEmpty()
	readonly nome: string;
}