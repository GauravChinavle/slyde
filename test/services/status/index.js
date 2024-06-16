import { sinon, describe, before, after, it, assert } from "../../utils/requireHelpers.js";
import { Status } from "../../../src/dal/models/index.js";
import { createStatus } from "../../../src/services/index.js";
import mocks from "./mocks.json" with { type: "json" };

describe('testing user crud', function () {
  let sandbox;
  before(() => {
    sandbox = sinon.createSandbox();
  })
  describe('follow flow', function () {
    before(() => {
      sandbox.stub(Status, 'create').resolves(mocks.createStatus.success.response)
    })
    it('should post status successfully', async function () {
      const response = await createStatus(null, mocks.createStatus.success.request, mocks.createStatus.success.response.userID);
      assert.strictEqual(response.userID, mocks.createStatus.success.response.userID);
      assert.strictEqual(response.contentType, mocks.createStatus.success.response.contentType);
      assert.strictEqual(response.content, mocks.createStatus.success.response.content);
      assert.strictEqual(response.contentURL, mocks.createStatus.success.response.contentURL);
      assert.strictEqual(response._id, mocks.createStatus.success.response._id);
      assert.strictEqual(response.createdAt, mocks.createStatus.success.response.createdAt);
      assert.strictEqual(response.updatedAt, mocks.createStatus.success.response.updatedAt);
      assert.strictEqual(response.__v, mocks.createStatus.success.response.__v);
    });
    it('should not follow himself', async function () {
      try {
        await createStatus(mocks.createStatus.success.request.followeeID, mocks.createStatus.success.request);
      } catch (error) {
        assert.strictEqual(error.statusCode, 400);
        assert.strictEqual(error.message, "User cannot follow himself");
      }
    });
    after(() => {
      sandbox.restore();
    })
  });
  after(() => {
    sandbox.restore();
  })
});
