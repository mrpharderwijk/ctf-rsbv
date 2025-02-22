import { ReactElement } from "react";

import { Box } from "@/components/atoms/box/box";

export function FooterCopyright(): ReactElement {
  const currentYear = new Date().getFullYear();

  return (
    <Box display="flex" flexDirection="col">
      <span className="">&copy; {currentYear} Whatever, All Rights Reserved</span>
      <div className="">
        <ul>
          <li>Privacy</li>
          <li>Terms</li>
          <li>Sitemap</li>
        </ul>
      </div>
    </Box>
  );
}
