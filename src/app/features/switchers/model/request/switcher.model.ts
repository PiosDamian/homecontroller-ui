export class SwitcherRequest {
  /**
   * name of switcher
   */
  public name?: string;
  /**
   * physical address of pin to which listener device is connected
   */
  public listenerAddress?: string;
  /**
   * used to override actual {@link pl.piosdamian.homecontroller.application.model.SwitcherDevice} with new
   * if pin have been connected with one
   * Optional
   */
  public force = false;
}
