"use client";

import { Component, type ReactNode, type ErrorInfo } from "react";

type SafeRenderProps = { children: ReactNode };
type SafeRenderState = { hasError: boolean };

export default class SafeRender extends Component<SafeRenderProps, SafeRenderState> {
  constructor(props: SafeRenderProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): SafeRenderState {
    return { hasError: true };
  }

  override componentDidCatch(error: Error, _info: ErrorInfo) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[SafeRender] caught error:", error.message);
    }
  }

  override render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}
