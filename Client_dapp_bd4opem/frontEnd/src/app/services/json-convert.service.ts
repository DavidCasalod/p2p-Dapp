import { Injectable } from '@angular/core';
import {  Parser } from 'json2csv';
import { json2csv } from 'json-2-csv';
import jsonexport from "jsonexport/dist";

@Injectable({
  providedIn: 'root'
})
export class JsonConvertService {
//["SmartmeterID","time", "C","P", "T"]
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

// ConvertToCSV(json: any): any {
//   var options = {
//     expandArrayObjects : true,
//     //keys: ["months", "months.smartmetersID", ".days", ".days.day", ".days.c", ".days.p", ".days.t"]
//   };

//   let json2csvCallback = function (err: any, csv: any) {
//     if (err) throw err;
//     console.log(csv);
// };
// const resultado = json2csv(json,json2csvCallback,options )
// console.log(resultado)
// return resultado

// }
    
    //  ConvertToCSV(json: any, fields: any): string {
        
    //     let options: {};
      
    //     options = fields;
    //     const Json2csvParser = new Parser(options);
      
    //     const csv = Json2csvParser.parse(JSON.parse(json));
    //     console.log(JSON.parse(json));
    //     console.log(csv);
    //     return csv;
    //   }

// ConvertToCSV(objArray: any, headerList: string[]) {
//      let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
//      let str = '';
//      let row = 'S.No,';

//      for (let index in headerList) {
//          row += headerList[index] + ',';
//      }
//      row = row.slice(0, -1);
//      str += row + '\r\n';
//      for (let i = 0; i < array?.length; i++) {
//          let line = (i+1)+'';
//          for (let index in headerList) {
//             let head = headerList[index];
//                 line += ',' + array[i][head];
//          }
//          str += line + '\r\n';
//      }
//      return str;
//  }


    // ConvertToCSV(objArray: any){
    //     var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    //     var str = '';

    //     for (var i = 0; i < array?.length; i++) {
    //         var line = '';
    //         for (var j=0; j<array[i]?.length; j++) {
    //             if (line != '') line += ','
    //             line += array[i];

    //             for(var k=0; k<array[i][j]?.length; k++) {
    //                 if (line != '') line += ','
    //                 line += array[i][j];

    //                 for(var t=0; t<array[i][j][k]?.length; t++) {
    //                     if (line != '') line += ','
    //                     line += JSON.parse(array[i][j][k]);
    //                 }
    //             }
    //         }
    //         str += line + '\r\n';
    //     }
    //     return str;
    // }
    
    // ConvertToCSV(objArray: any){

    //   var jsonObj = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
      
    //   var str = '';
    //   //recorro neses
    //   for (var month = 0; month < jsonObj?.length; month++) {
    //       var line = '';
    //       //recorro smartmetters
    //       for (var smetter=0; smetter<jsonObj[month]?.length; smetter++) {
    //         console.log(jsonObj[month].smartmeterId[smetter]);
    //         console.log(jsonObj[month]["smartmeterId"][smetter]);
    //           line += jsonObj[month][smetter]["smartmeterId"];
    //           //recorro días
    //           for(var day=0; day<jsonObj[month][smetter]?.length; day++) {
    //             //recorro horas
    //             for(var hour=0; hour<24; hour++) {
    //                 //TODO: poner el año correcto
    //                 const year = 2022 //año provisional
    //                 const date = new Date(year, month, day, hour, 0, 0);
    //                 console.log(jsonObj[month][smetter]["days"][day]["p"][hour]);
    //                 console.log(jsonObj[month][smetter].days[day].p[hour]);
    //                 line += ',' + date.toString();
    //                 line += ',' + jsonObj[month][smetter]["days"][day]["p"][hour];
    //                 line += ',' + jsonObj[month][smetter]["days"][day]["c"][hour];
    //                 line += ',' + jsonObj[month][smetter]["days"][day]["t"][hour];
    //                 //queremos que cada fila de la tabla sea una lectura de un smartmeter
    //                 str += line + '\r\n';
    //             }
    //           }
    //       }
    //   }
    //   return str;
    // }



    ConvertToCSV(objArray: any):any{

      var result2 
       jsonexport(objArray ,function(err: any, csv: any){
        if (err) return console.error(err);
        console.log(csv);
        result2 = csv
      });
      
      return result2
}
}
