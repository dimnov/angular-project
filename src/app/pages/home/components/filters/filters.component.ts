import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
})
export class FiltersComponent implements OnInit {
  @Output() showCategory = new EventEmitter<string>();
  @Output() categoryItems = new EventEmitter<any[]>();

  categories: string[] | undefined;
  selectedCategory: string | undefined;

  constructor(private storeService: StoreService) { }

  ngOnInit(): void {
    this.storeService.getUniqueCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  onShowCategory(category: string): void {
    this.selectedCategory = category;
    this.showCategory.next(category);

    this.storeService.getAllItems().subscribe(items => {
      const categoryItems = items.filter(item => item.category === category);
      this.categoryItems.next(categoryItems);
    });
  }
}
