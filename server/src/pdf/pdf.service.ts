import { Injectable, NotFoundException } from '@nestjs/common';
import { readFileSync, writeFileSync } from 'fs';
import { PDFDocument } from 'pdf-lib';
// import { MulterFile } from './pdf.controller';
import { InjectRepository } from '@nestjs/typeorm';
import { PdfEntity } from './entities/pdf.entity/pdf.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PdfService {
  constructor(
    @InjectRepository(PdfEntity)
    private readonly pdfRepository: Repository<PdfEntity>,
  ) {}

  async uploadPdf(file: Express.Multer.File): Promise<PdfEntity> {
    const pdfBuffer = file.buffer; // Get the PDF buffer from the uploaded file

    const pdf = this.pdfRepository.create({
      filename: file.originalname,
      buffer: pdfBuffer, // Assign the PDF buffer to the buffer property
    });

    return this.pdfRepository.save(pdf);
  }

  async getAllPdfs(): Promise<PdfEntity[]> {
    return this.pdfRepository.find();
  }

  async getPdf(filename: string): Promise<Buffer> {
    const pdf = await this.pdfRepository.findOne({
      where: { filename },
    });

    return readFileSync(`./pdfs/${pdf.filename}`);
  }

  async getPdfBuffer(filename: string): Promise<Buffer> {
    const pdf = await this.pdfRepository.findOne({
      where: { filename },
    });

    if (!pdf) {
      throw new NotFoundException(`PDF with filename '${filename}' not found.`);
    }

    return pdf.buffer; // Return the PDF buffer
  }

  async fillPdfForm(
    filename: string,
    formData: Record<string, any>,
  ): Promise<Buffer> {
    const pdfBuffer = await this.getPdf(filename);
    const pdfDoc = await PDFDocument.load(pdfBuffer);

    // Fill PDF form fields with formData
    // Example: pdfDoc.getForm().getTextField('fieldName').setText(formData.fieldName);

    const modifiedPdfBuffer = await pdfDoc.save();
    const pdfUint8Array = Uint8Array.from(modifiedPdfBuffer);
    const pdfBuffer2 = Buffer.from(modifiedPdfBuffer);
    return pdfBuffer2;
  }
}
