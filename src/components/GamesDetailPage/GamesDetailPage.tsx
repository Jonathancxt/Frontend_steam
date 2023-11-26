import {Button, Modal, NumberInput, Rating, Textarea} from '@mantine/core';
import React, {Fragment, useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {useReduxAccountSliceService} from '../../redux/slices/account/accountSlice.service.ts';
import {useToast} from '../../hooks/useToast.tsx';
import {useHttpGames} from '../../api/games/games.api.ts';
import {useForm} from 'react-hook-form';
import {Fieldset, Group, PasswordInput, TextInput, Image} from '@mantine/core';
import {useHttpReviews} from '../../api/reviews/reviews.api.ts';
import {TbUser} from 'react-icons/tb';

const GamesDetailPage = () => {
    // Pass information from parent to child component
    const {state} = useLocation();
    const [game, setGame] = useState(state.game);
    const navigate = useNavigate();
    const {getReduxAuthSliceIsUserAuthenticated, getReduxAccountSliceEmail, getReduxAccountSliceId, getReduxAccountSlicePurchasedGames, setReduxAccountSlicePurchasedGames} =
        useReduxAccountSliceService();
    const isUserAuthenticated = getReduxAuthSliceIsUserAuthenticated();
    const [isLoading, setIsLoading] = useState(false);
    const {toastLoading, updateToastLoadingToSuccess, updateToastLoadingToFailure, toastSuccess} = useToast();
    const {httpGamesAddGameToUser, httpGamesGetGameById} = useHttpGames();
    const {httpReviewsAddReview, httpReviewsUpdateReview, httpReviewsDeleteReview} = useHttpReviews();
    // For add review
    const [isToggle, setIsToggle] = useState<boolean>(false);
    // For editing review
    const [isEditToggle, setIsEditToggle] = useState<boolean>(false);
    const [isDeleteToggle, setIsDeleteToggle] = useState<boolean>(false);
    const [reviewId, setReviewId] = useState<number>(0);
    const [isRefresh, setIsRefresh] = useState<boolean>(false);

    // To set initial state of game
    useEffect(() => {
        const fetchGames = async () => {
            if (game.id !== undefined) {
                console.log('game.id', game.id);
                const gameTO = {id: game.id};
                const updateGame = await httpGamesGetGameById(gameTO);
                setGame(updateGame);
            }
        };
        fetchGames();
    }, [isRefresh]);

    const {
        register,
        handleSubmit,
        formState: {errors, isValid},
        setValue,
        getValues
    } = useForm({mode: 'onTouched'});

    const goToGamesCataloguePage = () => {
        navigate('/games-catalogue');
    };

    const handlePurchaseGame = async () => {
        try {
            if (!isUserAuthenticated) {
                navigate('/login');
                toastSuccess('Please login first to purchase the game', 'Thank you!');
            }

            setIsLoading(true);
            toastLoading('loadPurchase');
            const gameTO = {email: getReduxAccountSliceEmail(), gameId: game.id};
            await httpGamesAddGameToUser(gameTO).then(() => {
                // Update redux
                updateToastLoadingToSuccess('loadPurchase', 'Purchase successful', 'You have successfully purchased the game!');
            });
            setReduxAccountSlicePurchasedGames([...getReduxAccountSlicePurchasedGames(), game.id]);
            setIsRefresh(!isRefresh);
        } catch (err) {
            updateToastLoadingToFailure('loadPurchase', 'Purchase failed', 'Please try again');
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    // Submitting a new review
    const onAddReview = async (data: any) => {
        try {
            setIsLoading(true);
            toastLoading('loadReview');
            const reviewTO = {
                averageRating: data.averageRating,
                content: data.content,
                gameId: game.id,
                authorId: getReduxAccountSliceId(),
                gameTitle: game.title
            };
            await httpReviewsAddReview(reviewTO).then(() => {
                // Update redux
                updateToastLoadingToSuccess('loadReview', 'New review added', 'You have successfully added a new review!');
            });
            setIsToggle(!isToggle);
            setIsRefresh(!isRefresh);
        } catch (err) {
            updateToastLoadingToFailure('loadReview', 'New review fail', 'Please try again');
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditReview = async (review) => {
        try {
            // open edit modal
            setIsEditToggle(!isEditToggle);
            setReviewId(review.id);
            setValue('content', review.content);
        } catch (err) {
            console.log(err);
        }
    };

    const handleDeleteReview = async (review) => {
        try {
            setIsDeleteToggle(!isDeleteToggle);
            setReviewId(review.id);
        } catch (err) {
            console.log(err);
        }
    };

    // Submitting a newly edited review
    const onEditReview = async (data: any) => {
        try {
            setIsLoading(true);
            toastLoading('loadEditReview');
            const reviewTO = {averageRating: 0, content: data.content, id: reviewId};
            await httpReviewsUpdateReview(reviewTO).then(() => {
                updateToastLoadingToSuccess('loadEditReview', 'Edit review successfully', 'You have successfully added a new review!');
            });
            setIsEditToggle(!isEditToggle);
            setIsRefresh(!isRefresh);
        } catch (err) {
            updateToastLoadingToFailure('loadEditReview', 'Edit review unsuccessfully', 'Please try again');
        } finally {
            setIsLoading(false);
        }
    };

    const onDeleteReview = async () => {
        try {
            setIsLoading(true);
            toastLoading('loadDeleteReview');
            const reviewTO = {id: reviewId};
            await httpReviewsDeleteReview(reviewTO).then(() => {
                updateToastLoadingToSuccess('loadDeleteReview', 'Delete review successfully', 'You have successfully added a new review!');
            });
            setIsDeleteToggle(!isDeleteToggle);
            setIsRefresh(!isRefresh);
        } catch (err) {
            updateToastLoadingToFailure('loadDeleteReview', 'Delete review unsuccessful', 'Please try again');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="w-1/2 mx-auto">
                <div className="flex justify-left gap-2">
                    <div className="flex">
                        <Button
                            className="flex my-auto"
                            size="xs"
                            onClick={() => {
                                goToGamesCataloguePage();
                            }}
                        >
                            Back
                        </Button>
                    </div>
                    <div className=" flex font-bold text-4xl my-auto">{game.title}</div>

                    {/*Access to add review button*/}
                    {isUserAuthenticated ? (
                        <div className="flex justify-center">
                            {isUserAuthenticated && getReduxAccountSlicePurchasedGames().includes(game.id) ? (
                                <div className="flex justify-center">
                                    <Button onClick={() => setIsToggle(!isToggle)}>Add review</Button>
                                </div>
                            ) : null}
                        </div>
                    ) : null}
                </div>

                <div className="w-[1000px] h-[600px]">
                    <Image radius="md" src={game.image_url} alt="game" />
                </div>
                {/* Option to purchase game*/}
                {isUserAuthenticated ? (
                    // if user is authenticated, check if user has not purchased the game
                    <>
                        {!getReduxAccountSlicePurchasedGames().includes(game.id) ? (
                            <Button onClick={() => handlePurchaseGame()}>Buy</Button>
                        ) : (
                            <Button disabled onClick={() => handlePurchaseGame()}>
                                In Library
                            </Button>
                        )}
                    </>
                ) : (
                    // if user is not authenticated, show buy button
                    <Button onClick={() => handlePurchaseGame()}>Buy</Button>
                )}

                <Group className="my-5">
                    <div className="font-bold text-xl"> About this game</div>
                    <div className=" text-left mx-auto">{game.description}</div>
                </Group>

                <div className="pb-20">
                    <div className="font-medium text-xl my-2">Review section</div>
                    {game.reviews.map((review, index) => {
                        return (
                            <Fragment key={index}>
                                <div className="border border-black shadow-border my-1 rounded-2xl flex h-30 w-1/2 relative">
                                    <div className="flex justify-center">
                                        <TbUser size={50} />
                                        <div className="font-bold text-xl flex my-auto">{review.author}</div>
                                        <div className="flex my-auto italic">"{review.content}"</div>
                                    </div>

                                    {isUserAuthenticated && review.authorId === getReduxAccountSliceId() ? (
                                        <div className="my-1.5 flex gap-2 border absolute right-0">
                                            <Button
                                                onClick={() => {
                                                    handleEditReview(review);
                                                }}
                                            >
                                                Edit Review
                                            </Button>
                                            <Button
                                                onClick={() => {
                                                    handleDeleteReview(review);
                                                }}
                                            >
                                                Delete Review
                                            </Button>
                                        </div>
                                    ) : null}
                                </div>
                            </Fragment>
                        );
                    })}
                </div>

                {/*Modal for adding review*/}
                <Modal opened={isToggle} onClose={() => setIsToggle(!isToggle)} size="50%" title="Add review">
                    <form onSubmit={handleSubmit(onAddReview)}>
                        <Fieldset className="m-auto w-full min-h-fit ">
                            <Textarea
                                label="Add a new review to game"
                                description="Input review"
                                placeholder="Recommend?"
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

                {/*Modal for editing review*/}
                <Modal opened={isEditToggle} onClose={() => setIsEditToggle(!isEditToggle)} size="50%" title="Add review">
                    <form onSubmit={handleSubmit(onEditReview)}>
                        <Fieldset className="m-auto w-full min-h-fit ">
                            <Textarea
                                label="Add a new review to game"
                                description="Input review"
                                placeholder="Recommend?"
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

                {/*Modal for deleting review*/}
                <Modal opened={isDeleteToggle} onClose={() => setIsDeleteToggle(!isDeleteToggle)} size="50%" title="Add review">
                    <Fieldset className="m-auto w-full min-h-fit ">
                        <div> Are you sure you want to delete the review? </div>
                        <Button
                            onClick={() => {
                                onDeleteReview();
                            }}
                        >
                            Delete
                        </Button>
                    </Fieldset>
                </Modal>
            </div>
        </>
    );
};

export default GamesDetailPage;
