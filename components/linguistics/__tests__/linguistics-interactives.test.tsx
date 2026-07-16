// @vitest-environment happy-dom
import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { IPAExplorer } from "@/components/linguistics/IPAExplorer";
import { LanguageFamilyMap } from "@/components/linguistics/LanguageFamilyMap";
import { SoundChangeLab } from "@/components/linguistics/SoundChangeLab";
import { SyntaxTreeBuilder } from "@/components/linguistics/SyntaxTreeBuilder";
import { WritingSystemTimeline } from "@/components/linguistics/WritingSystemTimeline";

afterEach(cleanup);

describe("linguistics interactives", () => {
  it("switches between consonant and vowel articulatory models", () => {
    render(<IPAExplorer />);

    expect(screen.getByRole("heading", { name: "发音与 IPA 探索器" })).toBeDefined();
    expect(screen.getByText("清双唇塞音")).toBeDefined();

    fireEvent.click(screen.getByRole("button", { name: "元音" }));
    expect(screen.getByText("闭前不圆唇元音")).toBeDefined();
    expect(
      screen.getByRole("button", { name: "i，闭前不圆唇元音" }).getAttribute("aria-pressed")
    ).toBe("true");
  });

  it("builds a syntax tree in stages and exposes the ambiguity contrast", () => {
    render(<SyntaxTreeBuilder />);

    fireEvent.click(screen.getByRole("button", { name: "日语 SOV" }));
    expect(screen.getByText("John ga tegami o yonda")).toBeDefined();

    fireEvent.click(screen.getByRole("button", { name: "下一步" }));
    fireEvent.click(screen.getByRole("button", { name: "下一步" }));
    expect(screen.getByText("阶段 3 / 4")).toBeDefined();
    expect(screen.getByRole("button", { name: "S：小句" })).toBeDefined();

    fireEvent.click(screen.getByRole("button", { name: "英语 SVO + PP 歧义" }));
    fireEvent.click(screen.getByRole("button", { name: "名词附着" }));
    expect(screen.getByText(/携带望远镜的那个人/)).toBeDefined();
  });

  it("separates genealogy from typology and filters the teaching sample", () => {
    render(<LanguageFamilyMap />);

    expect(screen.getByRole("heading", { name: "语言谱系与类型地图" })).toBeDefined();
    expect(screen.getByText("官话", { selector: "h3" })).toBeDefined();
    expect(screen.getByText(/汉藏语系 · 汉语族/)).toBeDefined();

    fireEvent.click(screen.getByRole("button", { name: "类型" }));
    fireEvent.change(screen.getByLabelText("语言类型维度"), {
      target: { value: "modality" },
    });
    expect(screen.getByText("视觉—动作通道")).toBeDefined();

    fireEvent.change(screen.getByLabelText("语系筛选"), {
      target: { value: "印欧语系" },
    });
    expect(screen.getByRole("group", { name: /当前显示 2 个样本/ })).toBeDefined();
    fireEvent.click(screen.getByRole("button", { name: /爱尔兰语，印欧语系/ }));
    expect(screen.getByText("Gaeilge")).toBeDefined();
  });

  it("filters writing-system relationships and preserves evidence boundaries", () => {
    render(<WritingSystemTimeline />);

    expect(screen.getByRole("heading", { name: "全球文字系统时间轴" })).toBeDefined();
    expect(screen.getByText("当前显示 19 / 19 个证据节点")).toBeDefined();
    fireEvent.click(screen.getByRole("button", { name: "社群创制" }));
    expect(screen.getByText("当前显示 5 / 19 个证据节点")).toBeDefined();
    fireEvent.change(screen.getByLabelText("文字系统区域筛选"), {
      target: { value: "西非" },
    });
    expect(screen.getByText("当前显示 3 / 19 个证据节点")).toBeDefined();
    fireEvent.click(screen.getByRole("button", { name: /N’Ko 为曼丁语言创制/ }));
    expect(screen.getByText(/N’Ko 与拉丁、Ajami 实践并存/)).toBeDefined();
  });

  it("tests regular sound change against conditioning, borrowing, and analogy", () => {
    render(<SoundChangeLab />);

    expect(screen.getByRole("heading", { name: "音变证据实验室" })).toBeDefined();
    expect(screen.getAllByText(/原始波利尼西亚语/).length).toBeGreaterThan(1);

    fireEvent.click(screen.getByRole("button", { name: /意大利语条件腭化/ }));
    fireEvent.click(screen.getByRole("button", { name: "条件音变" }));
    expect(screen.getByText("当前证据支持")).toBeDefined();
    expect(screen.getByText(/保留项不是规则失败/)).toBeDefined();

    fireEvent.click(screen.getByRole("button", { name: /英语复数类推重组/ }));
    fireEvent.click(screen.getByRole("button", { name: "类推重组" }));
    expect(screen.getByText("生产性 -s 复数按单数 book 重新建立 books。")).toBeDefined();
  });
});
