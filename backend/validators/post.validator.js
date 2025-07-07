import Post from './../models/posts.model';
export async function isUserValidation (req, res, next){

    const user = req.user;
    if (!user){
        res.json({ message: 'You are not authorized. Please login.' });
    } next ();
}

export async function isSameUserValidator(req, res, next){
    const user = req.user;
    
    if (!user){
        return res.json({ message: 'You are not authorized. Please login.' });
    }

    const post = await Post.findById(req.params.postId);

    if(!post.author._id.equals(user._id)){
        res.status(403).json('Not authorized to modify this post');
    }
    
    next();
}