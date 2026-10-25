---
title: "Renaming the config file in Scrollback"
description: "Four files need updating when you rename scrollback.config.ts. Here is what they are and why."
pubDatetime: 2026-10-08T00:00:00Z
category: "Guides"
postType: "How-To"
tags:
  - "configuration"
  - "getting-started"
---

The default config file is called `scrollback.config.ts`. If you want to rename it, four files reference it and all four need to match.

## The files

**`tsconfig.json`** maps the `@/` import alias. Add an entry for your new name:

    "paths": {
      "@/*": ["./src/*"],
      "@/my-config": ["./my-config"]
    }

**`astro.config.ts`** imports the config to read your site URL and font settings:

    import config from "./my-config";

**`src/config.ts`** imports it to resolve defaults. Leave the `.ts` extension off or the alias won't match:

    import userConfig from "@/my-config";

**The file itself** at the root of the repo. Rename it on GitHub by opening it, tapping the pencil, and editing the filename field at the top.

Make all four changes before pushing. If you do them in separate commits, the build will fail between each one until all four are in sync.
