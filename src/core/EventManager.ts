import { NartlOptions } from "Components/Context";

export type ToastType = "error" | "success" | "info" | "warning";
export type Toast = {
  type: ToastType;
  message: string;
  id: string;
  duration?: number;
};

type Subscription = (toast: Toast[]) => any;
type EventCallback = (toast: Toast) => any;
type ToastEvent = "show" | "hide";

class EventManager {
  toasts: Toast[] = [];
  events: Record<ToastEvent, EventCallback[]>;
  subscriptions: Subscription[] = [];
  options: NartlOptions = {
    timeout: 3000,
    defaultLevel: "info",
    autoClose: false,
  };

  setOptions(opts: NartlOptions) {
    this.options = {
      ...this.options,
      ...opts,
    };
  }

  subscribe(callback: Subscription) {
    this.subscriptions = [...this.subscriptions, callback];
  }

  unsubscribe(callback: Subscription) {
    this.subscriptions = this.subscriptions.filter(
      (subscription) => subscription !== callback
    );
  }

  emit() {
    this.subscriptions.forEach((subscription) => subscription(this.toasts));
  }

  add(toast: Toast) {
    console.log(toast);
    this.toasts = [...this.toasts, toast];
    this.emit();
    if (this.options.autoClose || toast.duration) {
      setTimeout(() => {
        this.remove(toast);
      }, toast.duration || this.options.timeout);
    }
  }
  remove(toast: Toast) {
    this.toasts = this.toasts.filter((item) => item.id !== toast.id);
    this.emit();
  }
}

export default new EventManager();
