import Flatpickr from "flatpickr";

export default class ProductOptions {
    constructor() {
        this.initDateTimeInputes();
        this.digitOnlyField();
        salla.document.event.onChange('.visibility_condition', ({target}) => this.visibilityConditionCheck(target));
        //lets call event to show correct fields in cart page
        document.querySelectorAll('.visibility_condition').forEach(input => this.visibilityConditionCheck(input));
        this.optionsAlreadyInitiated = true;
        window.verifyDataBeforeSend = (...data) => this.verifyDataBeforeSend(...data);
        new FileUploader();
    }

    initDateTimeInputes() {
        Flatpickr('.date-element', {"dateFormat": "Y-m-d H:i"});
        Flatpickr('.date-time-element', {"enableTime": true, "dateFormat": "Y-m-d H:i",});
        Flatpickr('.time-element', {enableTime: true, noCalendar: true, dateFormat: "H:i",});
    }

    visibilityConditionCheck(input) {
        let isMultiple = input.type == 'checkbox';
        let option = input.dataset.option;
        document.querySelectorAll('[data-visibility-option="' + option + '"]')
            .forEach((field) => {
                let isEqual = field.dataset.visibilityOperator == '=';
                let value = field.dataset.visibilityValue;
                let condSelector = '#field_' + field.dataset.keyPrefix + '_' + option + (isMultiple ? '_' + value : '');
                let condition = document.querySelector(condSelector);
                let isSelected = isMultiple ? condition.checked : value == condition.value;

                return this.toggleConditionalElement(field, (isEqual && isSelected) || (!isEqual && !isSelected));
            });
    }


    toggleError(element, isHideError = true) {
        let classes = ['border', 'border-red-400'];
        let isRadioOrCheckbox = element.checked !== undefined && element.dataset.isAdvanced;
        let selector = '';
        //is checkbox or radio, toggle error to their labels
        if (!isRadioOrCheckbox) {
            isHideError ? element.classList.add(...classes) : element.classList.remove(...classes);
        }

        document.querySelectorAll(`[for="${element.name}"]`)
            .forEach(label => label.classList[isHideError ? 'add' : 'remove']('text-red-400'));
        //TODO:: add show error message.
        return isHideError;
    }

    /**
     * @param {Element} field
     * @param {boolean} showIt
     */
    toggleConditionalElement(field, showIt) {
        if (showIt) {
            field.classList.remove("hidden");
            field.querySelectorAll('[name]').forEach((input) => {
                input.removeAttribute('disabled');
                //To handle focus on hidden input error
                if (!['checkbox'].includes(input.getAttribute('type')) &&
                    field.getElementsByClassName('required').length) {
                    input.setAttribute('required', '');
                }
            });
            return;
        }
        field.classList.add("hidden");
        field.querySelectorAll('[name]').forEach((input) => {
            input.setAttribute('disabled', '');
            input.removeAttribute('required');

            if (['checkbox'].includes(input.getAttribute('type'))) {
                input.checked = false;
            }

            //firing this event will show errors, so don't run it when pageLoading.
            if (this.optionsAlreadyInitiated) {
                salla.document.event.fireEvent(input, 'change', {'bubbles': true});
            }
        });
    }

    //register verifyDataBeforeSend function
    verifyDataBeforeSend(formData, element, event) {
        if (!element) {
            return;
        }
        let shouldPass = true;
        let isFormData = formData instanceof FormData;

        element.querySelectorAll('[required]:not(:disabled)').forEach(input => {
            //get the value for option, if it's empty return
            let inputValue = formData
                ? (isFormData ? formData.get(input.name) : input.name.replace(']', '').replace('[', '.').split('.').reduce((data, key) => data[key], formData))
                : formData;
            //we may accept 0, '0'
            if (this.toggleError(input, inputValue === undefined || inputValue === '' || inputValue === null)) {
                return shouldPass = false;
            }
        });
        //if current page is single page & there is no qunatity in formData, make sure to inject it to the formData.
        if (salla.config.get('page.slug') === 'product.single' && !(isFormData ? formData.get('quantity') : formData.quantity)) {
            let quantity = app.quantityInput.value;
            (!isFormData && (formData.quantity = quantity)) || formData.append('quantity', quantity);
        }
        return shouldPass ? formData : false;
    }

    digitOnlyField() {
        document.querySelectorAll('.digits-only-field').forEach((field) => {
            field.addEventListener('keyup', (event) => salla.helpers.digitsOnly(event.target))
        })
    }
}