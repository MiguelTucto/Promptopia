import { Schema, model, models} from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists.'],
        required: [true, 'Email is required.']
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        //match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2}) [a-zA-z09._]+(?<![_.])$/,"Username invalid, it should contain 8-20 alphanumeric letters and be unique."]
    },
    image: {
        type: String
    },
    password: {
        type: String
    }
})

// Below shows Best Techniques
// First, we check if User exists on db [models.User]
// If User doesn't exists, we create a new one [model("User", UserSchema)];

const User = models.User || model("User", UserSchema);

export default User;