import { LitElement, html, css } from 'lit-element';
import { openWcLogo } from './open-wc-logo.js';
import './DataManager';

export class FaasForecast extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      page: { type: String },
      forecast: { type: Array }
    };
  }

  constructor() {
    super();
    this.forecast= [];
  }

  static get styles() {
    return css`
      :host {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        font-size: calc(10px + 2vmin);
        color: #1a2b42;
        max-width: 960px;
        margin: 0 auto;
        text-align: center;
      }

      main {
        flex-grow: 1;
      }

      .logo > svg {
        margin-top: 36px;
        animation: app-logo-spin infinite 20s linear;
      }

      @keyframes app-logo-spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      .app-footer {
        font-size: calc(12px + 0.5vmin);
        align-items: center;
      }

      .app-footer a {
        margin-left: 5px;
      }

      ul {
        list-style: none;
        /* background-color: grey; */
        padding: 50px;
      }

      li {
        padding: 30px;
        margin: 30px;
        border: 1px solid black;
      }
    `;
  }

  firstUpdated(){
    this.shadowRoot.getElementById('dm').getForecast();
  }

  onGetForecast(ev) {
    this.forecast = ev.detail;
  }

  get renderForecast() {
    return html`
    <ul>
      ${
        this.forecast.map((forecast)=>{
        return html`
          <li>
            <p>${forecast.name} - ${forecast.state}</p>
            <p>
              Precipitacion: ${forecast.prediccion[0].prob_precipitacion}%
            </p>
            <p>Temperatura Maxima: ${forecast.prediccion[0].temperatura.max}º</p>
            <p>Temperatura Minima: ${forecast.prediccion[0].temperatura.min}º</p>
          </li>`
      })
    }
    </ul>
    `;
  }

  get renderSpinner() {
    return this.forecast.length<=0 ? html`<div class="logo">${openWcLogo}</div>`:''
  }

  render() {
    return html`
      <data-manager
        id=dm
        @dm-get-forecast="${this.onGetForecast}">
      </data-manager>
      <main>
        <h1>My app</h1>
        ${this.renderForecast}
        ${this.renderSpinner}
      </main>

      <p class="app-footer">
        🚽 Made with love by
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/open-wc"
          >open-wc</a
        >.
      </p>
    `;
  }
}
