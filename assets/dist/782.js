"use strict";(self.webpackChunkTheme_One=self.webpackChunkTheme_One||[]).push([[782],{4782:(t,e,s)=>{s.r(e),s.d(e,{salla_quantity_input:()=>i});var n=s(4766);const i=class{constructor(t){(0,n.r)(this,t),this.hostAttributes={},this.hasIncrementSlot=!1,this.hasDecrementSlot=!1,this.didLoaded=!1,this.quantity=1}watchPropHandler(){this.didLoaded&&salla.helpers.debounce((()=>salla.document.event.fireEvent(this.textInput,"change",{bubbles:!0})))()}componentWillLoad(){this.quantity=parseInt(this.host.getAttribute("value"))||1,this.hasIncrementSlot=!!this.host.querySelector('[slot="increment-button"]'),this.hasDecrementSlot=!!this.host.querySelector('[slot="decrement-button"]')}componentDidLoad(){this.didLoaded=!0,this.textInput.addEventListener("input",(t=>salla.helpers.inputDigitsOnly(t.target)))}getInputAttributes(){for(let t=0;t<this.host.attributes.length;t++)["id","value","min","class"].includes(this.host.attributes[t].name)||(this.hostAttributes[this.host.attributes[t].name]=this.host.attributes[t].value);return this.hostAttributes}decrement(){this.quantity<=1||this.quantity--}increment(){let t=parseInt(this.host.getAttribute("max"));t&&this.quantity>=t||this.quantity++}render(){return(0,n.h)(n.H,{class:"s-quantity-input s-quantity-input-container"},(0,n.h)("button",{onClick:()=>this.increment(),class:"s-quantity-input-button",type:"button"},this.hasIncrementSlot?"":(0,n.h)("i",{class:"sicon-add"}),(0,n.h)("slot",{name:"increment-button"})),(0,n.h)("input",Object.assign({class:"s-quantity-input-input"},this.getInputAttributes(),{min:"1",value:this.quantity,ref:t=>this.textInput=t})),(0,n.h)("button",{class:"s-quantity-input-button",onClick:()=>this.decrement(),type:"button"},this.hasDecrementSlot?"":(0,n.h)("i",{class:"sicon-minus"}),(0,n.h)("slot",{name:"decrement-button"})))}get host(){return(0,n.g)(this)}static get watchers(){return{quantity:["watchPropHandler"]}}};i.style=":host{display:block}"}}]);