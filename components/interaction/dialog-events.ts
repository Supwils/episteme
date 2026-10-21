export function isInOpenDialog(target: EventTarget | null) {
  return target instanceof Element && target.closest("dialog[open]") !== null;
}
