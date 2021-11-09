import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { writeFileSync } from 'fs';
import { Address } from 'nodemailer/lib/mailer';

@Injectable()
export class CommonService {

    constructor(private readonly mailerService: MailerService) { }

    /**
     * 메일 전송
     * @param address 전송할 메일링 리스트
     * @param subject 메일제목
     * @param html 전송할 메일의 컨텐츠
     * @returns 
     */
    async sendMail(address: string | Address | (string | Address)[], subject: string, html: string) {
        if (!address) {
            return false;
        }

        try {
            await this.mailerService.sendMail({
                to: address,
                subject,
                html
            })
        } catch (err) {
            console.log(err);
        }
    }

    /**
     * 파일 시스템에 파일 저장
     * @param file 
     * @param path 
     * @param name 
     */
    async storeFile(file: Express.Multer.File, path: string, name: string) {
        writeFileSync(path + name, file.buffer);
        return name;
    }
}
