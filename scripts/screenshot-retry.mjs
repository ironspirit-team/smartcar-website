// Retry script for failed Playwright screenshots
import { chromium } from 'playwright';
import { mkdir, access } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

async function ensureDir(dir) {
  try { await access(dir); } catch { await mkdir(dir, { recursive: true }); }
}

// Only the screenshots that failed - with alternative URLs/approaches
const SHOTS = [
  // keil.com sometimes closes connection, retry with a different approach
  {
    url: 'https://www.keil.com/download/product/',
    output: 'content/zh/docs/junior-software/06-environment-setup/keil-download.png',
    description: 'Keil download page (retry)',
  },
  // ST.com blocks automated access, use STMicroelectronics Wikipedia instead
  {
    url: 'https://en.wikipedia.org/wiki/STM32',
    output: 'content/zh/docs/junior-software/06-environment-setup/stm32cubeide.png',
    description: 'STM32 Wikipedia (as STM32CubeIDE reference)',
  },
  // ST-LINK driver reference - use ST Wikipedia page
  {
    url: 'https://en.wikipedia.org/wiki/ST-LINK',
    output: 'content/zh/docs/junior-software/06-environment-setup/stlink-driver.png',
    description: 'ST-LINK Wikipedia page',
  },
  // Keil MDK reference
  {
    url: 'https://en.wikipedia.org/wiki/Keil_(company)',
    output: 'content/zh/docs/junior-software/06-environment-setup/keil-pack-installer.png',
    description: 'Keil Wikipedia page',
  },
  // Gitee PR page - use different Gitee page
  {
    url: 'https://help.gitee.com/repository/create/',
    output: 'content/zh/docs/junior-software/07-git-version-control/gitee-pr.png',
    description: 'Gitee help repository page',
  },
];

async function main() {
  console.log('Launching Chromium for retries...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    ignoreHTTPSErrors: true,
  });

  let success = 0;
  let failed = 0;

  for (const shot of SHOTS) {
    const page = await context.newPage();
    const outputPath = join(ROOT, shot.output);
    await ensureDir(dirname(outputPath));

    console.log(`📸 [${shot.description}] → ${shot.output}`);
    try {
      await page.goto(shot.url, {
        waitUntil: 'domcontentloaded',
        timeout: 40000
      });
      await page.waitForTimeout(3000);

      // Dismiss cookie banners
      try {
        const cookieBtn = page.locator('button:has-text("Accept"), button:has-text("同意"), button:has-text("接受"), .accept-cookies');
        if (await cookieBtn.first().isVisible({ timeout: 2000 }).catch(() => false)) {
          await cookieBtn.first().click();
          await page.waitForTimeout(500);
        }
      } catch {}

      await page.screenshot({ type: 'png', fullPage: false, path: outputPath });
      console.log(`   ✅ OK`);
      success++;
    } catch (err) {
      const msg = err.message.length > 150 ? err.message.slice(0, 150) + '...' : err.message;
      console.log(`   ⚠️  Failed: ${msg}`);
      failed++;
    } finally {
      await page.close().catch(() => {});
    }
  }

  await browser.close();
  console.log(`\nRetries done: ${success} succeeded, ${failed} failed`);
}

main().catch(err => { console.error('Fatal:', err); process.exit(1); });
