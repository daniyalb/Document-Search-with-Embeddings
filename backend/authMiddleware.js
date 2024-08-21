const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

async function verifyToken(req, res, next) {
  try {
    const token = req.headers.authorization;
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error) throw error;
    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    res.status(401).send("Unauthorized");
  }
}

module.exports = { verifyToken };