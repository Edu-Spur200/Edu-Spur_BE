import mongoose, { Schema } from "mongoose";
import { IEnquiries } from "../types/index";

const enquiriesSchema = new Schema<IEnquiries>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["School Administrator" , "Parent" , "Student" , "Educator" , "Other"],
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
})
 
const Enquiries = mongoose.model<IEnquiries>("Enquiries", enquiriesSchema);

export default Enquiries;
