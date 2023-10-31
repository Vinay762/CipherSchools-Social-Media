Models :- It contails 3 models
i) userModel
ii) postModel 
iii) commentModel

:- also encrypting the password form a bcryptjs libray while register a new user

Routes:-
i) For user Routes
-> register a user
-> authenticating a user

i have also implemented json web token which i stored in the cookies as a jwt which expires in 30 days

```
router.get('/',protect, getAllPosts);
router.post('/',protect, createPost);
router.delete('/:id', protect, deletePost);
router.get('/:id', protect, getPostsByUser);
router.get('/search/:hashtag', protect, getPostsByHashtag);
```

ii) For post Routes
All are protected routes 
-> get all post sorted by the latest one
-> creating the post 
-> creating the post
-> deleting the post only by the user who created the post
-> getting the post from the specif user's userid
-> search the post based on the hastags used


iii) I have also used middleware function to handle notfound erorr, or any error and also handle the protect middleware in the middleware folder

iv) in the utils section i am also generating the token based on the userid and successfully storing it into the cookiee with name of jwt

