const {Schema, model} = require("mongoose")
const {isEmail} = require("validator")
const bcrypt = require("bcrypt")

const usersSchema = new Schema({
    username:{
        type: Schema.Types.String,
        required: true
    },
    fullname:{
        type: Schema.Types.String,
        required: true
    },
    email:{
        type: Schema.Types.String,
        unique: true,
        required: [true, "pls enter email"],
        validate: [isEmail, "pls enter valid email"]
    },
    password:{
        type: Schema.Types.String,
        required: [true, "pls enter password"],
        minlength: [6, "pass lenght is 6"]
    },
},
{
    timestamps:true
}

)

usersSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });

  usersSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
      throw Error("incorrect password");
    }
    throw Error("incorrect email");
  };


const Users = model("users", usersSchema)

module.exports = Users;