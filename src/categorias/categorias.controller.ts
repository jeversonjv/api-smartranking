import { Body, Controller, Get, HttpCode, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria.dto';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { Categoria } from './intefaces/categoria.interface';

@Controller('api/v1/categorias')
export class CategoriasController {

    constructor(
        private readonly categoriasService: CategoriasService
    ) { }

    @Post()
    @UsePipes(ValidationPipe)
    async criarCategoria(
        @Body() criarCategoriaDto: CriarCategoriaDto
    ): Promise<Categoria> {
        return await this.categoriasService.criarCategoria(criarCategoriaDto);
    }

    @Get()
    async consultarCategorias(): Promise<Categoria[]> {
        return await this.categoriasService.consultarCategorias();
    }

    @Get("/:categoria")
    async consultarCategoriaPeloId(
        @Param("categoria") categoria: string
    ): Promise<Categoria> {
        return await this.categoriasService.consultarCategoriaPeloId(categoria);
    }

    @Put("/:categoria")
    @UsePipes(ValidationPipe)
    @HttpCode(204)
    async atualizarCategoria(
        @Body() atualizarCategoriaDto: AtualizarCategoriaDto,
        @Param("categoria") categoria: string
    ): Promise<void> {
        return await this.categoriasService.atualizarCategoria(categoria, atualizarCategoriaDto);
    }

    @Post("/:categoria/jogadores/:idJogador")
    @HttpCode(204)
    async atribuirCategoriaJogador(
        @Param("categoria") categoria: string,
        @Param("idJogador") idJogador: string,
    ): Promise<void> {
        return await this.categoriasService.atribuirCategoriaJogador(categoria, idJogador);
    }

}
