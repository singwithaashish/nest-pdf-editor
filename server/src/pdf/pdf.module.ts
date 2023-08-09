import { Module } from '@nestjs/common';
import { PdfController } from './pdf.controller';
import { PdfService } from './pdf.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PdfEntity } from './entities/pdf.entity/pdf.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PdfEntity])],
  controllers: [PdfController],
  providers: [PdfService]
})
export class PdfModule {}
