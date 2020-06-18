import {
  AfterViewInit,
  Component,
  HostBinding,
  HostListener,
  Inject,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormControl } from '@angular/forms';
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

  @Input() formControl: FormControl;
  private checkboxComponent: DynamicCheckboxComponent;

  @HostBinding('class.selected')
  @HostBinding('class.text-light')
  @HostBinding('class.bg-primary')
  isSelected = false;

  @HostListener('click', ['$event.target'])
  onClick() {
    console.log('tapped');
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
    console.log('#ngAfterViewInit => ', this.viewContainerRef);
    this.service.setRootViewContainerRef(this.viewContainerRef);
    this.checkboxComponent = this.service.addDynamicComponent();
    this.checkboxComponent.checked.subscribe((selection: boolean) => {
      this.isSelected = selection;
      if (this.isSelected) {
        this.checkboxComponent.checkedClazz = 'text-light';
      } else {
        this.checkboxComponent.checkedClazz = '';
      }
    });
  }

  ngOnInit(): void {
    console.log('#ngOnInit => ', this.viewContainerRef);
  }

  onCheckedByParent(value: boolean) {
    console.log('On Checked by Parent => ', value);
    this.checkboxComponent.updateSelection(value);
  }
}
