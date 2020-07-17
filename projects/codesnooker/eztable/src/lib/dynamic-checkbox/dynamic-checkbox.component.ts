import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DynamicCheckboxConfig } from './dynamic-checkbox.config';
import { AccessorContent } from './models';

export const FEATHER_CHECKBOX_CONTROL_VALUE_ACCESSOR: AccessorContent = {
  provide: NG_VALUE_ACCESSOR,
  /* tslint:disable-next-line: no-use-before-declare */
  useExisting: forwardRef(() => DynamicCheckboxComponent),
  multi: true,
};

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ez-dynamic-checkbox',
  templateUrl: './dynamic-checkbox.component.html',
  styleUrls: ['./dynamic-checkbox.component.scss'],
})
export class DynamicCheckboxComponent
  implements ControlValueAccessor, OnInit, AfterViewInit {
  /** if true will not react on any user events */
  @Input() disabled = false;
  @Input() checkedClazz = 'text-success';

  @Output() checked = new EventEmitter<boolean>();

  // @HostBinding('style.opacity')
  // get opacity() {
  //   return this.disabled ? 1 : 1;
  // }

  value: boolean;

  // tslint:disable-next-line:no-any
  onChange: any = Function.prototype;
  // tslint:disable-next-line:no-any
  onTouched: any = Function.prototype;
  /** aria label for rating */
  ariaLabel: string;

  // value: boolean;

  constructor(
    public changeDetection: ChangeDetectorRef,
    config: DynamicCheckboxConfig
  ) {
    Object.assign(this, config);
  }

  ngOnInit() {
    // this.value = false;
  }

  ngAfterViewInit(): void {}

  writeValue(checked: boolean): void {
    this.value = checked;

    // this.onChange(this.value);
  }

  // Allows Angular to register a function to call when the model (rating) changes.
  // Save the function as a property to call later here.
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // Allows Angular to register a function to call when the input has been touched.
  // Save the function as a property to call later here.
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // Allows Angular to disable the input.
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  markSelected() {
    const newValue = true;
    if (!this.disabled) {
      this.writeValue(newValue);
      this.onChange(newValue);
      this.checked.emit(newValue);
    }
  }

  markUnSelected(emit: boolean = true) {
    const newValue = false;
    if (!this.disabled) {
      this.writeValue(newValue);
      this.onChange(newValue);
      if (emit) {
        this.checked.emit(newValue);
      }
    }
  }

  updateSelection(value: boolean) {
    const newValue = value;

    if (!this.disabled) {
      this.writeValue(newValue);
      this.onChange(newValue);
      this.checked.emit(newValue);
    }
  }

  toggleChecked(event: MouseEvent) {
    const newValue: boolean = !this.value;
    if (!this.disabled) {
      this.writeValue(newValue);
      this.onChange(newValue);
      if (event) {
        event.stopImmediatePropagation();
      }
      this.checked.emit(newValue);
    }
  }
}
