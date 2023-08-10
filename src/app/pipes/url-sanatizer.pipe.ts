import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
@Pipe({
  name: 'urlSanatizer'
})
export class UrlSanatizerPipe implements PipeTransform {

  constructor(private sanatize: DomSanitizer) { }
  transform(value: string, ...args: unknown[]): unknown {
    let url: SafeResourceUrl = "";
    if (value) {
      url = this.sanatize.bypassSecurityTrustResourceUrl(value)
    }
    else {
      url = "";
    }
    return url;
  }

}
