// {
//     let createPost = function(){
//         let newPostForm = $("#new-post-form");

//         newPostForm.submit(function(e){
//             e.preventDefault();

//             $.ajax({
//                 type: 'post',
//                 url: '/posts/create',
//                 // serialize make form data into json
//                 data: newPostForm.serialize(),
//                 success: function(data){
//                     console.log(data);
//                     let newPost = newPostDom(data.data.post);
//                     $('#post-list-container').prepend(newPost);
//                     deletePost($(' .delete-post-button',newPost));
//                 },
//                 error: function(error){
//                     console.log(error.responseText);
//                 }
//             })
//         })
//     }


//     // method to create a post in DOM
//     let newPostDom = function(post){
//         return $(`<li id="post-${post._id}">
//                     <p>
                        
//                         <small>
//                             <a class="delete-post-button" href="/posts/destroy/${ post._id }">X</a>
//                         </small>
                        
//                         ${ post.content }
//                         <br>
//                         <small>
//                             ${ post.user.name }
//                         </small>
//                     </p>
//                     <div class="post-comments">
                        
//                             <form action="/comments/create" method="POST">
//                                 <input type="text" name="content" placeholder="Type here to add comment...">
//                                 <input type="hidden" name="post" value="${ post._id }">
//                                 <input type="submit" value="Add Comment">
//                             </form>
                        
                
//                         <div class="post-comments-list">
//                             <ul id="post-comments-${ post._id}">
                                
                            
//                             </ul>
//                         </div>
                
//                     </div>
                    
//                 </li>`)
//     }



//     // method to delete a post from DOM
//     let deletePost = function(deleteLink){
//         $(deleteLink).click(function(e){
//             e.preventDefault();

//             $.ajax({
//                 type: 'get',
//                 // by using prop we can access the attribute of the tag
//                 url: $(deleteLink).prop('href'),
//                 success: function(data){
//                     $(`#post-${data.data.post_id}`).remove();
//                 },
//                 error: function(error){
//                     console.log(error.responseText);
//                 }
//             })
//         });
//     }

//     createPost();
// }