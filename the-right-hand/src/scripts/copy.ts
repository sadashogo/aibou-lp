import { site } from '../data/site';

const btn = document.getElementById('copyBtn');
const note = document.getElementById('copyNote');

let hideTimer: ReturnType<typeof setTimeout> | undefined;

const showNote = (message: string) => {
  if (!note) return;
  note.textContent = message;
  note.style.opacity = '1';
  if (hideTimer) clearTimeout(hideTimer);
  hideTimer = setTimeout(() => {
    note.style.opacity = '0';
  }, 2200);
};

const fallbackCopy = (): boolean => {
  const field = document.getElementById('bookingUrlField');
  if (!field) return false;

  try {
    const range = document.createRange();
    range.selectNodeContents(field);
    const selection = window.getSelection();
    if (!selection) return false;
    selection.removeAllRanges();
    selection.addRange(range);
    const ok = document.execCommand('copy');
    selection.removeAllRanges();
    return ok;
  } catch {
    return false;
  }
};

const copy = async () => {
  const url = site.bookingUrl;

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(url);
      showNote('コピーしました');
      return;
    }
  } catch {
    // fall through to legacy fallback
  }

  if (fallbackCopy()) {
    showNote('コピーしました');
  } else {
    showNote('手動でコピーしてください');
  }
};

btn?.addEventListener('click', () => {
  void copy();
});
