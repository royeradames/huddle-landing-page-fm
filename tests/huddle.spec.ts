import { expect, test } from "@playwright/test";

test("renders the supplied logo, headline, copy, illustration and landmarks", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Huddle landing page | Royer Adames");
  await expect(page.getByRole("banner").getByRole("img", { name: "Huddle" })).toBeVisible();
  await expect(page.getByRole("main")).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Build The Community Your Fans Will Love");
  await expect(page.getByText(/Huddle re-imagines the way we build communities\./)).toBeVisible();
  await expect(page.getByRole("contentinfo")).toBeVisible();
  for (const name of ["Huddle", "Huddle's community feed on a desktop browser and a phone."]) {
    const image = page.getByRole("img", { name, exact: true });
    expect(await image.evaluate(element => element instanceof HTMLImageElement && element.complete && element.naturalWidth > 0)).toBe(true);
  }
});

test("declares one site name in the logo, og:site_name and WebSite JSON-LD", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".logo")).toHaveAttribute("alt", "Huddle");
  await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute("content", "Huddle");
  const jsonLd = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent() ?? "{}");
  expect(jsonLd).toEqual({ "@context": "https://schema.org", "@type": "WebSite", name: "Huddle", url: "https://huddle-landing-page-fm.royeradames.com/" });
});

test("Register is an honest demo: it says nothing is sent and makes no request", async ({ page }) => {
  const writes: string[] = [];
  page.on("request", request => { if (request.method() !== "GET") writes.push(request.url()); });
  await page.goto("/");
  const register = page.getByRole("button", { name: "Register" });
  const status = page.getByRole("status");
  await expect(status).toHaveText("");
  await register.focus();
  await page.keyboard.press("Enter");
  await expect(status).toHaveText("Demo only: Huddle is a practice design, so nothing is registered or sent.");
  await expect(register).toHaveAccessibleDescription("Demo only: Huddle is a practice design, so nothing is registered or sent.");
  await expect(register).toBeEnabled();
  expect(writes).toEqual([]);
});

test("hover and focus states match the active-state design", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 800 });
  await page.goto("/");
  const register = page.getByRole("button", { name: "Register" });
  await expect(register).toHaveCSS("background-color", "rgb(255, 255, 255)");
  await expect(register).toHaveCSS("color", "rgb(104, 75, 177)");
  await register.hover();
  await expect(register).toHaveCSS("background-color", "rgb(232, 128, 232)");
  await expect(register).toHaveCSS("color", "rgb(255, 255, 255)");
  const instagram = page.getByRole("link", { name: "Instagram (opens in a new tab)" });
  await instagram.hover();
  await expect(instagram).toHaveCSS("color", "rgb(255, 82, 193)");
  await page.mouse.move(0, 0);
  await page.keyboard.press("Tab");
  await expect(register).toBeFocused();
  await expect(register).toHaveCSS("outline-style", "solid");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Facebook (opens in a new tab)" })).toBeFocused();
});

test("desktop puts the illustration and intro side by side; tablet and mobile stack and centre", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 800 });
  await page.goto("/");
  const art = (await page.locator(".mockups").boundingBox())!;
  const intro = (await page.locator(".intro").boundingBox())!;
  expect(intro.x).toBeGreaterThan(art.x + art.width);
  expect(Math.round(art.x)).toBe(84);
  await expect(page.getByRole("heading", { level: 1 })).toHaveCSS("font-size", "40px");
  await expect(page.getByRole("heading", { level: 1 })).toHaveCSS("text-align", "left");
  expect(await page.evaluate(() => getComputedStyle(document.body).backgroundImage)).toContain("bg-desktop.svg");
  for (const width of [768, 400]) {
    await page.setViewportSize({ width, height: 1024 });
    const stackedArt = (await page.locator(".mockups").boundingBox())!;
    const stackedIntro = (await page.locator(".intro").boundingBox())!;
    expect(stackedIntro.y).toBeGreaterThan(stackedArt.y + stackedArt.height);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCSS("text-align", "center");
    expect((await page.getByRole("button", { name: "Register" }).boundingBox())!.width).toBeGreaterThanOrEqual(200);
    expect(await page.evaluate(() => getComputedStyle(document.body).backgroundImage)).toContain("bg-mobile.svg");
  }
});

test("stays inside 400, 768 and 1440 viewports with the family text and target floors", async ({ page }) => {
  for (const width of [375, 400, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const smallText = await page.locator("h1, p, button, a").evaluateAll(elements =>
      elements.filter(element => element.getClientRects().length > 0 && element.textContent?.trim() && !element.classList.contains("sr-only") && parseFloat(getComputedStyle(element).fontSize) < 16).map(element => element.textContent));
    expect(smallText).toEqual([]);
    for (const control of await page.locator("a, button").all()) {
      const box = await control.boundingBox();
      expect(box?.height).toBeGreaterThanOrEqual(44);
      expect(box?.width).toBeGreaterThanOrEqual(44);
    }
  }
  await page.setViewportSize({ width: 400, height: 900 });
  await page.addStyleTag({ content: "html { font-size: 200%; }" });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test("content and social links work without JavaScript", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ baseURL, javaScriptEnabled: false, viewport: { width: 375, height: 812 } });
  const page = await context.newPage();
  try {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("link", { name: "Twitter (opens in a new tab)" })).toHaveAttribute("href", "https://twitter.com/");
  } finally {
    await context.close();
  }
});
