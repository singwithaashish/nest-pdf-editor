import {
  Controller,
  Get,
  Param,
  Post,
  Req,
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

  

  @Get(':filename')
  async getPdf(@Param('filename') filename: string, @Res() res: Response) {
    const pdfBuffer = await this.pdfService.getPdfBuffer(filename);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

    res.send(pdfBuffer);
  }

  @Post(':filename')
  @UseInterceptors(FileInterceptor('file'))
  async savePdf(
    @Param('filename') filename: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const pdfBuffer = file.buffer;
    await this.pdfService.savePdf(filename, pdfBuffer);
    return 'PDF saved successfully.';
  }

}
