import {
  AfterViewInit,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Inject,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { DynamicCheckboxComponent } from '../dynamic-checkbox/dynamic-checkbox.component';
import { SelectCheckboxService } from '../select-checkbox.service';
import { SimpleRowComponent } from '../simple-row/simple-row.component';

@Component({
  selector: 'lib-checkbox-row',
  templateUrl: './checkbox-row.component.html',
  styleUrls: ['./checkbox-row.component.scss'],
})
export class CheckboxRowComponent extends SimpleRowComponent
  implements OnInit, AfterViewInit {
  @ViewChild('dynamic', {
    read: ViewContainerRef,
  })
  viewContainerRef: ViewContainerRef;

  key: string;

  private checkboxComponent: DynamicCheckboxComponent;
  // tslint:disable-next-line: variable-name
  private _viewInit = false;

  @HostBinding('class.selected')
  @HostBinding('class.text-light')
  @HostBinding('class.bg-primary')
  isSelected = false;

  @Output() rowSelected = new EventEmitter<boolean>();

  @HostListener('click', ['$event.target'])
  onClick(target: any) {
    // this.isSelected = !this.isSelected;
    this.checkboxComponent.toggleChecked(undefined);
  }

  constructor(
    @Inject(SelectCheckboxService)
    private readonly service: SelectCheckboxService
  ) {
    super();
  }

  ngAfterViewInit(): void {
    this.service.setRootViewContainerRef(this.viewContainerRef);
    this.checkboxComponent = this.service.addDynamicComponent();
    this.checkboxComponent.checked.subscribe((selection: boolean) => {
      this.isSelected = selection;
      this.rowSelected.emit(this.isSelected);
      this.updateCheckboxState();
    });

    this.updateCheckboxState();
    this._viewInit = true;
  }

  updateCheckboxState() {
    if (this.checkboxComponent) {
      if (this.isSelected) {
        this.checkboxComponent.checkedClazz = 'text-light';
      } else {
        this.checkboxComponent.checkedClazz = '';
      }
    }
  }

  ngOnInit(): void {}

  onCheckedByParent(value: boolean) {
    if (this._viewInit) {
      this.checkboxComponent.updateSelection(value);
    } else {
      // call it again after view init... that is retry after 30 milliseconds
      setTimeout(() => {
        this.onCheckedByParent(value);
      }, 30);
    }
  }
}
