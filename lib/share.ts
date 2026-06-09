export function getTwitterShareUrl(url: string, text: string): string {
  const params = new URLSearchParams({ url, text });
  return `https://twitter.com/intent/tweet?${params.toString()}`;
}

export function getWeiboShareUrl(url: string, text: string): string {
  const params = new URLSearchParams({ url, title: text });
  return `https://service.weibo.com/share/share.php?${params.toString()}`;
}

export function getWechatShareUrl(url: string): string {
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;
}
