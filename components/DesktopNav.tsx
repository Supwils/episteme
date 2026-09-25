"use client";

import { AtlasMenu } from "./chrome/AtlasMenu";
import { EXPLORE_GROUP } from "./nav-data";
import { NavDropdown } from "./NavDropdown";

/** Six cluster buttons (opening the atlas panel) + the 探索 menu. */
export function DesktopNav() {
  return (
    <div className="hidden items-center gap-1 lg:flex">
      <AtlasMenu triggers="clusters" />
      <NavDropdown group={EXPLORE_GROUP} />
    </div>
  );
}
