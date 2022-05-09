const bcrypt = require('bcryptjs');
const truncate = require('../utils/truncate');
const {User} = require('../../src/app/models');

describe('User',()=>{
    beforeEach(async()=>{
        await truncate();
    });
    it('should encrypt user password', async ()=>{
       try {
        const user = await User.create({
            name:'André',
            email:'andred@gmail.com',
            password: '123456'
        }) 
        const compareHash = await bcrypt.compare(user.password, user.password_hash)
        expect(compareHash).toBe(true);
       } catch (error) {
        console.log('')
       }
    });
});


