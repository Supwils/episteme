from pathlib import Path
import re
files=[
"content/psychology/theorists/solomon-asch.mdx",
"content/computer-science/pioneers/alan-kay.mdx",
"content/computer-science/pioneers/linus-torvalds.mdx"
]
for f in files:
    t=Path(f).read_text()
    if t.startswith("---"):
        end=t.find("\n---",3)
        body=t[end+4:] if end!=-1 else t
    else:
        body=t
    n=len(re.findall(r"[\u4e00-\u9fff]", body))
    print(n, f)
