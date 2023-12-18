import mongoose from "mongoose";
const accountSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
}, { timestamps: true });
const Account = mongoose.model("Account", accountSchema, "accounts");
export default Account;
