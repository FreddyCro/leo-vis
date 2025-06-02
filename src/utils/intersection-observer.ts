type CallbackFn = () => void;
type ObserveFn = ({
  element,
  enterCallback,
  leaveCallback,
  options,
}: {
  element: Element;
  enterCallback?: CallbackFn;
  leaveCallback?: CallbackFn;
  options?: IntersectionObserverInit;
}) => () => void;

let cache: { observe: ObserveFn } | undefined;

export default function createIntersectionObserver() {
  if (cache) return cache;

  let observer: IntersectionObserver | null = null;
  const enterCallbacks = new Map<Element, CallbackFn>();
  const leaveCallbacks = new Map<Element, CallbackFn>();

  const observe: ObserveFn = ({
    element,
    enterCallback,
    leaveCallback,
    options,
  }) => {
    if (!observer) {
      observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          const enterCallback = enterCallbacks.get(entry.target);
          const leaveCallback = leaveCallbacks.get(entry.target);

          if (entry.isIntersecting && enterCallback) {
            enterCallback();
          } else if (leaveCallback) {
            leaveCallback();
          }
        }
      }, options);
    }

    if (enterCallback) enterCallbacks.set(element, enterCallback);
    if (leaveCallback) leaveCallbacks.set(element, leaveCallback);
    observer.observe(element);

    return () => {
      enterCallbacks.delete(element);
      leaveCallbacks.delete(element);
      observer!.unobserve(element);
      if (enterCallbacks.size === 0 && leaveCallbacks.size === 0) {
        observer!.disconnect();
        observer = null;
      }
    };
  };

  return (cache = { observe });
}
