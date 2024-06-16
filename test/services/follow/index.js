import { sinon, describe, before, after, it, assert } from "../../utils/requireHelpers.js";
import { Follow } from "../../../src/dal/models/index.js";
import { createFollow } from "../../../src/services/index.js";
import mocks from "./mocks.json" with { type: "json" };

describe('testing user crud', function () {
  let sandbox;
  before(() => {
    sandbox = sinon.createSandbox();
  })
  describe('follow flow', function () {
    before(() => {
      sandbox.stub(Follow, 'findOne').resolves(mocks.createFollow.success.response);
      sandbox.stub(Follow, 'create').resolves(mocks.createFollow.success.response)
    })
    it('should follow other user successfully', async function () {
      const response = await createFollow(mocks.createFollow.success.response.followerID, mocks.createFollow.success.request);
      assert.strictEqual(response.followerID, mocks.createFollow.success.response.followerID);
      assert.strictEqual(response.followeeID, mocks.createFollow.success.response.followeeID);
      assert.strictEqual(response._id, mocks.createFollow.success.response._id);
      assert.strictEqual(response.createdAt, mocks.createFollow.success.response.createdAt);
      assert.strictEqual(response.updatedAt, mocks.createFollow.success.response.updatedAt);
      assert.strictEqual(response.__v, mocks.createFollow.success.response.__v);
    });
    it('should not follow himself', async function () {
      try {
        await createFollow(mocks.createFollow.success.request.followeeID, mocks.createFollow.success.request);
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
