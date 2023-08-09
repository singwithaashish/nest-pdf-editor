import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PdfService } from './pdf.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadPdf(@UploadedFile() file: Express.Multer.File) {
    console.log('file');
    console.log(file);
    const pdf = await this.pdfService.uploadPdf(file);
    return 'PDF uploaded successfully.';
  }

  @Get()
  async getAllPdfs(@Res() res: Response) {
    const pdfs = await this.pdfService.getAllPdfs();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="pdfs.zip"');

    for (const pdf of pdfs) {
      const pdfBuffer = await this.pdfService.getPdfBuffer(pdf.filename);
      res.write(pdfBuffer);
    }

    res.end();
  }
}
