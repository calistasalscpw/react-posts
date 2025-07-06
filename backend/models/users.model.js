import mongoose, {Schema} from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.*@.*\..*/, "Please fill a valid email format"] 
    },
    password: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        // default: false
    },
    posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}]
})

UserSchema.pre('save', async function(next) {
    if (this.password && (this.isNew || this.isModified('password'))){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})

const User = mongoose.model('User', UserSchema);
export default User;