import { LightningElement, api } from 'lwc';
import { FlowAttributeChangeEvent } from 'lightning/flowSupport';

export default class MultiColumnInput extends LightningElement {
    @api itemSize;

    @api values;

    _labels = [];
    @api
    get labels() {
        if (this._labels) {
            return this._labels.join();
        } else {
            return "";
        }
            
    }
    set labels(value) {
        if (value) {
            this._labels = value.split(',');
            this._values = [];
            for (let i = 0; i < this._labels.length; i++) {
                let item = {
                    id: i,
                    label: this._labels[i].trim(),
                    value: i,
                };
                this._values.push(item);
            }
        } else {
            this._labels = [];
        }
    }
    _values;
    get displayItems() {
        return this._values;
    }
    get values() {
        let result = [];
        for (let i = 0; i < this._values.length; i++) {
            result.push(this._values[i].value);
        }
        return result;
    }

    handleInputChange(event) {
        console.log(event);
        for (let i = 0; i < this._values.length; i++) {
            if (this._values[i].label === event.target.label.trim()) {
                this._values[i].value = event.target.value;

                this.dispatchEvent(new FlowAttributeChangeEvent("values", this.values));
            }
        }
    }
}