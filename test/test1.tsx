/**
 * can be started with `testcafe chrome test/test1.tsx` while app is running
 * see: https://devexpress.github.io/testcafe/documentation/getting-started/
 */
import { Selector } from "testcafe";

fixture`Getting Started with testcafe`.page`http://localhost:3000/`;

test("Error modal opens w/ button click", async (t) => {
  const button = await Selector("button").withText("show error modal");
  await t.click(button);

  const modalTitle = await Selector("div.modal-title.h4");
  await t.expect(modalTitle.innerText).eql("The Error Modal");
});
