import  mongoose  from 'mongoose'

const ticketSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: String, default: "TODO", enum: ['IN_PROGRESS', "TODO","COMPLETED"] },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default:null
  },
  priority: String,
  deadline: Date,
  helpfulNotes: String,
  relatedSkills: [String],
  createdAt: {
    type: Date,
    default:Date.now(),
  },
  updatedAt: {
    type: Date,
  }
})

export default mongoose.model("Ticket", ticketSchema);