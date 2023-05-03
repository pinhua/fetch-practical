/* eslint-disable no-restricted-syntax */
require('dotenv').config();
const { test, expect } = require('@playwright/test')

const baseUrl = 'http://localhost:' + process.env.PORT;

test('handles success', async ({ page }) => {
    await page.goto(new URL('/create.html', baseUrl).toString());

    const submitButton = page.locator('#form button');
    const titleInput = page.locator('#title');
    const bodyInput = page.locator('#body');
    const isSuccess = page.locator('#isSuccess');
    const responseStatus = page.locator('#responseStatus');
    const responseMessage = page.locator('#responseMessage');
    const fetchError = page.locator('#fetchError');

    const title = 'this is a title';
    const body = 'this is a body';
    const id = body.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);

    await titleInput.fill(title);
    await bodyInput.fill(body);
    const [_, response] = await Promise.all([
        submitButton.click(),
        page.waitForResponse(new URL('/posts', baseUrl).toString(), { timeout: 1000 })
    ])
    const json = await response.json();
    await expect(json).toEqual({ title, body, id });

    await expect(isSuccess).toHaveText('TRUE');
    await expect(responseStatus).toHaveText('201');
    await expect(responseMessage).toHaveText(id + '');
    await expect(fetchError).toHaveText('');
});

test('handles server error - 500', async ({ page }) => {
    await page.goto(new URL('/create.html', baseUrl).toString());

    const submitButton = page.locator('#form button');
    const titleInput = page.locator('#title');
    const bodyInput = page.locator('#body');
    const isSuccess = page.locator('#isSuccess');
    const responseStatus = page.locator('#responseStatus');
    const responseMessage = page.locator('#responseMessage');
    const fetchError = page.locator('#fetchError');

    const title = 'server error';
    const body = 'server error';

    await titleInput.fill(title);
    await bodyInput.fill(body);
    await Promise.all([
        submitButton.click(),
        page.waitForResponse(new URL('/posts', baseUrl).toString(), { timeout: 1000 })
    ])

    await expect(isSuccess).toHaveText('FAILED');
    await expect(responseStatus).toHaveText('500');
    await expect(responseMessage).toHaveText('');
    await expect(fetchError).toHaveText('');
});

test('handles user error - 400', async ({ page }) => {
    await page.goto(new URL('/create.html', baseUrl).toString());

    const submitButton = page.locator('#form button');
    const titleInput = page.locator('#title');
    const bodyInput = page.locator('#body');
    const isSuccess = page.locator('#isSuccess');
    const responseStatus = page.locator('#responseStatus');
    const responseMessage = page.locator('#responseMessage');
    const fetchError = page.locator('#fetchError');

    const title = 'user error';
    const body = 'user error';

    await titleInput.fill(title);
    await bodyInput.fill(body);
    await Promise.all([
        submitButton.click(),
        page.waitForResponse(new URL('/posts', baseUrl).toString(), { timeout: 1000 })
    ])

    await expect(isSuccess).toHaveText('FAILED');
    await expect(responseStatus).toHaveText('400');
    await expect(responseMessage).toHaveText('');
    await expect(fetchError).toHaveText('');
});

test('handles fetch error', async ({ page }) => {
    await page.goto(new URL('/create.html', baseUrl).toString());

    const submitButton = page.locator('#form button');
    const titleInput = page.locator('#title');
    const bodyInput = page.locator('#body');
    const isSuccess = page.locator('#isSuccess');
    const responseStatus = page.locator('#responseStatus');
    const responseMessage = page.locator('#responseMessage');
    const fetchError = page.locator('#fetchError');

    const title = 'close';
    const body = 'close';

    await titleInput.fill(title);
    await bodyInput.fill(body);
    await Promise.all([
        submitButton.click(),
    ])

    await expect(isSuccess).toHaveText('ERROR');
    await expect(responseStatus).toHaveText('');
    await expect(responseMessage).toHaveText('');
    await expect(fetchError).toHaveText('Failed to fetch');
});