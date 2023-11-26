import React, {Fragment, useEffect, useState} from 'react';
import {useHttpPosts} from '../../api/posts/posts.api';
import {Badge, Button, Card, Fieldset, Group, Image, Modal, Text, TextInput, Textarea} from '@mantine/core';
import {useForm} from 'react-hook-form';
import {useToast} from '../../hooks/useToast.tsx';
import {useReduxAccountSliceService} from '../../redux/slices/account/accountSlice.service.ts';

const PostFeed = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const {httpPostsGetAllPosts, httpPostsGetPostsViaPagination, httpPostsCreatePost} = useHttpPosts();
    const [isRefresh, setIsRefresh] = useState(false);
    const [isToggle, setIsToggle] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const {toastLoading, updateToastLoadingToSuccess, updateToastLoadingToFailure, toastSuccess} = useToast();
    const {getReduxAccountSliceName, getReduxAuthSliceIsUserAuthenticated} = useReduxAccountSliceService();
    const isUserAuthenticated = getReduxAuthSliceIsUserAuthenticated();

    useEffect(() => {
        const getPosts = async () => {
            const posts = await httpPostsGetAllPosts();
            setPosts(posts);
        };
        getPosts();
    }, [isRefresh]);

    const {
        register,
        handleSubmit,
        formState: {errors, isValid},
        setValue,
        getValues
    } = useForm({mode: 'onTouched'});

    const onAddPost = async (data) => {
        console.log(data);
        try {
            setIsLoading(true);
            toastLoading('loadAddPosts');
            const postsTO = {title: data.title, image_url: data.image_url, content: data.content, author: getReduxAccountSliceName()};
            await httpPostsCreatePost(postsTO).then(() => {
                updateToastLoadingToSuccess('loadAddPosts', 'Add posts successfully', 'You have successfully added a posts!');
            });
            setIsToggle(!isToggle);
            setIsRefresh(!isRefresh);
        } catch (err) {
            updateToastLoadingToFailure('loadAddPosts', 'Add posts unsuccessfully', 'Please try again');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="container">
                {posts.map((post, index) => {
                    return (
                        <Fragment key={index}>
                            <Card shadow="sm" padding="lg" radius="md" withBorder className="onHover:bg-gray-200 cursor-pointer shadow-sm w-1/2 mx-auto my-5">
                                <Card.Section>
                                    <Image src={post.image_url} height={160} />
                                </Card.Section>

                                <Group justify="space-between" mt="md" mb="xs">
                                    <Text fw={500}>{post.title}</Text>
                                </Group>

                                <Text size="sm" c="dimmed" lineClamp={3}>
                                    {post.content}
                                </Text>
                            </Card>
                        </Fragment>
                    );
                })}

                {/*Add post button*/}
                {isUserAuthenticated ? <Button onClick={() => setIsToggle(!isToggle)}>Add Post</Button> : null}

                {/*Modal for adding new post*/}
                <Modal opened={isToggle} onClose={() => setIsToggle(!isToggle)} size="50%" title="Add new post">
                    <form onSubmit={handleSubmit(onAddPost)}>
                        <Fieldset className="m-auto w-full min-h-fit ">
                            <TextInput label="Titlel" description="Title" placeholder="title" {...register('title', {required: true})} />
                            {errors.title && <span className="text-red-500">This field is required</span>}

                            <TextInput label="Image" description="Image" placeholder="image" {...register('image_url')} />

                            <Textarea
                                label="Add a post"
                                description="Content"
                                placeholder="post content"
                                {...register('content', {required: true})}
                            />
                            {errors.content && <span className="text-red-500">This field is required</span>}

                            <Group justify="flex-end" mt="md">
                                <Button disabled={!isValid || isLoading} name="submit" type="submit">
                                    Submit
                                </Button>
                            </Group>
                        </Fieldset>
                    </form>
                </Modal>
            </div>
        </>
    );
};

export default PostFeed;
