const { assert, expect } = require('chai');

describe("Guitar", function() {
    let guitar, strings=6;
    const signer = ethers.provider.getSigner(0);
    const signer1 = ethers.provider.getSigner(1);
    before(async() => {
      const Guitar = await ethers.getContractFactory("Guitar");
      guitar = await Guitar.deploy(strings);
      await guitar.deployed();
    })
    it("should be constructed with the proper number of strings", async() => {
      const _strings = await guitar.strings();
      assert.equal(_strings, strings);
    });
    it("should only be allowed to be played by its owner", async () => {
      await expect(guitar.connect(signer1).play('stairway to heaven')).to.be.reverted;
    });
    it("should play a song by its owner", async() => {
      await guitar.connect(signer).play('free bird');
      assert.equal(await guitar.broken(), true);
    });
    it("should not allow owner to play it again", async() => {
      await expect(guitar.play('wish you were here')).to.be.reverted;
    });
    it("should not be fixed without correct cost", async() => {
      await expect(guitar.fix(strings, {
        value: 9
      })).to.be.reverted;
    });
    it("should be fixed by anyone", async() => {
      await guitar.connect(signer1).fix(strings, {
        value: 11
      });
      assert.equal(await guitar.broken(), false);
    });
    it("should be allowed to be played again", async() => {
      await guitar.connect(signer).play('free bird');
      assert.equal(await guitar.broken(), true);
    })
})