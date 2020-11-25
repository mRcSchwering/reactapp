/**
 * can be started with `testcafe chrome test/test1.tsx` while app is running
 * see: https://devexpress.github.io/testcafe/documentation/getting-started/
 */
import { Selector } from "testcafe";

fixture`Getting Started with testcafe`.page`http://localhost:5000/`;

test("Searchbar generic suggestions show", async (t) => {
  const input = await Selector("input");
  await t.click(input);

  const suggestionsDiv = await Selector("div").withAttribute(
    "class",
    /SearchBar_SuggestionsContainer_.*/
  );
  await t.expect(suggestionsDiv.innerText).eql("Some Generic suggestions");
});
