import { test, expect, chromium } from '@playwright/test';

import {toDoListPageObject} from "../page_object/toDoListPageObject";
import * as toDoListData from "../data/toDoListData.json"

test.beforeEach(async ({ page }) => {
  await toDoListPageObject.navigate(page)
});

test('has title', async ({ page }) => {
  await toDoListPageObject.checkPageTitle(page)
});

test('add to do item', async ({page}) => {
  await toDoListPageObject.fillAddTodoItem(page, toDoListData.taskToAdd)
  await toDoListPageObject.enterAddTodoItem(page)
  await toDoListPageObject.checkIfTaskWasAdded(page, toDoListData.taskToAdd)
})

test('completed to do item', async ({page}) => {

  await toDoListPageObject.fillAddTodoItem(page, toDoListData.taskToComplete)
  await toDoListPageObject.enterAddTodoItem(page)
  await toDoListPageObject.checkIfTaskWasAdded(page, toDoListData.taskToComplete)
  await toDoListPageObject.clickOnCompletedTask(page, toDoListData.taskToComplete)
  await toDoListPageObject.chceckIfTaskIsCompleted(page, toDoListData.taskToComplete)
})

test('count tasks on list', async ({page}) => {
  await toDoListPageObject.checkHowManyElementsOnList(page, 3)
  await toDoListPageObject.fillAddTodoItem(page, toDoListData.taskToComplete)
  await toDoListPageObject.enterAddTodoItem(page)
  await toDoListPageObject.checkIfTaskWasAdded(page, toDoListData.taskToComplete)
  await toDoListPageObject.checkHowManyElementsOnList(page, 4)
})

test('delete to do item', async ({page}) => {
  await toDoListPageObject.fillAddTodoItem(page, toDoListData.taskToDelete)
  await toDoListPageObject.enterAddTodoItem(page)
  await toDoListPageObject.checkIfTaskWasAdded(page, toDoListData.taskToDelete)
  await toDoListPageObject.clickDeleteButton(page, toDoListData.taskToDelete)
  await toDoListPageObject.checkIfTaskWasDeleted(page, toDoListData.taskToDelete)
})
