// Playwright screenshot script for tutorial illustrations
// Usage: node scripts/screenshot.mjs

import { chromium } from 'playwright';
import { mkdir, access } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// Ensure directory exists
async function ensureDir(dir) {
  try { await access(dir); } catch { await mkdir(dir, { recursive: true }); }
}

// Screenshot definitions with more reliable URLs
const SHOTS = [
  // === Software 06: Environment Setup ===
  {
    url: 'https://www.keil.com/download/product/',
    output: 'content/zh/docs/junior-software/06-environment-setup/keil-download.png',
    description: 'Keil download page',
  },
  {
    url: 'https://www.keil.com/download/product/',
    output: 'content/zh/docs/junior-software/06-environment-setup/keil-mdk-download.png',
    description: 'Keil MDK download page',
    selector: '.download-list',  // try to capture the download list area
  },
  {
    url: 'http://www.stcmcudata.com/',
    output: 'content/zh/docs/junior-software/06-environment-setup/stc-website.png',
    description: 'STC official website',
  },
  {
    url: 'https://www.wch.cn/downloads/CH341SER_EXE.html',
    output: 'content/zh/docs/junior-software/06-environment-setup/ch340-driver.png',
    description: 'CH340 driver page (WCH)',
    waitUntil: 'networkidle',
  },
  {
    url: 'https://www.st.com/content/st_com/en.html',
    output: 'content/zh/docs/junior-software/06-environment-setup/stm32cubeide.png',
    description: 'ST.com homepage',
    waitUntil: 'load',
  },
  {
    url: 'https://www.st.com/content/st_com/en.html',
    output: 'content/zh/docs/junior-software/06-environment-setup/stlink-driver.png',
    description: 'ST.com tools reference',
    waitUntil: 'load',
  },
  {
    url: 'https://www2.keil.com/mdk5/selector/',
    output: 'content/zh/docs/junior-software/06-environment-setup/keil-pack-installer.png',
    description: 'Keil MDK device selector reference',
    waitUntil: 'load',
  },

  // === Software 07: Git Version Control ===
  {
    url: 'https://git-scm.com/',
    output: 'content/zh/docs/junior-software/07-git-version-control/git-download.png',
    description: 'Git official site',
  },
  {
    url: 'https://gitee.com/',
    output: 'content/zh/docs/junior-software/07-git-version-control/gitee-create-repo.png',
    description: 'Gitee homepage',
  },
  {
    url: 'https://github.com/',
    output: 'content/zh/docs/junior-software/07-git-version-control/github-create-repo.png',
    description: 'GitHub homepage',
  },
  {
    url: 'https://gitee.com/help/articles/4113',
    output: 'content/zh/docs/junior-software/07-git-version-control/gitee-pr.png',
    description: 'Gitee help (PR reference)',
    waitUntil: 'networkidle',
  },

  // === Hardware 02: Components and Tools ===
  {
    url: 'http://www.stcmcudata.com/',
    output: 'content/zh/docs/junior-hardware/02-component-and-tools/stc-datasheet.png',
    description: 'STC datasheet reference page',
  },
  {
    url: 'https://www.alldatasheet.com/view.jsp?Searchword=8050',
    output: 'content/zh/docs/junior-hardware/02-component-and-tools/8050-datasheet.png',
    description: '8050 datasheet on alldatasheet',
  },

  // === Hardware 10: Communication Interfaces ===
  {
    url: 'https://en.wikipedia.org/wiki/Universal_asynchronous_receiver-transmitter',
    output: 'content/zh/docs/junior-hardware/10-communication-interfaces/uart-interface.png',
    description: 'UART Wikipedia (interface reference)',
  },
  {
    url: 'https://en.wikipedia.org/wiki/I%C2%B2C',
    output: 'content/zh/docs/junior-hardware/10-communication-interfaces/i2c-interface.png',
    description: 'I2C Wikipedia (interface reference)',
  },
  {
    url: 'https://en.wikipedia.org/wiki/Serial_Peripheral_Interface',
    output: 'content/zh/docs/junior-hardware/10-communication-interfaces/spi-interface.png',
    description: 'SPI Wikipedia (interface reference)',
  },
];

async function takeScreenshot(page, shot) {
  const outputPath = join(ROOT, shot.output);
  await ensureDir(dirname(outputPath));

  const waitUntil = shot.waitUntil || 'domcontentloaded';

  console.log(`📸 [${shot.description}] → ${shot.output}`);

  await page.goto(shot.url, {
    waitUntil,
    timeout: 40000
  });

  // Extra settle time for dynamic content
  await page.waitForTimeout(3000);

  // Dismiss cookie banners if present (common on European/Chinese sites)
  try {
    const cookieBtn = page.locator('button:has-text("Accept"), button:has-text("同意"), button:has-text("接受"), button:has-text("OK"), [aria-label="Accept cookies"], .accept-cookies, #accept-cookies');
    if (await cookieBtn.first().isVisible({ timeout: 2000 }).catch(() => false)) {
      await cookieBtn.first().click();
      await page.waitForTimeout(500);
    }
  } catch {}

  const opts = { type: 'png', fullPage: false };

  if (shot.selector) {
    try {
      const el = page.locator(shot.selector).first();
      await el.waitFor({ state: 'visible', timeout: 5000 });
      await el.screenshot({ ...opts, path: outputPath });
    } catch {
      // Fall back to full page screenshot if selector not found
      await page.screenshot({ ...opts, path: outputPath });
    }
  } else {
    await page.screenshot({ ...opts, path: outputPath });
  }

  return true;
}

async function main() {
  console.log('Launching Chromium...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    locale: 'zh-CN',
    ignoreHTTPSErrors: true,
  });

  let success = 0;
  let failed = 0;

  for (const shot of SHOTS) {
    // Create a fresh page for each shot to avoid navigation chaining issues
    const page = await context.newPage();
    try {
      await takeScreenshot(page, shot);
      console.log(`   ✅ OK`);
      success++;
    } catch (err) {
      const msg = err.message.length > 100 ? err.message.slice(0, 100) + '...' : err.message;
      console.log(`   ⚠️  Failed: ${msg}`);
      failed++;
    } finally {
      await page.close().catch(() => {});
    }
  }

  await browser.close();
  console.log(`\nDone: ${success} succeeded, ${failed} failed (${SHOTS.length} total)`);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
