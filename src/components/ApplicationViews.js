import React from "react"
import { Route } from "react-router-dom"
import { PostList } from "./posts/PostList"
import { MyPostsList } from "./posts/MyPostsList"
import { PostProvider } from "./posts/PostProvider"
import { PostDetail } from "./posts/PostDetails"
import { PostForm } from "./posts/PostForm"
import { CategoryProvider } from "./category/CategoryProvider"
import { CategoryList } from "./category/CategoryList"
import { CategoryForm } from "./category/CategoryForm"
import { CategoryDetail } from "./category/CategoryDetails"
import { UserProvider } from "./users/UserProvider"
import { CommentProvider } from "./comments/CommentProvider"
import { SubscriptionProvider } from "./subscriptions/SubscriptionProvider"
import { TagsProvider } from "./tags/TagsProvider"
import { TagList } from "./tags/TagList"
import { TagForm } from "./tags/TagForm"
import { TagDetail } from "./tags/TagDetail"



export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
        <PostProvider>
            <SubscriptionProvider>
                <UserProvider>
                    <CommentProvider>
                        <CategoryProvider>
                            <TagsProvider>
                                <Route exact path="/">
                                    <PostList />
                                </Route>
                                <Route exact path="/mypostlist">
                                <MyPostsList />
                                </Route>
                                <Route exact path="/posts/detail/:postId(\d+)">
                                    <PostDetail />
                                </Route>
                                <Route exact path="/posts/edit/:postId(\d+)">
                                    <PostForm />
                                </Route>
                                <Route exact path="/posts/create">
                                    <PostForm />
                                </Route>
                            </TagsProvider>
                        </CategoryProvider>
                    </CommentProvider>
                </UserProvider>
            </SubscriptionProvider>
        </PostProvider>
        <CategoryProvider>  
            <Route exact path="/categories">
                <CategoryList />
            </Route>
            <Route exact path="/categories/create">
                <CategoryForm />
            </Route>
            <Route exact path="/categories/detail/:categoryId(\d+)">
                <CategoryDetail />
            </Route>
            <Route exact path="/categories/edit/:categoryId(\d+)">
                <CategoryForm />
            </Route>
        </CategoryProvider>
        <TagsProvider>
            <Route exact path="/tags">
                <TagList />
            </Route>
            <Route exact path="/tags/edit/:tagId(\d+)">
                <TagForm/>
            </Route>
            <Route exact path="/tags/create">
                <TagForm/>
            </Route>
            <Route exact path="/tags/detail/:tagId(\d+)">
                <TagDetail />
            </Route>
        </TagsProvider>
        </main>
    </>
}
