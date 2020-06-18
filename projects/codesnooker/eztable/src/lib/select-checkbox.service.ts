import {
  ComponentFactoryResolver,
  Inject,
  Injectable,
  ViewContainerRef,
} from '@angular/core';
import { DynamicCheckboxComponent } from './dynamic-checkbox/dynamic-checkbox.component';

@Injectable({
  providedIn: 'root',
})
export class SelectCheckboxService {
  private factoryResolver: ComponentFactoryResolver;
  private rootViewContainer: ViewContainerRef;
  constructor(
    @Inject(ComponentFactoryResolver) factoryResolver: ComponentFactoryResolver
  ) {
    this.factoryResolver = factoryResolver;
  }

  setRootViewContainerRef(viewContainerRef) {
    this.rootViewContainer = viewContainerRef;
  }

  addDynamicComponent(): DynamicCheckboxComponent {
    const factory = this.factoryResolver.resolveComponentFactory(
      DynamicCheckboxComponent
    );
    const component = factory.create(this.rootViewContainer.injector);
    this.rootViewContainer.insert(component.hostView);
    component.instance.value = false;
    return component.instance;
  }
}
