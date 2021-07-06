import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from './jogadores/jogadores.module';

@Module({
	imports: [
		JogadoresModule,
		MongooseModule.forRoot("mongodb+srv://jeverson:PlCn1dm3a38nLh8k@cluster0.xgiud.mongodb.net/smartranking?retryWrites=true&w=majority", {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
			useFindAndModify: false
		})
	],
	controllers: [],
	providers: [],
})
export class AppModule { }
