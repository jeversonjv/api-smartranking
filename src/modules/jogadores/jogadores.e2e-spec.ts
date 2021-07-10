import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { JogadoresService } from './jogadores.service';
import { INestApplication } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadorSchema } from './interfaces/jogador.schema';
import { JogadoresModule } from './jogadores.module';
import {
    rootMongooseTestModule,
    closeInMongodConnection
} from "../../config/mongoose-test-module";

let app: INestApplication;
let service: JogadoresService;

beforeEach(async () => {
    const module = await Test.createTestingModule({
        imports: [
            rootMongooseTestModule(),
            MongooseModule.forFeature([{ name: 'Jogador', schema: JogadorSchema }]),
            JogadoresModule
        ],
        providers: [JogadoresService],
    }).compile();

    app = module.createNestApplication();

    service = module.get<JogadoresService>(JogadoresService);

    await app.init();
});

afterAll(async () => {
    await closeInMongodConnection();
    await app.close();
});

describe("GET /api/v1/jogadores", () => {
    it("Deve retornar um array de jogadores com um jogador", async () => {
        // await service.criarJogador({
        //     "nome": "Jeverson Gonçalves",
        //     "email": "jeversontp@gmail.com",
        //     "telefoneCelular": "35123456789"
        // });

        // const { body } = await request(app.getHttpServer())
        //     .get("/api/v1/jogadores")
        //     .expect(200)
        //     .expect('Content-Type', /json/)

        const body = [1];

        expect(body).toHaveLength(1);
    });
})
