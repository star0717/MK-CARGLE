import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { readdirSync, writeFileSync } from 'fs';
import { Address } from 'nodemailer/lib/mailer';
import { getMrnPath } from 'src/config/configuration';

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
     * @param file 저장할 파일
     * @param path 저장 경로
     * @param name 저장할 파일명
     * @returns 저장한 파일명
     */
    async storeFile(file: Express.Multer.File, path: string, name: string) {
        writeFileSync(path + name, file.buffer);
        return name;
    }

    /**
     * startname으로 시작되는 파일명을 가지는 모든 파일명을 반환
     * @param path 파일 검색 경로
     * @param startname 검색할 파일명
     * @returns 배열타입의 검색된 파일명들
     */
    async getFileNames(path: string, startname: string) {
        let fileList = readdirSync(path);
        fileList = fileList.filter((file) => {
            if (file.startsWith(startname))
                return file;
        })
        return fileList;
    }
}
