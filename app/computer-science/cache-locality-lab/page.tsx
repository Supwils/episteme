import type { Metadata } from "next";
import dynamic from "next/dynamic";
import {
  ComputerScienceLabDisclaimer,
  ComputerScienceLabLinks,
} from "@/components/computer-science/lab-ui";

const CacheLocalityLab = dynamic(
  () =>
    import("@/components/computer-science/CacheLocalityLab").then((mod) => mod.CacheLocalityLab),
  { loading: () => <p className="text-fg-muted text-sm">示意正在载入</p> }
);

export const metadata: Metadata = {
  title: "缓存步长示意 — 计算机科学 — Episteme · 格致",
  description: "改访问步长，看一小块直接映射示意里命中怎样变。不是性能测量，也不是攻击演示。",
};

export default function Page() {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8">
      <header className="mb-8">
        <p className="text-fg-muted mb-3 font-mono text-[11px] tracking-[0.3em] uppercase">
          教学实验室
        </p>
        <h1 className="text-fg-primary mb-4 text-3xl font-bold sm:text-4xl">缓存步长示意</h1>
        <p className="text-fg-secondary max-w-2xl text-[15px] leading-relaxed">
          地址从 0 走到 15。四条缓存行，每行四个连续字。选步长 1、2、4 或 8，从地址 0
          出发往前跳，看某一行第一次被装入，以及之后走回同一行时算不算命中。
        </p>
      </header>
      <CacheLocalityLab />
      <section className="text-fg-secondary mt-10 space-y-4 text-[14.5px] leading-relaxed">
        <h2 className="text-fg-primary text-lg font-semibold">怎么读</h2>
        <p>
          行号 = ⌊地址 /
          4⌋。直接映射时每组只有一条槽，槽就是行号本身。四行正好盖住这些地址，不会发生容量冲突，这里只能出现冷未命中：某行第一次被碰到时装入，之后同行走到已装入的行算命中。
        </p>
        <p>
          访问序列是 address = 0, s, 2s, …。地址一旦走出这块内存就停。步长 1
          会把每一行里剩下的字也读到，所以多数访问是命中，每行只有第一次算未命中。步长 4
          只踩到每行的开头，于是全部未命中。步长 8
          更疏，两次也都是未命中。具体次数显示在上面的示意里。
        </p>
        <p>
          《存储层级与缓存》用空间局部性说明：刚访问的地址附近，很快也可能被访问，所以硬件按缓存行整行搬入。文中写缓存行通常是
          64 字节，并写到 IBM System/360 Model 85 的缓存容量是 16
          KB。那篇文章没有给出某一台机器的缓存行宽度。因此这里的行宽是教学示意，不是那台机器的参数，也不是把「通常
          64 字节」拿去测量。
        </p>
        <ComputerScienceLabDisclaimer />
        <ComputerScienceLabLinks
          items={[
            {
              href: "/computer-science/concepts/memory-hierarchy-caching",
              label: "存储层级与缓存",
            },
          ]}
        />
      </section>
    </div>
  );
}
