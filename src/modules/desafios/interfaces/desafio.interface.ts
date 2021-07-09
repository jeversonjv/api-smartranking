import { Document } from "mongoose";
import { Jogador } from "../../jogadores/interfaces/jogador.interface";

import { DesafioStatus } from "./desafio-status.enum";

export interface Desafio extends Document {
    dataHoraDesafio: Date;
    status: DesafioStatus | string;
    dataHoraSolicitacao: Date;
    dataHoraResposta: Date;
    solicitante: Jogador | string;
    categoria: string;
    jogadores: Array<Jogador | string>;
    partida: Partida;
}

export interface Partida extends Document {
    categoria: string;
    jogadores: Array<Jogador | string>;
    def: Jogador;
    resultador: Array<Resultado>;
}

export interface Resultado {
    set: string;
}