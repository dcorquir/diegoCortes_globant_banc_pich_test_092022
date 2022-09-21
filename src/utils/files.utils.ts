import * as fs from 'fs';
import { ITribeResponseDetailsDTO } from './../services/api/dto/responses/TribeResponsesDTO';

export class FilesUtils {

    static base64Encode(file: any): string {
        var bitmap = fs.readFileSync(file, 'utf8');
        return new Buffer(bitmap).toString('base64');
    }

    static generateDataCsvMetricsByTribe(data: ITribeResponseDetailsDTO[]): string {
        let rsp = '';
        data.forEach((itm) => {
            rsp += `${itm.id},${itm.name},${itm.tribe},${itm.organization},${itm.coverage},${itm.codeSmells},${itm.bugs},${itm.vulnerabilities},${itm.hotspots},${itm.verificationState},${itm.state}\n`;
        });
        return rsp;
    }

}