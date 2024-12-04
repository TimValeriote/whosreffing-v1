import { Component, AfterViewInit, ElementRef, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements AfterViewInit {

  @ViewChildren('imageContainer') imageContainers: QueryList<ElementRef>;

  storeItems: { imageSrc: string, name: string }[] = [
    { imageSrc: 'assets/store/hoodie.png', name: 'Hoodie' },
    { imageSrc: 'assets/store/gitch-shirt-long.png', name: 'Long Sleeve Athletic Shirt' },
    { imageSrc: 'assets/store/gitch-shirt-short.png', name: 'Short Sleeve Athletic Shirt' },
    { imageSrc: 'assets/store/snap-back.png', name: 'Snapback' },
    { imageSrc: 'assets/store/hat.png', name: 'Golf Hat' },
    { imageSrc: 'assets/store/golf-towel.png', name: 'Golf Towel' },
    { imageSrc: 'assets/store/beanie.png', name: 'Beanie' },
    { imageSrc: 'assets/store/golf-shirt.png', name: 'Golf Shirt' },
    { imageSrc: 'assets/store/zip.png', name: '1/4 Zip' },
    { imageSrc: 'assets/store/jacket.png', name: 'Soft Shell Jacket' },
  ];

  constructor() { }

  ngAfterViewInit(): void {
    this.setImageContainerHeight();
    setTimeout(() => this.adjustFontSize(), 0);
  }

  setImageContainerHeight(): void {
    this.imageContainers.forEach(container => {
      const imgElement = container.nativeElement.querySelector('img');
      imgElement.onload = () => {
        const imageHeight = imgElement.clientHeight;
        container.nativeElement.style.height = imageHeight + 'px';
      };
    });
  }

  adjustFontSize(): void {
    this.imageContainers.forEach(container => {
      const paragraph = container.nativeElement.querySelector('p');
      const lineHeight = parseInt(window.getComputedStyle(paragraph).lineHeight);
      const containerHeight = container.nativeElement.offsetHeight;
      const numLines = Math.round(containerHeight / lineHeight);
      const maxFontSize = parseFloat(window.getComputedStyle(paragraph).fontSize);
      const minFontSize = 10; // Minimum font size
      const fontSizeIncrement = (maxFontSize - minFontSize) / numLines;
      const newFontSize = maxFontSize - (fontSizeIncrement * numLines);
      paragraph.style.fontSize = `${newFontSize}px`;
    });
  }
}