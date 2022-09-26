const {Schema, model} = require("mongoose")

const blogSchema = new Schema({
    tittle:{
        type: Schema.Types.String,
        required: true
    },
    body:{
        type: Schema.Types.String,
        required: true
    },
    author:{
        type: Schema.Types.String,
        required: true
    },
    // image:{
    //     data: Buffer,
    //     contentType: "image/png"
    // }
},
{
    timestamps:true
}

)

const Blog = model("blogs", blogSchema)

module.exports = Blog;