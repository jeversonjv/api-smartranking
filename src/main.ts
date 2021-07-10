import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import * as momentTimezone from "moment-timezone";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalFilters(new AllExceptionsFilter());

    const config = new DocumentBuilder()
        .setTitle('Smart Ranking')
        .setDescription('API para controlar o ranking de um clube de tênis')
        .setVersion('1.0')
        .addTag('Ranking')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    Date.prototype.toString = (): any => {
        return momentTimezone(this)
            .tz("America/Sao_Paulo")
            .format("YYYY-MM-DD HH:mm:ss");
    }

    await app.listen(8080);
}
bootstrap();
