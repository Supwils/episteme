import type { Metadata } from "next";
import { SecularizationChart } from "@/components/religion/SecularizationChart";
import { ReligionDisclaimer, ReligionLinks } from "@/components/religion/lab-ui";

export const metadata: Metadata = {
  title: "世俗化指标示意 — 宗教学 — Episteme · 格致",
  description: "切换参与、认同与制度席位，看“宗教消退”其实测的是哪一项。",
};

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8">
      <header className="mb-8">
        <p className="text-fg-muted mb-3 font-mono text-[11px] tracking-[0.3em] uppercase">
          教学实验室
        </p>
        <h1 className="text-fg-primary mb-4 text-3xl font-bold sm:text-4xl">世俗化指标示意</h1>
        <p className="text-fg-secondary max-w-2xl text-[15px] leading-relaxed">
          切换参与、认同与制度席位。美国数字来自皮尤宗教景观研究；西欧来自 2018
          年十五国调查。条形是教学切片，不是世界宗教人口底图。
        </p>
      </header>
      <SecularizationChart />
      <section className="text-fg-secondary mt-10 space-y-4 text-[14.5px] leading-relaxed">
        <h2 className="text-fg-primary text-lg font-semibold">怎么读</h2>
        <p>
          「宗教在消退」常常把三件事揉成一句。出席可以降得很快，自称基督徒可以降得更慢，国教条款可以几十年不动。英国
          2018 年的名义基督徒仍远多于每月礼拜的人。
        </p>
        <p>
          美国 2023–24 年调查改成主要在线和纸质作答，皮尤明确警告：不要拿它的每周出席率和 2007、2014
          年电话调查直接画下降曲线。认同份额的长期对比，皮尤自己是当作可比较序列来写的。
        </p>
        <ReligionDisclaimer />
        <ReligionLinks
          items={[
            { href: "/religion/secularization/secularization-debate", label: "世俗化之争" },
            { href: "/religion/frontier/nones-plateau-after-rls", label: "无宗教身份的走平" },
            {
              href: "/religion/frontier/global-religious-demography-switching",
              label: "全球宗教人口与改宗",
            },
          ]}
        />
      </section>
    </main>
  );
}
