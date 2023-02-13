import { test, expect } from '@playwright/test';

test('main', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  // await page.getByText('Logout').click();
  await page.locator('[placeholder="Username"]').fill('tester')
  await page.waitForTimeout(1000);

  await page.locator('[placeholder="Password"]').fill('FooFooBar123!')
  await page.waitForTimeout(1000);

  await page.getByText('Login').click();
  await page.waitForTimeout(5000);

});

test.only('Login via API', async ({ page, context, request }) => {
  const loginResponse = await request.post(`http://localhost:4200/`, {
    data: {
      username: 'tester',
      password: 'FooFooBar123!',
      rememberMe: true,
    },
  });

  console.log(await loginResponse.body())

  const {
    data: { token },
  } = await loginResponse.body().then((b) => {

    return JSON.parse(b.toString());
  });

  expect(token).toMatch(/^[a-z0-9]{80}$/);

  await context.addCookies([
    { name: 'Authorization', value: `"Token ${token}"`, path: '/', domain: 'localhost:4200' },
  ]);

  await page.goto(`http://localhost:4200/`);

  // await expect(page).toHaveURL(/dashboard/);

  await page.waitForTimeout(5000);

  await context.close();
});