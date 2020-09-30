/// <reference lib="webworker" />
import { EMPTY, from } from 'rxjs';
import { catchError, delay, tap } from 'rxjs/operators';

class Updater {
  private started: boolean;
  private headers: { [key: string]: string } = {};
  private refreshDelay = 1000;
  private url: string;

  control(value: string = '') {
    switch (value) {
      case 'start':
        this.start();
        break;
      case 'stop':
        this.stop();
        break;
      case 'terminate':
        this.terminate();
        break;
      default:
        console.error(`Unknown control command: ${value}`);
    }
  }

  setHeaders(headers: { [key: string]: string } = {}) {
    this.headers = {
      ...this.headers,
      ...headers
    };
  }

  setConfiguration(configuration: { [key: string]: any } = {}) {
    this.refreshDelay = configuration.refreshDelay || this.refreshDelay;
    this.url = configuration.url || '';
  }

  private start() {
    if (!this.started) {
      this.started = true;
      this.fetch();
    }
  }

  private fetch() {
    if (this.url) {
      from(
        fetch(this.url, { headers: this.headers, cache: 'no-cache' }).then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error(response.statusText);
          }
        })
      )
        .pipe(
          tap(response => postMessage(this.buildResponse(true, response), null)),
          catchError(error => {
            postMessage(this.buildResponse(false, error.message), null);
            return EMPTY;
          }),
          delay(this.refreshDelay)
        )
        .subscribe(() => {
          if (this.started) {
            this.fetch();
          }
        });
    } else {
      console.error(`Url not provided, use:`);
      console.error(`worker.postMessage({command: 'configure', value: {url: 'foo', ...}})`);
    }
  }

  private stop() {
    this.started = false;
  }

  private terminate() {
    this.stop();
    close();
  }

  private buildResponse(success: boolean, response) {
    return { success, response };
  }
}

const updater = new Updater();

addEventListener('message', ({ data }) => {
  switch (data.command) {
    case 'control':
      updater.control(data.value);
      break;
    case 'setHeaders':
      updater.setHeaders(data.value);
      break;
    case 'configure':
      updater.setConfiguration(data.value);
      break;
    default:
      console.error(`Unknown command: ${data.command}`);
  }
});
