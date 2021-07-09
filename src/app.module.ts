import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from './modules/jogadores/jogadores.module';
import { ConfigModule } from '@nestjs/config';
import { CategoriasModule } from './modules/categorias/categorias.module';
import { DesafiosModule } from './modules/desafios/desafios.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true
		}),
		MongooseModule.forRoot(process.env.MONGODB_URL, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
			useFindAndModify: false
		}),
		JogadoresModule,
		CategoriasModule,
		DesafiosModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule { }
