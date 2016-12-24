/*
 Сервис валют Банка России

 источник данных: https://www.cbr.ru/scripts/Root.asp
 */
import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from "rxjs";
import {CbrCurrency} from "./cbr-currency";

@Injectable()
export class CbrCurrencyService {

  private url: string = '/scripts/XML_valFull.asp';

  constructor(private http: Http) {
  }

  getCurrencies(): Observable<CbrCurrency[]> {
    return this.http.get(this.url)
      .map((response: Response) => this.parseXml(response.text()))
      .do((data: CbrCurrency[]) => console.debug("Подготовлен список валют Банка России в количестве", data.length, "шт."))
  }

  private parseXml(xml: string): CbrCurrency[] {

    let result : Array<CbrCurrency> = [];

    let parser = new DOMParser();
    let doc: XMLDocument = parser.parseFromString(xml, "text/xml");

    let nodes : NodeListOf<Element> = doc.getElementsByTagName("Item");
    if (nodes) {
      for (let i = 0; i < nodes.length; i++) {
        let id: string = nodes[i].getAttribute("ID");
        let name: string;
        let engName: string;
        let parentCode: string;
        let isoNumCode: string;
        let isoCharCode: string;
        let nominal: number = 0;

        let curNodes : NodeList = nodes[i].childNodes;
        for (let i = 0; i < curNodes.length; i++) {
          let curNode : Node = curNodes[i];
          if (curNode.childNodes.length == 0) {
            continue;
          }
          let valueNode : Node = curNode.childNodes[0];
          switch (curNode.nodeName) {
            case "Name":
              name = valueNode.nodeValue;
              break;
            case "EngName":
              engName = valueNode.nodeValue;
              break;
            case "ParentCode":
              parentCode = valueNode.nodeValue;
              break;
            case "ISO_Num_Code":
              isoNumCode = valueNode.nodeValue;
              break;
            case "ISO_Char_Code":
              isoCharCode = valueNode.nodeValue;
              break;
            case "Nominal":
              nominal = +valueNode.nodeValue.replace(',', '.');
              break;
          }
        }

        result.push(new CbrCurrency(
          id,
          name,
          engName,
          parentCode,
          isoNumCode,
          isoCharCode,
          nominal
        ));
      }
    }

    return result;
  }

}
