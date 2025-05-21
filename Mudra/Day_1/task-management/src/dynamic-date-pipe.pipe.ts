import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { formatDate } from '@angular/common';

@Pipe({
  name: 'dynamicDatePipe',
  pure: false,
})
export class DynamicDatePipePipe implements PipeTransform {
  constructor(private translate: TranslateService) {}

  transform(value: any, format: string = 'fullDate'): string {
    const lang = this.translate.currentLang || 'en';
    const formatted = formatDate(value, format, lang);
    return this.localizeDigits(formatted, lang);
  }

  private localizeDigits(input: string, lang: string): string {
    const digitMaps: Record<string, string[]> = {
      hi: ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'],
      ar: ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'],
    };

    const digits = digitMaps[lang];
    if (!digits) return input;

    return input.replace(/\d/g, (d) => digits[+d]);
  }
}
