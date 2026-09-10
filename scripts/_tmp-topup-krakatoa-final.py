#!/usr/bin/python3
from pathlib import Path
p = Path("content/earth-science/events/krakatoa-1883.mdx")
t = p.read_text()
old = "喀拉喀托教给后世的不只是建立全球网络，也包括如何审视网络的盲区。"
new = old + "今天重建事件时，科学家仍须交叉比对报纸、电报、航海日志与仪器曲线，让彼此独立的来源互相校验。"
assert old in t
p.write_text(t.replace(old, new, 1))
