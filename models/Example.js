const {Schema, model} = require("mongoose")

const imgSchema = new Schema({
    tittle: {
        type: Schema.Types.String,
        required: true
    },
    body: {
        type: Schema.Types.String,
        required: true
    },
    author: {
        type: Schema.Types.String,
        required: true
    },
    img:{
        data: Buffer,
        contentType: String,
    },
}
,
{
    timestamps:true
}
)

const Example = model("example", imgSchema)

module.exports = Example;