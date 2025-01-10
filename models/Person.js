const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    work: {
        type: String,
        enum: ['chef','waiter','manager'],
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String
    },
    salary: {
        type: Number,
        required: true
    },
    username: {
        type:String,
        required:true
    },
    password: {
        type: String,
        required: true
    }
});

personSchema.pre('save', async function(next) {
    const person = this;
    // Hash the password only if it has been modified
    if(!person.isModified('password')) return next();

    try {
        // Hash password generation
        const salt = await bcrypt.genSalt(10)
        // Hash password
        const hashedPassword = await bcrypt.hash(person.password, salt);
        // Override the plain password to hash password
        person.password = hashedPassword;
        next()
    } catch (error) {
        return next(error)
    }
})

personSchema.methods.comparePassword = async function(candidatePassword) {
    try{
        const isMatch = await bcrypt.compare(candidatePassword, this.password)
        return isMatch
    } catch(error) {
        throw error
    }
}


const Person = mongoose.model('Person', personSchema);
module.exports = Person;