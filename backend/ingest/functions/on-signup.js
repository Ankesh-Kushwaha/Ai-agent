import  { inngest } from "../client.js"
import User from '../../models/user.js'
import { NonRetriableError } from "inngest"
import { sendMail } from "../../utils/mailer.js"

export const OnuserSignUp = inngest.createFunction(
  { id: "on-user-signup",retries:2 },
  { event:"user/signup" },
  async ({event,step }) => {
    try {
      const { email } = event.data
      const user= await step.run("get-user-email", async () => {
        const userObject = await User.findOne({ email });
        if (!userObject) {
          throw new NonRetriableError("user no-longer exist in our dataBase")
        }
        return userObject;
      })
      
      await step.run("send-welcome-email", async () => {
        const subject = "welcome to the app"
        const message = `Hi,
         \n\n
            Thanks for signing up.We're glad to have you onboard!
        `
        await sendMail(user.email, subject, message);
      })
      return {success:true}
    }
    catch (err) {
      console.error("error running step:", err.message);
      return {success:false}
    }
  }
)

