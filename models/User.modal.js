import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  class: {
    type: String,
    required: true,
    trim: true,
  },
  rollNo: {
    type: String,
    required: true,
    trim: true,
  },
});

userSchema.plugin(mongoosePaginate);

export default mongoose.model("User", userSchema);
