import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'lib-ezloader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  @Input() message = 'updating...';
  @Input() showCancelBtn = true;
  @Input() cancelBtnText = 'Cancel';

  @Output() cancelUpdate = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onCancelUpdate() {
    this.cancelUpdate.emit();
  }
}
