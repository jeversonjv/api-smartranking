import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriasModule } from '../categorias/categorias.module';
import { JogadoresModule } from '../jogadores/jogadores.module';
import { DesafiosController } from './desafios.controller';
import { DesafiosService } from './desafios.service';
import { DesafioSchema } from './interfaces/desafio.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: "Desafio", schema: DesafioSchema },
        ]),
        JogadoresModule,
        CategoriasModule
    ],
    controllers: [DesafiosController],
    providers: [DesafiosService]
})
export class DesafiosModule { }
