type SavedStyle = {
  element: HTMLElement;
  property: string;
  value: string;
  priority: string;
  applied: string;
};
type ScrollLock = { count: number; styles: SavedStyle[] };
const locks = new WeakMap<Document, ScrollLock>();

function setLockedStyle(
  styles: SavedStyle[],
  element: HTMLElement,
  property: string,
  applied: string
) {
  styles.push({
    element,
    property,
    applied,
    value: element.style.getPropertyValue(property),
    priority: element.style.getPropertyPriority(property),
  });
  element.style.setProperty(property, applied);
}

function restoreStyles(styles: SavedStyle[]) {
  for (const saved of styles) {
    const { element, property, applied, value, priority } = saved;
    // A later owner may have deliberately changed this property while the dialog was open.
    if (
      element.style.getPropertyValue(property) !== applied ||
      element.style.getPropertyPriority(property)
    )
      continue;
    if (value) element.style.setProperty(property, value, priority);
    else element.style.removeProperty(property);
  }
}

function retainLayoutWidth(doc: Document, styles: SavedStyle[], width: number) {
  const gap = doc.body.getBoundingClientRect().width - width;
  if (gap <= 0 || !doc.defaultView) return;
  // WebKit can ignore a stable viewport gutter after overflow becomes hidden.
  const padding = parseFloat(doc.defaultView.getComputedStyle(doc.documentElement).paddingRight);
  setLockedStyle(styles, doc.documentElement, "padding-right", `${padding + gap}px`);
}

export function lockDocumentScroll(doc: Document) {
  let lock = locks.get(doc);
  if (!lock) {
    lock = { count: 0, styles: [] };
    const root = doc.documentElement;
    const view = doc.defaultView;
    const width = doc.body.getBoundingClientRect().width;
    const gutter = view?.getComputedStyle(root).scrollbarGutter;
    const hasScrollbar = view && root.clientWidth < view.innerWidth;
    for (const element of [root, doc.body]) {
      setLockedStyle(lock.styles, element, "overflow-x", "hidden");
      setLockedStyle(lock.styles, element, "overflow-y", "hidden");
    }
    if (hasScrollbar && gutter === "auto") {
      setLockedStyle(lock.styles, root, "scrollbar-gutter", "stable");
    }
    retainLayoutWidth(doc, lock.styles, width);
    locks.set(doc, lock);
  }
  const owned = lock;
  owned.count++;
  let released = false;
  return () => {
    if (released) return;
    released = true;
    if (--owned.count !== 0) return;
    locks.delete(doc);
    restoreStyles(owned.styles);
  };
}
