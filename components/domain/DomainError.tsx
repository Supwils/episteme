"use client";

import { CalibratingDial } from "@/components/chrome/Calibrating";
import "@/components/chrome/states.css";

/**
 * 出错（T-DESIGN-03g）：刻度盘的指针停在偏离处。不显示原始错误信息，只说清
 * 发生了什么、该做什么：先重试，不行再回到当前领域首页。
 */
export function DomainError({
  homeHref,
  homeLabel,
  reset,
}: {
  homeHref: string;
  homeLabel: string;
  reset: () => void;
}) {
  return (
    <div className="state-view" role="alert">
      <CalibratingDial sweep={false} needle={52} />
      <h2 className="state-view__title">出了点问题</h2>
      <p className="state-view__body">
        这一页没能加载出来，多半是网络中断或服务暂时出错。重试一次通常就好；还不行的话，先回到
        {homeLabel}。
      </p>
      <div className="state-view__actions">
        <button type="button" onClick={reset} className="state-view__action" data-primary>
          重试
        </button>
        <a href={homeHref} className="state-view__action">
          返回{homeLabel}
        </a>
      </div>
    </div>
  );
}
