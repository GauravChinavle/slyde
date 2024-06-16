import { sinon, describe, before, after, it, assert, expect } from "../../utils/requireHelpers.js";
import { User } from "../../../src/dal/models/index.js";
import { jwt } from "../../../src/utils/requireHelper.js";
import { createUser, findAndUpdateUserByID, loginUser } from "../../../src/services/index.js";
import mocks from "./mocks.json" with { type: "json" };

describe('testing user crud', function () {
  let sandbox;
  before(() => {
    sandbox = sinon.createSandbox();
  })
  describe('user creation', function () {
    before(() => {
      sandbox.stub(User, 'create').resolves(mocks.createUser.success.response)
    })
    it('should create user successfully', async function () {
      const response = await createUser(mocks.createUser.success.request);
      assert.strictEqual(response.name, "John Doe");
      assert.strictEqual(response.username, "john1d@mail.com");
      assert.strictEqual(response.password, "abcd");
      assert.strictEqual(response.email, "m1@gg.com");
      assert.strictEqual(response.mobileNumber, "1234567880");
      assert.strictEqual(response.gender, "MALE");
      assert.strictEqual(response.website, "https://www.google.com");
      assert.strictEqual(response.bio, "i like colors");
      assert.strictEqual(response._id, "666ea019bb30afe6dd8eda1c");
      assert.strictEqual(response.createdAt, "2024-06-16T08:19:37.135Z");
      assert.strictEqual(response.updatedAt, "2024-06-16T08:19:37.135Z");
      assert.strictEqual(response.__v, 0);
    });
    after(() => {
      sandbox.restore();
    })
  });
  describe('user updation', function () {
    before(() => {
      sandbox.stub(User, 'findByIdAndUpdate').resolves({...mocks.createUser.success.response, name: "updated name"})
    })
    it('should update user successfully', async function () {
      const response = await findAndUpdateUserByID({...mocks.createUser.success.request, name: "updated name"});
      assert.strictEqual(response.name, "updated name");
      assert.strictEqual(response.username, "john1d@mail.com");
      assert.strictEqual(response.password, "abcd");
      assert.strictEqual(response.email, "m1@gg.com");
      assert.strictEqual(response.mobileNumber, "1234567880");
      assert.strictEqual(response.gender, "MALE");
      assert.strictEqual(response.website, "https://www.google.com");
      assert.strictEqual(response.bio, "i like colors");
      assert.strictEqual(response._id, "666ea019bb30afe6dd8eda1c");
      assert.strictEqual(response.createdAt, "2024-06-16T08:19:37.135Z");
      assert.strictEqual(response.updatedAt, "2024-06-16T08:19:37.135Z");
      assert.strictEqual(response.__v, 0);
    });
    after(() => {
      sandbox.restore();
    })
  });

  describe('user login', function () {
    const stubToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NmRmMWIxM2I1NzgwZTlhOTlhYTJhZiIsImVtYWlsIjoiSmV3ZWxsLk1vc2Npc2tpNDlAeWFob28uY29tIiwidXNlcm5hbWUiOiJNaXRjaGVsLk1hcmtzNTVAaG90bWFpbC5jb20iLCJpYXQiOjE3MTg1MjYwMzEsImV4cCI6MTcyMjEyNjAzMX0.OzeT_ABVNnF6IB2l1LIMjUX-pdyu1SGp6tmTy68BsiQ";
    before(() => {
      sandbox.stub(User, 'findOne').resolves(mocks.createUser.success.response);
      sandbox.stub(jwt, 'sign').returns(stubToken);
    })
    it('should login user successfully', async function () {
      const response = await loginUser({email: mocks.createUser.success.request.email, password: mocks.createUser.success.request.password});
      assert.strictEqual(response.token, stubToken);
      assert.strictEqual(response.expires_in, 3600000);
    });
    after(() => {
      sandbox.restore();
    })
  });
  after(() => {
    sandbox.restore();
  })
});
