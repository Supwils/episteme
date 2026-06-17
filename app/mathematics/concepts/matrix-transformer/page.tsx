import type { Metadata } from "next";
import MatrixTransformer from "@/subjects/mathematics/components/visualizations/MatrixTransformer";

export const metadata: Metadata = {
  title: "矩阵变换 — Episteme · 格致",
  description: "交互式矩阵变换可视化——观察2x2矩阵如何旋转、缩放、剪切和反射二维空间",
};

export default function MatrixTransformerPage() {
  return (
    <div className="w-full px-6 py-12 sm:px-10 lg:px-16">
      <header className="mb-8">
        <p className="text-fg-muted mb-2 font-mono text-[10px] tracking-[0.42em] uppercase">
          mathematics / concepts / matrix-transformer
        </p>
        <h1 className="font-display text-fg-primary text-[2rem] font-semibold tracking-tight md:text-[2.4rem]">
          矩阵<em className="text-accent-indigo italic"> 变换</em>
        </h1>
        <p className="text-fg-secondary mt-3 max-w-2xl text-sm leading-relaxed">
          2×2 矩阵如何变换二维空间？拖动滑块或选择预设，观察单位正方形如何被旋转、缩放、剪切或反射。
          红色和绿色箭头显示变换后的基向量。
        </p>
      </header>

      <MatrixTransformer />

      <section className="border-border-faint mt-12 border-t pt-8">
        <h2 className="font-display text-fg-primary mb-4 text-lg font-semibold">关于线性变换</h2>
        <div className="text-fg-secondary max-w-2xl space-y-3 text-sm leading-relaxed">
          <p>
            线性代数的核心思想是：矩阵表示线性变换。一个 2×2
            矩阵将二维空间中的每个点映射到另一个点， 同时保持原点不动、直线不变、比例关系不变。
          </p>
          <p>
            行列式（det）表示变换对面积的缩放因子。当行列式为零时，空间被&ldquo;压扁&rdquo;到一条线或一个点，
            变换不可逆（奇异矩阵）。当行列式为负时，空间被翻转。
          </p>
        </div>
      </section>
    </div>
  );
}
