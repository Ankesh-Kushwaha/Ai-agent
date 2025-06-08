import jwt from "jsonwebtoken";

 export const authenticate = async (req, res,next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "login required",error:"no token found" });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded; //attached the decoded info
    next();
  }
  catch (err) {
    res.status(401).json(
      {
        success: false,
        message: "error during authenticate",
        error:err.message
       }
     )
  }
}

