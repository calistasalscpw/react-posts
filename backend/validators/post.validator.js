export async function isUserValidation (req, res, next){
    const user = req.user;
    if (!user){
        res.json({ message: 'You are not authorized. Please login.' });
    } next ();
}