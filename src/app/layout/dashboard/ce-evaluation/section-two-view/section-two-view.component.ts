import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
declare const google: any;
@Component({
  selector: 'section-two-view',
  templateUrl: './section-two-view.component.html',
  styleUrls: ['./section-two-view.component.scss']
})
export class SectionTwoViewComponent implements OnInit {

  @Input('data') data;
  locations: any = [];
  centerPoint: any = [];
  lat: any;
  long: any;
  locationMap: any;
  mapSrc: SafeResourceUrl;
  url: any;

  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.data = changes.data.currentValue;
    this.locationMap= this.data.sectionMap;
    this.lat=this.locationMap.latitude;
    this.long=this.locationMap.longitude;
    this.url = 'https://maps.google.com/maps?q=' + this.lat + '%2C' + this.long + '&t=&z=13&ie=UTF8&iwloc=&output=embed';
    this.mapSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }
}
