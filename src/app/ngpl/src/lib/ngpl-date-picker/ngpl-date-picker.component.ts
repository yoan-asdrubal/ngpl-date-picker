/*
 *
 * Yoan Asdrubal Quintana Ramirez.
 *  8/7/2019
 *
 */

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {tap} from 'rxjs/operators';
import * as moment from 'moment';
import {Moment} from 'moment';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {Changes} from 'ngx-reactivetoolkit';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {NGPL_FILTER_BASE} from 'ngpl-common';

const DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY'
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

@UntilDestroy()
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngpl-date-picker',
  templateUrl: './ngpl-date-picker.component.html',
  styleUrls: ['./ngpl-date-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgplDatePickerComponent),
      multi: true
    },
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    {provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS},
    {
      provide: NGPL_FILTER_BASE, useExisting: forwardRef(() => NgplDatePickerComponent)
    }
  ]
})
export class NgplDatePickerComponent implements OnInit, OnChanges, OnDestroy, ControlValueAccessor {

  @Input() placeHolder = '';

  @Input() floatLabel = '';

  /** Define el atributo appearance del matFormField, permite los mismos valores */
  @Input() appearance: 'legacy' | 'standard' | 'fill' | 'outline' | 'default' = 'outline';

  @Input() customClass: '';

  /**  Controla si el componenten debe mostrar un Skeleton */
  @Input() skeleton = false;

  @Input() exportMilliseconds = true;
  _value;

  @Input() format = null;
  /**
   *  Maneja valor minimo de fecha a seleccionar
   */
  @Input() min: any;
  @Changes('min') min$;
  _min: Date;

  /** Maneja valor maximo a seleccionar  */
  @Input() max: any;
  @Changes('max') max$;
  _max: Date;

  disabledControl = false;

  @Input() readOnlyControl = false;


  inputControl = new FormControl();

  /**
   * Emite cuando cambia el valor seleccionado
   */
  @Output() valueChange = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
    this.min$
      .pipe(
        untilDestroyed(this),
        tap(val => this.procesarPeriodoMinimo(val))
      )
      .subscribe();
    this.max$
      .pipe(
        untilDestroyed(this),
        tap(val => this.procesarPeriodoMaximo(val))
      )
      .subscribe();

    this.inputControl.valueChanges
      .pipe(
        untilDestroyed(this),
        tap(val => {
          if (!val) {
            this._value = null;
            this.valueChange.emit(this._value);
            this.onChange(this._value);
            this.onTouch(this._value);
            return;
          }
          try {
            let date = val;
            if (!(val instanceof Date)) {
              date = (val as Moment).toDate();
            }
            if (!!this.format) {
              this._value = moment(date).format(this.format);
            } else if (this.exportMilliseconds === true) {
              this._value = date.getTime();
            } else {
              this._value = date;
            }
            this.valueChange.emit(this._value);
            this.onChange(this._value);
            this.onTouch(this._value);
          } catch (e) {
            console.log(' error ', e);
            this._value = null;
            this.valueChange.emit(this._value);
            this.onChange(this._value);
            this.onTouch(this._value);
          }

        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
  }

  ngOnChanges(): void {
  }

  onChange: any = () => {
  };
  onTouch: any = () => {
  };

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabledControl = isDisabled;
  }

  writeValue(obj: string): void {
    if (!obj) {
      this.inputControl.setValue('');
    } else {
      try {
        let date;
        if (typeof obj === 'string' && obj.trim().length > 0) {
          date = new Date(obj);
        }
        if (typeof obj === 'number') {
          date = new Date(obj);
        }
        if (!!date) {
          this.inputControl.setValue(date);
        }
      } catch (e) {
        console.warn('Error en la entrada de la fecha ', obj, e);
      }
    }
  }

  procesarPeriodoMinimo(obj): void {
    let localMin = null;
    if (!!obj) {
      if (typeof obj === 'string') {
        const values: any[] = obj.split('#');
        if (values.length >= 2) {
          localMin = new Date(values[0], values[1] - 1, 1);
        }
      } else if (typeof obj === 'number') {
        localMin = new Date(obj);
      } else if (obj instanceof Date) {
        localMin = obj;
      } else {
        localMin = new Date(obj.anno, obj.mes - 1, 1);
      }
    } else {
      localMin = null;
    }


    if (!!localMin && !!this._value) {
      if (this._value < localMin) {
        this.inputControl.setValue(null);
      }
    }
    this._min = localMin;
  }

  procesarPeriodoMaximo(obj): void {
    let localMax = null;
    if (!!obj) {

      if (typeof obj === 'string') {
        const values: any[] = obj.split('#');
        if (values.length >= 2) {
          localMax = new Date(values[0], values[1], 0);
        }
      } else if (typeof obj === 'number') {
        localMax = new Date(obj);
      } else if (obj instanceof Date) {
        localMax = obj;
      } else {
        localMax = new Date(obj.anno, obj.mes - 1, 0);
      }
    } else {
      localMax = null;
    }

    if (!!localMax && !!this._value) {
      if (this._value > localMax) {
        this.inputControl.setValue(null);
      }
    }
    this._max = localMax;
  }

  clearValue(): void {
    this.inputControl.setValue('');
  }

  newValue(value: any): void {
    this.writeValue(value);
  }

}
