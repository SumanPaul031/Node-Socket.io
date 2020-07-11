const expect = require('expect');
let {generateMessage} = require('./message');

describe('Generate message', () => {
    it("should generate correct message object", () => {
        let from = "Suman Paul", text = "Test Message", message = generateMessage(from, text);
        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, text});
    })
})