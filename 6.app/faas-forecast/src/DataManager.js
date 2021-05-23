import { LitElement } from 'lit-element';

export class DataManager extends LitElement {
  static get properties() {
    return {
      url: { type: String }
    };

  }
    constructor(){
      super();
      this.url = '/api/get-forecast'
    }

    getForecast() {
      fetch(this.url)
      .then(obj=>obj.json())
      .then(forecast=>{
        this.dispatchEvent(new CustomEvent('dm-get-forecast',{
          bubbles:true,
          composed: true,
          detail:forecast
        }));
        console.log(obj);

      }).catch(err=>{
        this.dispatchEvent(new CustomEvent('dm-error-forecast', {
          bubbles: true,
          composed: true,
          detail: err
        }));
      });

    }
}
customElements.define('data-manager', DataManager);
