import { Injectable } from '@angular/core';
import json2csv from 'json2csv';


@Injectable({
  providedIn: 'root'
})
export class JsonConvertService {

  constructor() { }
  downloadFile(data: any, filename='data') {
    let csvData = this.ConvertToCSV(data);
    console.log(csvData)
    let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
    if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
        dwldLink.setAttribute("target", "_blank");
    }
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", filename + ".csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
 }

    ConvertToCSV(objArray: any):string{
  
      const data = objArray
      const fields = ['smartmeterId' ,'day', 'c', 'p', 't']
      const opts = { fields }
      
      const records: Readonly<any> = []
      data.forEach((item: { days: any[]; smartmeterId: any; }) => {
          item.days.forEach(day => {
              const record = {
                  smartmeterId: item.smartmeterId,
                  day: day.day,
                  c: day.c.join(';'),
                  p: day.p.join(';'),
                  t: day.t.join(';')
              };
              records['push'](record);
          });
      });let csv = json2csv.parse(records, opts);
      console.log(csv);


      csv =  csv.replace(/,/g, ";");
      return csv
    }
       

}



