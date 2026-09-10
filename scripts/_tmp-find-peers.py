import re
from pathlib import Path
cands=[]
for folder in ["content/computer-science/pioneers","content/psychology/theorists"]:
  for p in Path(folder).glob("*.mdx"):
    t=p.read_text()
    end=t.find("\n---",3)
    body=t[end+4:] if t.startswith("---") and end!=-1 else t
    n=len(re.findall(r"[\u4e00-\u9fff]", body))
    if "updated: 2026-09-0" in t and 4000<=n<=4500:
      cands.append((n,str(p)))
for n,p in sorted(cands)[:15]:
  print(n,p)
